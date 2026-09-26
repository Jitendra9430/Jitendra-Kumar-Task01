import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  getAssignments,
  getCurrentUser,
  getSubmissions,
  saveSubmissions,
} from "../utils/storage";

function AssignmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = getCurrentUser();

  const assignments = getAssignments();

  const assignment = assignments.find(
    (item) => item.id === id
  );

  const [submissions, setSubmissions] =
    useState(() => getSubmissions());

  const [showConfirm, setShowConfirm] =
    useState(false);

  const submitted = submissions.some(
    (submission) =>
      submission.assignmentId === id &&
      submission.studentId === user?.id &&
      submission.status === "submitted"
  );

  const formatDate = (date) => {
    if (!date) return "No deadline";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "No deadline";
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const confirmSubmission = () => {
    const existing = submissions.some(
      (submission) =>
        submission.assignmentId === id &&
        submission.studentId === user.id
    );

    let updated;

    if (existing) {
      updated = submissions.map(
        (submission) =>
          submission.assignmentId === id &&
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
          assignmentId: id,
          studentId: user.id,
          status: "submitted",
        },
      ];
    }

    saveSubmissions(updated);
    setSubmissions(updated);
    setShowConfirm(false);
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!assignment) {
    return (
      <div className="min-h-screen bg-[#f6f8fc]">
        <Navbar />

        <div className="flex">
          <Sidebar role="student" />

          <main className="flex-1 p-8">
            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-10 text-center shadow-sm">
              <div className="text-5xl">📭</div>

              <h1 className="mt-4 text-2xl font-extrabold">
                Assignment not found
              </h1>

              <button
                type="button"
                onClick={() =>
                  navigate("/student/assignments")
                }
                className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white"
              >
                Back to Assignments
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <Navbar />

      <div className="flex">
        <Sidebar role="student" />

        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[1100px] px-4 py-6 sm:px-6 lg:px-8">

            <button
              type="button"
              onClick={() =>
                navigate("/student/assignments")
              }
              className="mb-6 text-sm font-bold text-indigo-600 hover:text-indigo-700"
            >
              ← Back to Assignments
            </button>

            <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              {/* HEADER */}

              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white sm:p-8">

                <div className="flex flex-wrap items-center gap-2">

                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                    Assignment
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      submitted
                        ? "bg-emerald-400/20 text-emerald-100"
                        : "bg-amber-400/20 text-amber-100"
                    }`}
                  >
                    {submitted
                      ? "✓ Submitted"
                      : "Pending"}
                  </span>

                </div>

                <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl">
                  {assignment.title}
                </h1>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-indigo-100 sm:text-base">
                  {assignment.description}
                </p>

              </div>

              {/* BODY */}

              <div className="p-6 sm:p-8">

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Deadline
                    </p>

                    <p className="mt-2 text-lg font-extrabold text-slate-800">
                      📅 {formatDate(assignment.deadline)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Your Progress
                    </p>

                    <p className="mt-2 text-lg font-extrabold text-slate-800">
                      {submitted ? "100%" : "0%"}
                    </p>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={
                          submitted
                            ? "h-full w-full rounded-full bg-emerald-500"
                            : "h-full w-0 rounded-full bg-indigo-600"
                        }
                      />
                    </div>
                  </div>

                </div>

                {/* INSTRUCTIONS */}

                <div className="mt-8">

                  <h2 className="text-lg font-extrabold text-slate-900">
                    Assignment Instructions
                  </h2>

                  <p className="mt-3 leading-7 text-slate-600">
                    Open the assignment resource using
                    the button below. Complete the required
                    work and submit it through the provided
                    assignment process. After submission,
                    return here and confirm your submission.
                  </p>

                </div>

                {/* ACTIONS */}

                <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">

                  {assignment.driveLink && (
                    <a
                      href={assignment.driveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      🔗 Open Assignment Resource
                    </a>
                  )}

                  {!submitted && (
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirm(true)
                      }
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                    >
                      ✓ I Have Submitted
                    </button>
                  )}

                </div>

                {submitted && (
                  <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-700">
                    ✓ Your submission has been confirmed.
                  </div>
                )}

              </div>
            </article>

          </div>
        </main>
      </div>

      {/* CONFIRMATION */}

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl">
              ✓
            </div>

            <h2 className="mt-4 text-xl font-extrabold text-slate-900">
              Confirm submission
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Have you completed and submitted
              <strong className="text-slate-700">
                {" "}
                {assignment.title}
              </strong>
              ?
            </p>

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(false)
                }
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmSubmission}
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

export default AssignmentDetails;