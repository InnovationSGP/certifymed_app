import React, { useEffect, useCallback } from "react";

const Dialog = ({ open, onClose, children, className = "" }) => {
  const handleEscape = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, handleEscape]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-white bg-opacity-80 transition-opacity backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className={`relative bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto w-[90vw] max-w-lg transform transition-all ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children, className = "" }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

const DialogHeader = ({ children, className = "" }) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

const DialogTitle = ({ children, className = "" }) => {
  return (
    <h2 className={`text-xl font-semibold text-gray-900 ${className}`}>
      {children}
    </h2>
  );
};

export { Dialog, DialogContent, DialogHeader, DialogTitle };
