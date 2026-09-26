import {useState} from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import {
    getAssignments,
    getCurrentUser,
    saveAssignments,
} from "../utils/storage.js"

function CreateAssignment() {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const[form, setForm] = useState({
        title:"",
        description:"",
        deadline:"",
        driveLink:"",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(
            !form.title ||
            !form.deadline ||
            !form.description ||
            !form.driveLink
        ) {
            setError("Please fill all fields.");
            return;
        }

    const assignments = getAssignments();

    const newAssignment = {
      id: `assignment-${Date.now()}`,
      title: form.title,
      description: form.description,
      deadline: form.deadline,
      driveLink: form.driveLink,
      createdBy: user.id,
    };

    saveAssignments([
        ...assignments,
        newAssignment
    ]);

    navigate("/admin");
    }

    return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex">
        <Sidebar role="admin" />

        <main className="min-w-0 flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <p className="text-sm font-medium text-indigo-600">
                Admin
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                Create Assignment
              </h1>

              <p className="mt-2 text-slate-500">
                Add a new assignment for students.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Assignment Title
                  </label>

                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. React Fundamentals"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Description
                  </label>

                  <textarea
                    name="description"
                    rows="5"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the assignment..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Deadline
                  </label>

                  <input
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Google Drive Submission Link
                  </label>

                  <input
                    type="url"
                    name="driveLink"
                    value={form.driveLink}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Students will use this link to access
                    the external submission location.
                  </p>
                </div>

                {error && (
                  <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/admin")}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    Create Assignment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CreateAssignment;
