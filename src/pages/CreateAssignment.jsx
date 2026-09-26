 import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  getAssignments,
  saveAssignments,
} from "../utils/storage";

function CreateAssignment() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    driveLink: "",
  });

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.deadline ||
      !form.driveLink.trim()
    ) {
      setError(
        "Please fill in all fields."
      );

      return;
    }

    const assignments =
      getAssignments();

    const newAssignment = {
      id: `assignment-${Date.now()}`,

      title: form.title.trim(),

      description:
        form.description.trim(),

      deadline: form.deadline,

      driveLink:
        form.driveLink.trim(),

      createdBy: "admin1",

      createdAt:
        new Date().toISOString(),
    };

    saveAssignments([
      ...assignments,
      newAssignment,
    ]);

    setSuccess(true);

    setForm({
      title: "",
      description: "",
      deadline: "",
      driveLink: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="flex">

        <Sidebar role="admin" />

        <main className="min-w-0 flex-1 p-4 md:p-8">

          {/* HEADER */}

          <div className="mb-8">

            <button
              type="button"
              onClick={() =>
                navigate("/admin")
              }
              className="mb-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              ← Back to Dashboard
            </button>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Create Assignment
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Create a new assignment for
              your students.
            </p>

          </div>

          {/* FORM */}

          <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

            {success && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">

                <span className="text-lg">
                  ✓
                </span>

                Assignment created
                successfully!

              </div>
            )}

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
                ⚠️ {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* TITLE */}

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Assignment Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. React Fundamentals"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe what students need to complete..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

              </div>

              {/* DEADLINE */}

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Deadline
                </label>

                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

              </div>

              {/* DRIVE LINK */}

              <div>

                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Assignment Drive Link
                </label>

                <input
                  type="url"
                  name="driveLink"
                  value={form.driveLink}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Students will use this link
                  to open the assignment.
                </p>

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin")
                  }
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
                >
                  Create Assignment
                </button>

              </div>

            </form>

          </div>

        </main>

      </div>

    </div>
  );
}

export default CreateAssignment;