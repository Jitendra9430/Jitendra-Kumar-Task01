 import { useMemo } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  getAssignments,
  getSubmissions,
} from "../utils/storage";

import { users } from "../data/mockData";

function AdminDashboard() {
  const assignments = getAssignments();
  const submissions = getSubmissions();

  const students = users.filter(
    (user) => user.role === "student"
  );

  const totalAssignments =
    assignments.length;

  const totalStudents =
    students.length;

  const totalSubmissions =
    submissions.filter(
      (submission) =>
        submission.status === "submitted"
    ).length;

  const totalPossibleSubmissions =
    totalAssignments * totalStudents;

  const completionPercentage =
    totalPossibleSubmissions > 0
      ? Math.round(
          (totalSubmissions /
            totalPossibleSubmissions) *
            100
        )
      : 0;

  const getAssignmentSubmissions = (
    assignmentId
  ) => {
    return submissions.filter(
      (submission) =>
        submission.assignmentId ===
        assignmentId
    );
  };

  const getStudentProgress = (
    studentId
  ) => {
    if (totalAssignments === 0) {
      return 0;
    }

    const submittedCount =
      submissions.filter(
        (submission) =>
          submission.studentId ===
            studentId &&
          submission.status ===
            "submitted"
      ).length;

    return Math.round(
      (submittedCount /
        totalAssignments) *
        100
    );
  };

  const formatDate = (date) => {
    if (!date) return "No deadline";

    const parsedDate = new Date(date);

    if (
      Number.isNaN(parsedDate.getTime())
    ) {
      return "No deadline";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="flex">

        <Sidebar role="admin" />

        <main className="min-w-0 flex-1 p-4 md:p-8">

          {/* HEADER */}

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="mb-1 text-sm font-semibold text-indigo-600">
                Admin Dashboard
              </p>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Assignment Overview
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage assignments and track
                student submissions.
              </p>
            </div>

            <Link
              to="/admin/create"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              <span className="text-lg">
                +
              </span>

              Create Assignment
            </Link>

          </div>

          {/* STATISTICS */}

          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center justify-between">

                <span className="text-sm font-semibold text-slate-500">
                  Assignments
                </span>

                <span className="rounded-xl bg-indigo-50 p-3 text-xl">
                  📚
                </span>

              </div>

              <p className="text-3xl font-extrabold text-slate-900">
                {totalAssignments}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Total assignments
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center justify-between">

                <span className="text-sm font-semibold text-slate-500">
                  Students
                </span>

                <span className="rounded-xl bg-blue-50 p-3 text-xl">
                  👨‍🎓
                </span>

              </div>

              <p className="text-3xl font-extrabold text-slate-900">
                {totalStudents}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Registered students
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center justify-between">

                <span className="text-sm font-semibold text-slate-500">
                  Submissions
                </span>

                <span className="rounded-xl bg-emerald-50 p-3 text-xl">
                  ✓
                </span>

              </div>

              <p className="text-3xl font-extrabold text-slate-900">
                {totalSubmissions}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Completed submissions
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center justify-between">

                <span className="text-sm font-semibold text-slate-500">
                  Completion
                </span>

                <span className="rounded-xl bg-violet-50 p-3 text-xl">
                  📈
                </span>

              </div>

              <p className="text-3xl font-extrabold text-slate-900">
                {completionPercentage}%
              </p>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-indigo-600 transition-all"
                  style={{
                    width: `${completionPercentage}%`,
                  }}
                />

              </div>

            </div>

          </section>

          {/* ASSIGNMENTS */}

          <section
            id="assignments"
            className="scroll-mt-24"
          >

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Assignments
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Track student progress for
                  each assignment.
                </p>
              </div>

              <Link
                to="/admin/create"
                className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
              >
                + New Assignment
              </Link>

            </div>

            <div className="space-y-5">

              {assignments.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

                  <div className="mb-3 text-4xl">
                    📚
                  </div>

                  <h3 className="font-bold text-slate-800">
                    No assignments yet
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Create your first assignment.
                  </p>

                  <Link
                    to="/admin/create"
                    className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white"
                  >
                    Create Assignment
                  </Link>

                </div>

              ) : (

                assignments.map(
                  (assignment) => {

                    const assignmentSubmissions =
                      getAssignmentSubmissions(
                        assignment.id
                      );

                    const submittedCount =
                      assignmentSubmissions.filter(
                        (submission) =>
                          submission.status ===
                          "submitted"
                      ).length;

                    const progress =
                      totalStudents > 0
                        ? Math.round(
                            (submittedCount /
                              totalStudents) *
                              100
                          )
                        : 0;

                    return (
                      <div
                        key={assignment.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                      >

                        {/* ASSIGNMENT HEADER */}

                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                          <div>

                            <h3 className="text-lg font-bold text-slate-900">
                              {assignment.title}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                              {assignment.description}
                            </p>

                            <p className="mt-2 text-xs font-semibold text-slate-400">
                              Due:{" "}
                              {formatDate(
                                assignment.deadline
                              )}
                            </p>

                          </div>

                          <div className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                            {submittedCount}/
                            {totalStudents} Submitted
                          </div>

                        </div>

                        {/* OVERALL PROGRESS */}

                        <div className="mb-6">

                          <div className="mb-2 flex justify-between text-xs font-semibold">

                            <span className="text-slate-500">
                              Overall Progress
                            </span>

                            <span className="text-slate-700">
                              {progress}%
                            </span>

                          </div>

                          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">

                            <div
                              className="h-full rounded-full bg-indigo-600 transition-all"
                              style={{
                                width: `${progress}%`,
                              }}
                            />

                          </div>

                        </div>

                        {/* STUDENTS */}

                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">

                          {students.map(
                            (student) => {

                              const studentSubmission =
                                assignmentSubmissions.find(
                                  (
                                    submission
                                  ) =>
                                    submission.studentId ===
                                    student.id
                                );

                              const submitted =
                                studentSubmission?.status ===
                                "submitted";

                              return (
                                <div
                                  key={
                                    student.id
                                  }
                                  className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                                >

                                  <div className="mb-3 flex items-center justify-between">

                                    <div className="flex items-center gap-3">

                                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                                        {student.name
                                          .charAt(
                                            0
                                          )
                                          .toUpperCase()}
                                      </div>

                                      <div>

                                        <p className="text-sm font-bold text-slate-800">
                                          {student.name}
                                        </p>

                                        <p className="text-xs text-slate-400">
                                          {student.email}
                                        </p>

                                      </div>

                                    </div>

                                    <span
                                      className={`text-xs font-bold ${
                                        submitted
                                          ? "text-emerald-600"
                                          : "text-amber-600"
                                      }`}
                                    >
                                      {submitted
                                        ? "✓ Submitted"
                                        : "Pending"}
                                    </span>

                                  </div>

                                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">

                                    <div
                                      className={`h-full rounded-full ${
                                        submitted
                                          ? "bg-emerald-500"
                                          : "bg-amber-400"
                                      }`}
                                      style={{
                                        width: submitted
                                          ? "100%"
                                          : "0%",
                                      }}
                                    />

                                  </div>

                                </div>
                              );
                            }
                          )}

                        </div>

                      </div>
                    );
                  }
                )

              )}

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

export default AdminDashboard;