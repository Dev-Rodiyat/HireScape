const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8 || password.length > 20) {
      return res.status(400).json({
        message: "Password must be between 8 and 20 characters",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const user = new User({
      name,
      email,
      password,
    });

    const initials = getInitials(name);
    const { h, s, l } = getRandomOrangeShade();
    const bgColor = hslToHex(h, s, l);
    const textColor = "FFFFFF";

    const DEFAULT_IMAGE_URL = `https://placehold.co/150x150/${bgColor}/${textColor}?text=${initials}&font=inter`;

    const defaultProfilePicture = await ProfilePicture.create({
      userId: user._id,
      imageUrl: DEFAULT_IMAGE_URL,
      cloudinaryId: null,
    });

    user.photo = defaultProfilePicture._id;
    await user.save();

    const token = generateToken(user._id);

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production", // ⛔ false on localhost
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      photo: defaultProfilePicture.imageUrl,
      location: user.location,
      interests: user.interests,
      themeMode: user.themeMode,
      socialMediaLinks: user.socialMediaLinks,
    });

    await sendUserRegisterMail({ email, name });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.error("Email or password not provided");
      return res.status(400).json({ message: "Please add email and password" });
    }

    let user = await User.findOne({ email }).populate("photo");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found, please create an account" });
    }

    // Check if the user registered via Google
    if (user.authType === 'google') {
      return res.status(400).json({
        message: "This account was created using Google. Please log in with Google.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production", // ⛔ false on localhost
    });

    const { _id, name, email: userEmail, photo, location, interests, socialMediaLinks, themeMode } = user;

    res.status(200).json({
      _id,
      name,
      email: userEmail,
      photo,
      location,
      interests,
      socialMediaLinks,
      token,
      themeMode
    });


  } catch (error) {
    console.log("Error during login process:", error);
    return res.status(500).json({ message: error.message });
  }
});