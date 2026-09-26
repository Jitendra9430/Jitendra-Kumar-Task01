 import { useState } from "react";

import ProgressBar from "./ProgressBar";
import StatusBadge from "./StatusBadge";
import Modal from "./Modal";

function AssignmentCard({
  assignment,
  submission,
  onSubmit,
}) {
  const [showModal, setShowModal] =
    useState(false);

  const submitted =
    submission?.status === "submitted";

  const progress = submitted ? 100 : 0;

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

  const openAssignment = () => {
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

  const handleConfirm = () => {
    onSubmit(assignment.id);

    setShowModal(false);
  };

  return (
    <>
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">

        {/* CARD HEADER */}

        <div className="p-5">

          <div className="mb-4 flex items-start justify-between gap-3">

            <div className="min-w-0">

              <h3 className="truncate text-lg font-bold text-slate-900">
                {assignment.title}
              </h3>

              <p className="mt-1 text-xs font-medium text-slate-500">
                Due: {formatDate(
                  assignment.deadline
                )}
              </p>

            </div>

            <StatusBadge
              status={
                submitted
                  ? "submitted"
                  : "not-submitted"
              }
            />

          </div>

          {/* DESCRIPTION */}

          <p className="mb-5 min-h-[48px] text-sm leading-6 text-slate-600">
            {assignment.description}
          </p>

          {/* PROGRESS */}

          <div className="mb-5">
            <ProgressBar
              progress={progress}
            />
          </div>

        </div>

        {/* ACTIONS */}

        <div className="mt-auto flex flex-col gap-2 border-t border-slate-100 bg-slate-50 p-4 sm:flex-row">

          <button
            type="button"
            onClick={openAssignment}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            🔗
            Open Assignment
          </button>

          {!submitted && (
            <button
              type="button"
              onClick={() =>
                setShowModal(true)
              }
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              ✓
              I Have Submitted
            </button>
          )}

        </div>

      </div>

      {/* CONFIRMATION MODAL */}

      <Modal
        isOpen={showModal}
        title="Confirm Submission"
        onClose={() =>
          setShowModal(false)
        }
        onConfirm={handleConfirm}
        confirmText="Yes, Confirm"
      >

        <div className="space-y-3">

          <p>
            Have you completed and submitted
            this assignment?
          </p>

          <div className="rounded-xl bg-slate-50 p-4">

            <p className="font-semibold text-slate-800">
              {assignment.title}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              This will mark your assignment
              as submitted.
            </p>

          </div>

        </div>

      </Modal>
    </>
  );
}

export default AssignmentCard;