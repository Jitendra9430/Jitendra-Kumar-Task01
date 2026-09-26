 import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  getAssignments,
  getSubmissions,
  deleteAssignment,
} from "../utils/storage";

import { users } from "../data/mockData";

function AdminDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const assignments = useMemo(
    () => getAssignments(),
    [refreshKey]
  );

  const submissions = useMemo(
    () => getSubmissions(),
    [refreshKey]
  );

  const students = useMemo(
    () => users.filter((user) => user.role === "student"),
    []
  );

  const totalAssignments = assignments.length;
  const totalStudents = students.length;

  const totalSubmissions = submissions.filter(
    (submission) => submission.status === "submitted"
  ).length;

  const totalPossibleSubmissions =
    totalAssignments * totalStudents;

  const completionPercentage =
    totalPossibleSubmissions > 0
      ? Math.round(
          (totalSubmissions / totalPossibleSubmissions) * 100
        )
      : 0;

  const getAssignmentSubmissions = (assignmentId) => {
    return submissions.filter(
      (submission) => submission.assignmentId === assignmentId
    );
  };

  const getStudentProgress = (studentId) => {
    if (totalAssignments === 0) return 0;

    const submittedCount = submissions.filter(
      (submission) =>
        submission.studentId === studentId &&
        submission.status === "submitted"
    ).length;

    return Math.round(
      (submittedCount / totalAssignments) * 100
    );
  };

  const formatDate = (date) => {
    if (!date) return "No deadline";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "No deadline";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredAssignments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return assignments.filter((assignment) => {
      const matchesSearch =
        !query ||
        assignment.title?.toLowerCase().includes(query) ||
        assignment.description?.toLowerCase().includes(query);

      const assignmentSubmissions = submissions.filter(
        (submission) =>
          submission.assignmentId === assignment.id &&
          submission.status === "submitted"
      );

      const submittedCount = assignmentSubmissions.length;

      const matchesFilter =
        filter === "all" ||
        (filter === "completed" &&
          totalStudents > 0 &&
          submittedCount === totalStudents) ||
        (filter === "pending" &&
          (totalStudents === 0 || submittedCount < totalStudents));

      return matchesSearch && matchesFilter;
    });
  }, [
    assignments,
    submissions,
    search,
    filter,
    totalStudents,
  ]);

  const handleDelete = (assignmentId) => {
    const confirmed = window.confirm(
      "Delete this assignment? Its submission records will also be removed."
    );

    if (!confirmed) return;

    deleteAssignment(assignmentId);
    setRefreshKey((value) => value + 1);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <Navbar />

      <div className="flex">
        <Sidebar role="admin" />

        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">

            {/* HERO */}
            <section className="mb-7 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-100 sm:p-8">
              <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
                <div>
                  <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">
                    Professor Workspace
                  </span>

                  <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Assignment Overview
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
                    Create assignments, monitor student submissions,
                    and keep your classroom progress organized.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <Link
                    to="/admin/create"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"
                  >
                    <span className="text-lg">+</span>
                    Create Assignment
                  </Link>

                  <a
                    href="#assignments"
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
                  >
                    View Assignments
                  </a>
                </div>
              </div>
            </section>

            {/* STATS */}
            <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon="📚"
                label="Assignments"
                value={totalAssignments}
                description="Total assignments"
                iconClass="bg-indigo-50"
              />

              <StatCard
                icon="👨‍🎓"
                label="Students"
                value={totalStudents}
                description="Registered students"
                iconClass="bg-blue-50"
              />

              <StatCard
                icon="✓"
                label="Submissions"
                value={totalSubmissions}
                description="Completed submissions"
                iconClass="bg-emerald-50"
              />

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-500">
                    Completion
                  </span>

                  <span className="rounded-xl bg-violet-50 p-3 text-xl">
                    📈
                  </span>
                </div>

                <div className="flex items-end justify-between gap-4">
                  <p className="text-3xl font-extrabold text-slate-900">
                    {completionPercentage}%
                  </p>

                  <span className="text-xs font-semibold text-slate-400">
                    Overall
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                    style={{
                      width: `${completionPercentage}%`,
                    }}
                  />
                </div>
              </div>
            </section>

            {/* ASSIGNMENTS */}
            <section id="assignments" className="scroll-mt-24">
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.15em] text-indigo-600">
                    Classroom
                  </p>

                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                    Assignments
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Track submission progress for every student.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      🔍
                    </span>

                    <input
                      value={search}
                      onChange={(event) =>
                        setSearch(event.target.value)
                      }
                      placeholder="Search assignments..."
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 sm:w-64"
                    />
                  </div>

                  <div className="flex rounded-xl border border-slate-200 bg-white p-1">
                    {[
                      ["all", "All"],
                      ["pending", "In Progress"],
                      ["completed", "Completed"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setFilter(value)}
                        className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                          filter === value
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {filteredAssignments.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                    📚
                  </div>

                  <h3 className="mt-4 font-extrabold text-slate-800">
                    {assignments.length === 0
                      ? "No assignments yet"
                      : "No matching assignments"}
                  </h3>

                  <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                    {assignments.length === 0
                      ? "Create your first assignment to start tracking student progress."
                      : "Try another search term or change the filter."}
                  </p>

                  {assignments.length === 0 && (
                    <Link
                      to="/admin/create"
                      className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                    >
                      Create Assignment
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-5">
                  {filteredAssignments.map((assignment) => {
                    const assignmentSubmissions =
                      getAssignmentSubmissions(assignment.id);

                    const submittedCount =
                      assignmentSubmissions.filter(
                        (submission) =>
                          submission.status === "submitted"
                      ).length;

                    const progress =
                      totalStudents > 0
                        ? Math.round(
                            (submittedCount / totalStudents) * 100
                          )
                        : 0;

                    return (
                      <article
                        key={assignment.id}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg hover:shadow-slate-200/60"
                      >
                        <div className="p-5 sm:p-6">
                          {/* HEADER */}
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="min-w-0">
                              <div className="mb-2 flex flex-wrap items-center gap-2">
                                <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-indigo-700">
                                  ASSIGNMENT
                                </span>

                                <span className="text-xs font-semibold text-slate-400">
                                  Due {formatDate(assignment.deadline)}
                                </span>
                              </div>

                              <h3 className="text-xl font-extrabold text-slate-900">
                                {assignment.title}
                              </h3>

                              <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
                                {assignment.description ||
                                  "No description provided."}
                              </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-2">
                              <span
                                className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${
                                  progress === 100
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-amber-50 text-amber-700"
                                }`}
                              >
                                {submittedCount}/{totalStudents} Submitted
                              </span>

                              <button
                                type="button"
                                onClick={() => handleDelete(assignment.id)}
                                className="rounded-xl border border-red-100 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50"
                                title="Delete assignment"
                              >
                                🗑
                              </button>
                            </div>
                          </div>

                          {/* PROGRESS */}
                          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Overall Progress
                              </span>

                              <span className="text-sm font-extrabold text-slate-700">
                                {progress}%
                              </span>
                            </div>

                            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  progress === 100
                                    ? "bg-emerald-500"
                                    : "bg-indigo-600"
                                }`}
                                style={{
                                  width: `${progress}%`,
                                }}
                              />
                            </div>
                          </div>

                          {/* STUDENTS */}
                          <div className="mt-6">
                            <div className="mb-3 flex items-center justify-between">
                              <h4 className="text-sm font-extrabold text-slate-800">
                                Student Progress
                              </h4>

                              <span className="text-xs font-semibold text-slate-400">
                                {totalStudents} students
                              </span>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                              {students.map((student) => {
                                const studentSubmission =
                                  assignmentSubmissions.find(
                                    (submission) =>
                                      submission.studentId === student.id
                                  );

                                const submitted =
                                  studentSubmission?.status === "submitted";

                                return (
                                  <div
                                    key={student.id}
                                    className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/30"
                                  >
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                      <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-extrabold text-indigo-700">
                                          {student.name
                                            .charAt(0)
                                            .toUpperCase()}
                                        </div>

                                        <div className="min-w-0">
                                          <p className="truncate text-sm font-bold text-slate-800">
                                            {student.name}
                                          </p>

                                          <p className="truncate text-xs text-slate-400">
                                            {student.email}
                                          </p>
                                        </div>
                                      </div>

                                      <span
                                        className={`shrink-0 text-xs font-extrabold ${
                                          submitted
                                            ? "text-emerald-600"
                                            : "text-amber-600"
                                        }`}
                                      >
                                        {submitted
                                          ? "✓ Done"
                                          : "Pending"}
                                      </span>
                                    </div>

                                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                                      <span>Progress</span>
                                      <span>
                                        {submitted ? "100%" : "0%"}
                                      </span>
                                    </div>

                                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
                                      <div
                                        className={`h-full rounded-full transition-all ${
                                          submitted
                                            ? "bg-emerald-500"
                                            : "bg-amber-400"
                                        }`}
                                        style={{
                                          width: submitted ? "100%" : "0%",
                                        }}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* FOOTER */}
                        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm">
                              🔗
                            </span>

                            {assignment.driveLink ? (
                              <span className="max-w-[260px] truncate">
                                External submission link attached
                              </span>
                            ) : (
                              <span>No Drive link attached</span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            {assignment.driveLink && (
                              <a
                                href={assignment.driveLink}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                              >
                                Open Drive ↗
                              </a>
                            )}

                            <Link
                              to="/admin/create"
                              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700"
                            >
                              + New Assignment
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  description,
  iconClass = "bg-indigo-50",
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-500">
          {label}
        </span>

        <span className={`rounded-xl p-3 text-xl ${iconClass}`}>
          {icon}
        </span>
      </div>

      <p className="text-3xl font-extrabold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default AdminDashboard;