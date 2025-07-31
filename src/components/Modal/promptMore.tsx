import React from "react";

type MerchantPromptProps = {
  onSelect: ({ age, gender }: {age:number,gender:string}) => void;
};

const MerchantPrompt: React.FC<MerchantPromptProps> = ({ onSelect }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const age = Number(formData.get("age"));
    const gender = formData.get("gender") as string;

    if (!gender) {
      alert("Please select a gender.");
      return;
    }

    onSelect({ age, gender });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Please complete the registration</h2>
        <form onSubmit={handleSubmit}>
          <input
            required
            name="age"
            placeholder="Enter age"
            type="number"
            min={1}
            max={999}
            className="border rounded px-3 py-2 w-full"
          />
          <div className="mt-4 flex items-center justify-center gap-4">
            <label className="flex items-center gap-1">
              <input type="radio" name="gender" value="male" required />
              Male
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="gender" value="female" />
              Female
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MerchantPrompt;
