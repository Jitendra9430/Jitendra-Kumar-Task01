import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  getAssignments,
  getCurrentUser,
  getSubmissions,
} from "../utils/storage";

function StudentProgress() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const assignments = getAssignments();
  const submissions = getSubmissions();

  const isSubmitted = (assignmentId) =>
    submissions.some(
      (submission) =>
        submission.assignmentId === assignmentId &&
        submission.studentId === user?.id &&
        submission.status === "submitted"
    );

  const completed = assignments.filter(
    (assignment) =>
      isSubmitted(assignment.id)
  ).length;

  const total = assignments.length;
  const pending = total - completed;

  const percentage =
    total > 0
      ? Math.round((completed / total) * 100)
      : 0;

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

  const progressMessage = useMemo(() => {
    if (percentage === 100) {
      return "All assignments completed. Great work!";
    }

    if (percentage >= 75) {
      return "You're almost there. Keep going!";
    }

    if (percentage >= 50) {
      return "Good progress. Stay consistent!";
    }

    return "Keep working through your assignments.";
  }, [percentage]);

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
          <div className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8">

            {/* HEADER */}

            <div className="mb-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-indigo-600">
                Student Workspace
              </p>

              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                My Progress
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Track your assignment completion and
                submission progress.
              </p>
            </div>

            {/* PROGRESS HERO */}

            <section className="mb-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-100 sm:p-8">

              <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                    Overall Completion
                  </span>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold">
                      {percentage}%
                    </span>

                    <span className="text-sm text-indigo-200">
                      completed
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-indigo-100">
                    {progressMessage}
                  </p>
                </div>

                <div className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full bg-white/10">

                  <div
                    className="absolute inset-3 rounded-full border-[10px] border-white/20"
                  />

                  <div className="text-center">
                    <p className="text-2xl font-extrabold">
                      {completed}/{total}
                    </p>

                    <p className="text-xs text-indigo-200">
                      completed
                    </p>
                  </div>

                </div>

              </div>

              <div className="mt-7 h-3 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-white transition-all duration-700"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

            </section>

            {/* STATS */}

            <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">

              <ProgressStat
                label="Total"
                value={total}
                icon="📚"
              />

              <ProgressStat
                label="Completed"
                value={completed}
                icon="✓"
                green
              />

              <ProgressStat
                label="Pending"
                value={pending}
                icon="⏳"
                amber
              />

            </div>

            {/* ASSIGNMENT PROGRESS */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Assignment Progress
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your completion status for each assignment.
                  </p>
                </div>

                <Link
                  to="/student/assignments"
                  className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
                >
                  View all →
                </Link>
              </div>

              <div className="space-y-4">

                {assignments.map(
                  (assignment) => {
                    const submitted =
                      isSubmitted(assignment.id);

                    return (
                      <button
                        key={assignment.id}
                        type="button"
                        onClick={() =>
                          navigate(
                            `/student/assignments/${assignment.id}`
                          )
                        }
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left transition hover:border-indigo-100 hover:bg-indigo-50/40"
                      >

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                          <div className="min-w-0">

                            <div className="flex items-center gap-2">

                              <h3 className="truncate text-sm font-extrabold text-slate-800">
                                {assignment.title}
                              </h3>

                              <span
                                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                  submitted
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-amber-50 text-amber-700"
                                }`}
                              >
                                {submitted
                                  ? "Submitted"
                                  : "Pending"}
                              </span>

                            </div>

                            <p className="mt-1 text-xs text-slate-400">
                              Due{" "}
                              {formatDate(
                                assignment.deadline
                              )}
                            </p>

                          </div>

                          <span className="text-sm font-extrabold text-slate-700">
                            {submitted ? "100%" : "0%"}
                          </span>

                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className={`h-full rounded-full ${
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

                      </button>
                    );
                  }
                )}

              </div>

            </section>

          </div>
        </main>
      </div>
    </div>
  );
}

function ProgressStat({
  label,
  value,
  icon,
  green,
  amber,
}) {
  const bg = green
    ? "bg-emerald-50 text-emerald-600"
    : amber
    ? "bg-amber-50 text-amber-600"
    : "bg-indigo-50 text-indigo-600";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-semibold text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-3xl font-extrabold text-slate-900">
            {value}
          </p>
        </div>

        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${bg}`}>
          {icon}
        </div>

      </div>
    </div>
  );
}

export default StudentProgress;