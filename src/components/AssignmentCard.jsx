import { useState } from "react";
import ProgressBar from "./ProgressBar.jsx"
import StatusBadge from './StatusBadge.jsx'
import Modal from './Modal.jsx'

function AssignmentCard ({
    assignment,
    submission,
    onSubmit,
}) {
    const [showModal , setShowModal] = useState(false);

    const submitted = submission?.status === "submitted";

    const progress = submitted ? 100 : 0

    const handleConfirm = () => {
        onSubmit(assignment.id);
        setShowModal(false);
    };

    return (
        <>
        <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:translate-y-1 hover:shadow-md">
            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">
                        {assignment.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Due:{" "}
                        {new Date(
                            assignment.deadline

                        ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        })}
                    </p>
                </div>

                <StatusBadge
                status={
                    submitted?"submitted" : "not submitted"
                }
                />
            </div>

            <p className="mb-5 flex-1 text-sm leading-6 text-slate-600">
                {assignment.description}
            </p>

            <div className="mb-5">
                <ProgressBar progress={progress} />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
                <a href={assignment.drivelink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 round-xl border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                 >
                    Open Assignment

                </a>

                {!submitted && (
                    <button onClick={() => setShowModal(true)}
                    className="flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                        I Have Submitted
                    </button>
                )}
            </div>
        </div>

        <Modal
        isOPen={showModal}
        title="confirm submission"
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        confirmText="Yes, Confirm"
        >
            <p>
                Are you sure you have completed and submitted ?
                <strong>{assignment.title}</strong>?
            </p>

            <p className="mt-2">
                This action will mark your assignment as submitted.
            </p>
        </Modal>
        </>
    )
}

export default AssignmentCard;