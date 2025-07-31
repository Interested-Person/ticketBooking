import React, { useState } from "react";
import { useEvent } from "../../hooks/useEvent";
import type { Event } from "../../types";

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

export default function AddEntry({onClose}: { onClose: () => void }) {
  const { addEvent } = useEvent();
  const [formData, setFormData] = useState<Partial<Omit<Event, "id">>>(defaultFormData);

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
    return localDate.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
  };

  return (
    <div className="fixed inset-0 z-50 bg-sky-900/60 flex items-center justify-center p-4">
      <div className="bg-cyan-700 rounded-2xl shadow-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Add New Event
        </h2>
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
              <label
                htmlFor={input.name}
                className="block text-sm font-medium text-white mb-1"
              >
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
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white mb-1"
            >
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
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-sky-300 cursor-pointer hover:bg-sky-500 text-black py-2 rounded-lg text-lg font-semibold transition duration-200"
          >
            Submit Event
          </button>
        </form>
      </div>
    </div>
  );
}
