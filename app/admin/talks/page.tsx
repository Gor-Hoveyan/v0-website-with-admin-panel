"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"; // client, not server

export default function AdminEventsPage() {
  const supabase = createClient();
  const [events, setEvents] = useState<any[]>([]);
  const [form, setForm] = useState({
    category: "talk",
    title: "",
    description: "",
    date: "",
    location: "",
    url: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadEvents() {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });
    setEvents(data || []);
  }

  async function addEvent() {
    await supabase.from("events").insert([form]);
    resetForm();
    loadEvents();
  }

  async function updateEvent() {
    if (!editingId) return;
    await supabase.from("events").update(form).eq("id", editingId);
    resetForm();
    setEditingId(null);
    loadEvents();
  }

  async function deleteEvent(id: string) {
    await supabase.from("events").delete().eq("id", id);
    loadEvents();
  }

  function resetForm() {
    setForm({
      category: "talk",
      title: "",
      description: "",
      date: "",
      location: "",
      url: "",
    });
  }

  function startEditing(event: any) {
    setEditingId(event.id);
    setForm({
      category: event.category,
      title: event.title,
      description: event.description || "",
      date: event.date || "",
      location: event.location || "",
      url: event.url || "",
    });
  }

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Admin: Manage Events</h1>

      {/* Add/Edit form */}
      <div className="mb-8 space-y-2">
        <input
          placeholder="Title"
          className="border p-2 w-full"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 w-full"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          placeholder="Location"
          className="border p-2 w-full"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          placeholder="URL"
          className="border p-2 w-full"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
        />
        <select
          className="border p-2 w-full"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="talk">Talk</option>
          <option value="panel">Panel</option>
          <option value="podcast">Podcast</option>
          <option value="interview">Interview</option>
          <option value="commentary">Commentary</option>
          <option value="mention">Mention</option>
        </select>

        {editingId ? (
          <div className="space-x-2">
            <button
              onClick={updateEvent}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                resetForm();
                setEditingId(null);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={addEvent}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Event
          </button>
        )}
      </div>

      {/* Event list */}
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{event.title}</h2>
                <p className="text-sm text-gray-600">{event.category}</p>
                <p>{event.description}</p>
                {event.date && (
                  <p className="text-sm text-gray-500">{event.date}</p>
                )}
                {event.location && (
                  <p className="text-sm text-gray-500">{event.location}</p>
                )}
                {event.url && (
                  <a
                    href={event.url}
                    target="_blank"
                    className="text-blue-600 underline text-sm"
                  >
                    More info
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEditing(event)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
