// utils/placeholderUtils.js
function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0].toUpperCase())
    .join("")
    .slice(0, 2);
}

function getRandomOrangeBrownShade() {
  const h = Math.floor(Math.random() * (45 - 20 + 1)) + 20; // Orange to brownish
  const s = Math.floor(Math.random() * 30) + 50;
  const l = Math.floor(Math.random() * 20) + 30;
  return { h, s, l };
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
  return [f(0), f(8), f(4)]
    .map(x => x.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

module.exports = { getInitials, getRandomOrangeBrownShade, hslToHex };
