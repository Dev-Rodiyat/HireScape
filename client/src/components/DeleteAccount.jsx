import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import ConfirmModal from './ConfirmModal';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleConfirmLogout = () => {
    dispatch(logout());
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-red-600 hover:underline"
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
