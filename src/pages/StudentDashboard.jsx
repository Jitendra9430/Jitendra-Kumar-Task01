 import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  getAssignments,
  getCurrentUser,
  getSubmissions,
  saveSubmissions,
} from "../utils/storage";

function StudentDashboard() {
  const navigate = useNavigate();

  const user = getCurrentUser();

  const [assignments] = useState(
    () => getAssignments()
  );

  const [submissions, setSubmissions] =
    useState(() => getSubmissions());

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [selectedAssignment, setSelectedAssignment] =
    useState(null);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const studentAssignments = useMemo(() => {
    return assignments.filter(
      (assignment) =>
        !assignment.createdBy ||
        assignment.createdBy === "admin1"
    );
  }, [assignments]);

  const isSubmitted = (assignmentId) => {
    return submissions.some(
      (submission) =>
        submission.assignmentId ===
          assignmentId &&
        submission.studentId === user?.id &&
        submission.status === "submitted"
    );
  };

  const filteredAssignments =
    studentAssignments.filter(
      (assignment) => {
        const matchesSearch =
          assignment.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          assignment.description
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const submitted = isSubmitted(
          assignment.id
        );

        const matchesFilter =
          filter === "all" ||
          (filter === "submitted" &&
            submitted) ||
          (filter === "pending" &&
            !submitted);

        return (
          matchesSearch &&
          matchesFilter
        );
      }
    );

  const total = studentAssignments.length;

  const completed =
    studentAssignments.filter(
      (assignment) =>
        isSubmitted(assignment.id)
    ).length;

  const pending = total - completed;

  const progress =
    total > 0
      ? Math.round(
          (completed / total) * 100
        )
      : 0;

  const formatDate = (date) => {
    const parsed = new Date(date);

    if (
      !date ||
      Number.isNaN(parsed.getTime())
    ) {
      return "No deadline";
    }

    return parsed.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const confirmSubmission = () => {
    if (!selectedAssignment) return;

    const exists = submissions.some(
      (submission) =>
        submission.assignmentId ===
          selectedAssignment.id &&
        submission.studentId === user.id
    );

    let updated;

    if (exists) {
      updated = submissions.map(
        (submission) =>
          submission.assignmentId ===
            selectedAssignment.id &&
          submission.studentId === user.id
            ? {
                ...submission,
                status: "submitted",
              }
            : submission
      );
    } else {
      updated = [
        ...submissions,
        {
          assignmentId:
            selectedAssignment.id,
          studentId: user.id,
          status: "submitted",
        },
      ];
    }

    saveSubmissions(updated);

    setSubmissions(updated);

    setShowConfirm(false);
    setSelectedAssignment(null);
  };

  const openAssignment = (
    assignment
  ) => {
    if (!assignment.driveLink) {
      alert(
        "No assignment link is available."
      );
      return;
    }

    window.open(
      assignment.driveLink,
      "_blank",
      "noopener,noreferrer"
    );
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

            {/* HERO */}

            <section className="mb-7 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-100 sm:p-8">

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

                <div>

                  <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">
                    Student Workspace
                  </span>

                  <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Good morning,{" "}
                    {user.name.split(" ")[0]} 👋
                  </h1>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                    Track your assignments,
                    stay on top of deadlines,
                    and keep your submissions
                    organized.
                  </p>

                </div>

                <div className="hidden rounded-2xl bg-white/10 p-5 backdrop-blur lg:block">

                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
                    Overall progress
                  </p>

                  <p className="mt-1 text-4xl font-extrabold">
                    {progress}%
                  </p>

                </div>

              </div>

            </section>

            {/* STATS */}

            <section
              id="progress"
              className="mb-8 grid scroll-mt-24 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >

              <StatCard
                icon="📚"
                label="Total Assignments"
                value={total}
                description="Assigned to you"
              />

              <StatCard
                icon="✓"
                label="Completed"
                value={completed}
                description="Successfully submitted"
                accent="green"
              />

              <StatCard
                icon="⏳"
                label="Pending"
                value={pending}
                description="Still waiting for submission"
                accent="amber"
              />

            </section>

            {/* ASSIGNMENTS HEADER */}

            <section
              id="assignments"
              className="scroll-mt-24"
            >

              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    My Assignments
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Complete and confirm your
                    submissions.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">

                  <div className="relative">

                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      🔍
                    </span>

                    <input
                      value={search}
                      onChange={(e) =>
                        setSearch(
                          e.target.value
                        )
                      }
                      placeholder="Search assignments..."
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 sm:w-64"
                    />

                  </div>

                  <div className="flex rounded-xl border border-slate-200 bg-white p-1">

                    {[
                      ["all", "All"],
                      ["pending", "Pending"],
                      ["submitted", "Done"],
                    ].map(
                      ([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() =>
                            setFilter(value)
                          }
                          className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                            filter === value
                              ? "bg-indigo-600 text-white"
                              : "text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          {label}
                        </button>
                      )
                    )}

                  </div>

                </div>

              </div>

              {/* CARDS */}

              {filteredAssignments.length ===
              0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

                  <div className="text-4xl">
                    📭
                  </div>

                  <h3 className="mt-3 font-bold text-slate-800">
                    No assignments found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search
                    or filter.
                  </p>

                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

                  {filteredAssignments.map(
                    (assignment) => {

                      const submitted =
                        isSubmitted(
                          assignment.id
                        );

                      return (
                        <article
                          key={
                            assignment.id
                          }
                          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70"
                        >

                          <div className="p-5 sm:p-6">

                            <div className="flex items-start justify-between gap-4">

                              <div className="min-w-0">

                                <div className="mb-2 flex items-center gap-2">

                                  <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700">
                                    ASSIGNMENT
                                  </span>

                                </div>

                                <h3 className="text-xl font-extrabold text-slate-900">
                                  {assignment.title}
                                </h3>

                              </div>

                              <span
                                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${
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

                            <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-500">
                              {
                                assignment.description
                              }
                            </p>

                            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                              <div>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                  Deadline
                                </p>

                                <p className="mt-1 text-sm font-bold text-slate-700">
                                  📅{" "}
                                  {formatDate(
                                    assignment.deadline
                                  )}
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                  Progress
                                </p>

                                <p className="mt-1 text-sm font-bold text-slate-700">
                                  {submitted
                                    ? "100%"
                                    : "0%"}
                                </p>
                              </div>

                            </div>

                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">

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

                          <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/70 p-4 sm:flex-row">

                            <button
                              type="button"
                              onClick={() =>
                                openAssignment(
                                  assignment
                                )
                              }
                              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                            >
                              🔗 Open Assignment
                            </button>

                            {!submitted && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedAssignment(
                                    assignment
                                  );
                                  setShowConfirm(
                                    true
                                  );
                                }}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                              >
                                ✓ I Have Submitted
                              </button>
                            )}

                          </div>

                        </article>
                      );
                    }
                  )}

                </div>
              )}

            </section>

          </div>

        </main>

      </div>

      {/* CONFIRM MODAL */}

      {showConfirm &&
        selectedAssignment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

              <div className="mb-5 flex items-start justify-between">

                <div>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                    ✓
                  </div>

                  <h2 className="text-xl font-extrabold text-slate-900">
                    Confirm submission
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Please confirm that you
                    have submitted this
                    assignment.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(false)
                  }
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  ✕
                </button>

              </div>

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="font-bold text-slate-800">
                  {
                    selectedAssignment.title
                  }
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  This action will mark your
                  assignment as submitted.
                </p>

              </div>

              <div className="mt-6 flex gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(false)
                  }
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    confirmSubmission
                  }
                  className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700"
                >
                  Yes, Confirm
                </button>

              </div>

            </div>

          </div>
        )}

    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  description,
  accent = "blue",
}) {
  const styles = {
    blue: "bg-indigo-50 text-indigo-600",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-3xl font-extrabold text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>

        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${styles[accent]}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;