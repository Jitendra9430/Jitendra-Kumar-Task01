import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  getAssignments,
  getCurrentUser,
  getSubmissions,
} from "../utils/storage";

function StudentAssignments() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const assignments = getAssignments();
  const submissions = getSubmissions();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const isSubmitted = (assignmentId) =>
    submissions.some(
      (submission) =>
        submission.assignmentId === assignmentId &&
        submission.studentId === user?.id &&
        submission.status === "submitted"
    );

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        assignment.title
          ?.toLowerCase()
          .includes(query) ||
        assignment.description
          ?.toLowerCase()
          .includes(query);

      const submitted = isSubmitted(assignment.id);

      const matchesFilter =
        filter === "all" ||
        (filter === "pending" && !submitted) ||
        (filter === "submitted" && submitted);

      return matchesSearch && matchesFilter;
    });
  }, [
    assignments,
    submissions,
    search,
    filter,
  ]);

  const formatDate = (date) => {
    if (!date) return "No deadline";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "No deadline";
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <Navbar />

      <div className="flex">
        <Sidebar role="student" />

        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">

            {/* HEADER */}

            <div className="mb-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-indigo-600">
                Student Workspace
              </p>

              <div className="mt-2 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Assignments
                  </h1>

                  <p className="mt-2 text-sm text-slate-500">
                    View, complete and submit your assignments.
                  </p>
                </div>

                <Link
                  to="/student"
                  className="inline-flex w-fit items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  ← Dashboard
                </Link>

              </div>
            </div>

            {/* SEARCH + FILTER */}

            <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">

              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  🔍
                </span>

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search assignments..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />
              </div>

              <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">

                {[
                  ["all", "All"],
                  ["pending", "Pending"],
                  ["submitted", "Submitted"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setFilter(value)
                    }
                    className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                      filter === value
                        ? "bg-indigo-600 text-white"
                        : "text-slate-500 hover:bg-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}

              </div>
            </div>

            {/* ASSIGNMENTS */}

            {filteredAssignments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                  📚
                </div>

                <h2 className="mt-4 text-lg font-extrabold text-slate-800">
                  No assignments found
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or filter.
                </p>

              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                {filteredAssignments.map(
                  (assignment) => {
                    const submitted =
                      isSubmitted(assignment.id);

                    return (
                      <article
                        key={assignment.id}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
                      >

                        <div className="p-6">

                          <div className="flex items-start justify-between gap-4">

                            <div>
                              <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-indigo-700">
                                Assignment
                              </span>

                              <h2 className="mt-3 text-xl font-extrabold text-slate-900">
                                {assignment.title}
                              </h2>
                            </div>

                            <span
                              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-extrabold ${
                                submitted
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {submitted
                                ? "✓ Submitted"
                                : "Pending"}
                            </span>

                          </div>

                          <p className="mt-4 min-h-[48px] text-sm leading-6 text-slate-500">
                            {assignment.description}
                          </p>

                          <div className="mt-5 grid grid-cols-2 gap-3">

                            <div className="rounded-xl bg-slate-50 p-3">
                              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                Deadline
                              </p>

                              <p className="mt-1 text-sm font-bold text-slate-700">
                                📅 {formatDate(assignment.deadline)}
                              </p>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-3">
                              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                Progress
                              </p>

                              <p className="mt-1 text-sm font-bold text-slate-700">
                                {submitted ? "100%" : "0%"}
                              </p>
                            </div>

                          </div>

                          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full transition-all ${
                                submitted
                                  ? "bg-emerald-500"
                                  : "bg-indigo-600"
                              }`}
                              style={{
                                width: submitted
                                  ? "100%"
                                  : "0%",
                              }}
                            />
                          </div>

                        </div>

                        <div className="border-t border-slate-100 bg-slate-50/70 p-4">

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/student/assignments/${assignment.id}`
                              )
                            }
                            className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                          >
                            View Assignment →
                          </button>

                        </div>

                      </article>
                    );
                  }
                )}

              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentAssignments;