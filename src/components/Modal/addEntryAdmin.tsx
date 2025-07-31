import React, { useState } from "react";
import { useEvent } from "../../hooks/useEvent";
import type { Event } from "../../types";
import { useGemini } from "../../hooks/useGemini";



const defaultFormData: Partial<Omit<Event, "id">> = {
  name: "",
  museumName: "",
  imageURL: "",
  totalCapacity: 0,
  availableCapacity: 0,
  price: 0,
  time: new Date(),
  description: "",
};

export default function AddEntry({ onClose }: { onClose: () => void }) {
  const { addEvent } = useEvent();
  const [formData, setFormData] = useState<Partial<Omit<Event, "id">>>(defaultFormData);
  const [loadingAI, setLoadingAI] = useState(false);
const {improveContent} = useGemini();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["totalCapacity", "availableCapacity", "price"].includes(name)
        ? Number(value)
        : name === "time"
        ? new Date(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields: (keyof typeof formData)[] = [
      "name",
      "museumName",
      "imageURL",
      "totalCapacity",
      "availableCapacity",
      "price",
      "time",
      "description",
    ];

    for (const field of requiredFields) {
      const value = formData[field];
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      ) {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }

    await addEvent(formData as Omit<Event, "id">);
    onClose();
    setFormData(defaultFormData);
  };

  const formatDateTimeLocal = (date: Date | undefined): string => {
    if (!date || isNaN(date.getTime())) return "";
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  const improveDescription = async () => {
    if (!formData.description) {
      alert("Please enter a description first.");
      return;
    }

    try {
      setLoadingAI(true);
      const result =  await improveContent(formData.description);
      const improved = result.trim();
      if (improved) {
        setFormData((prev) => ({
          ...prev,
          description: improved,
        }));
      }
    } catch (err) {
      console.error("AI improvement failed", err);
      alert("❌ Failed to improve description.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex h bg-sky-900/60 overflow-y-scroll hide-scrollbar justify-center p-4">
      <div className="bg-cyan-700 h-fit rounded-2xl shadow-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Add New Event</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            { label: "Event Name", name: "name", type: "text" },
            { label: "Museum Name", name: "museumName", type: "text" },
            { label: "Image URL", name: "imageURL", type: "text" },
            { label: "Total Capacity", name: "totalCapacity", type: "number" },
            { label: "Available Capacity", name: "availableCapacity", type: "number" },
            { label: "Price", name: "price", type: "number" },
            { label: "Date & Time", name: "time", type: "datetime-local" },
          ].map((input) => (
            <div key={input.name}>
              <label htmlFor={input.name} className="block text-sm font-medium text-white mb-1">
                {input.label}
              </label>
              <input
                id={input.name}
                name={input.name}
                type={input.type}
                required
                value={
                  input.name === "time"
                    ? formatDateTimeLocal(formData.time as Date)
                    : (formData[input.name as keyof typeof formData] as string | number | undefined) ?? ""
                }
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write a short description of the event..."
            />
            <button
              type="button"
              disabled={loadingAI}
              onClick={improveDescription}
              className="mt-2 w-full bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded-lg"
            >
              {loadingAI ? "Improving..." : "✨ AI Improve Description"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-sky-300 hover:bg-sky-500 text-black py-2 rounded-lg text-lg font-semibold"
          >
            Submit Event
          </button>
          <button
            onClick={() => onClose()}
            className="w-full mt-2 bg-sky-300 hover:bg-sky-500 text-black py-2 rounded-lg text-lg font-semibold"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
