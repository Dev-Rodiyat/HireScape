import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmModal from './ConfirmModal';
import { logoutUser } from '../redux/auth/authThunk';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()

  const handleConfirmLogout = () => {
    dispatch(logoutUser());
    setShowModal(false);
    navigate('/')
    toast.success('Logged out successfully')
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-1.5 rounded-md border text-sm font-medium transition text-gray-800 border-gray-800 hover:bg-gray-100"
      >
        Logout
      </button>

      <ConfirmModal
        isOpen={showModal}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Logout"
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default LogoutButton;
