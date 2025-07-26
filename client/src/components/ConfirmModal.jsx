import React from 'react';

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onClose,
  onConfirm,
  confirmClass = 'bg-red-600 hover:bg-red-700 text-white'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{message}</p>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md transition ${confirmClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
