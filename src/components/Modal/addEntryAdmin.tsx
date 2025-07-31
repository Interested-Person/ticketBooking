import React, { useState } from "react";
import { useEvent } from "../../hooks/useEvent";
import type { Event } from "../../types";

export default function AddEntry() {
  const { addEvent } = useEvent();
  const [formData, setFormData] = useState<Partial<Omit<Event, "id">>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        ["totalSeats", "availableSeats", "price"].includes(name)
          ? Number(value)
          : name === "time"
          ? new Date(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.totalSeats ||
      !formData.availableSeats ||
      !formData.imageURL ||
      !formData.TheatreName ||
      !formData.time ||
      !formData.description ||
      !formData.price
    ) {
      alert("Please fill in all fields.");
      return;
    }

    await addEvent(formData as Omit<Event, "id">);
    setFormData({});
  };

  return (
    <div className="fixed inset-0 z-50   flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Event
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            { label: "Event Name", name: "name", type: "text" },
            { label: "Theatre Name", name: "TheatreName", type: "text" },
            { label: "Image URL", name: "imageURL", type: "text" },
            { label: "Total Seats", name: "totalSeats", type: "number" },
            { label: "Available Seats", name: "availableSeats", type: "number" },
            { label: "Price", name: "price", type: "number" },
            { label: "Date & Time", name: "time", type: "datetime-local" },
          ].map((input) => (
            <div key={input.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {input.label}
              </label>
              <input
                name={input.name}
                type={input.type}
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write a short description of the event..."
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg font-semibold transition duration-200"
          >
            Submit Event
          </button>
        </form>
      </div>
    </div>
  );
}
