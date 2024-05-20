interface ConfirmationDialogProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmationDialog({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg text-center">
        <p>{message}</p>
        <div className="flex justify-around mt-4">
          <button onClick={onConfirm} className="button">
            Confirm
          </button>
          <button onClick={onCancel} className="button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
