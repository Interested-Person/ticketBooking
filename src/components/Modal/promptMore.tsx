import React from "react";

type PromptAdminProps = {
  onSelect: (isAdmin: boolean) => void;
};

const PromptAdmin: React.FC<PromptAdminProps> = ({ onSelect }) => {

  const handleChoice = (isAdmin: boolean) => {
    onSelect(isAdmin);
  };

  return (
    <div className="fixed inset-0 z-50 bg-sky-900/60  flex items-center justify-center">
      <div className="bg-sky-300 rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Are you an Admin?</h2>
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={() => handleChoice(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Yes
          </button>
          <button
            onClick={() => handleChoice(false)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptAdmin;
