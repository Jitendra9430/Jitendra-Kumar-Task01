import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import AssignmentCard from "../components/AssignmentCard";
import {
  getAssignments,
  getCurrentUser,
  getSubmissions,
  saveSubmissions,
} from "../utils/storage";

function StudentDashboard() {
  const user = getCurrentUser();

  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] =
    useState([]);

  useEffect(() => {
    setAssignments(getAssignments());
    setSubmissions(getSubmissions());
  }, []);

  const studentSubmissions = assignments.map(
    (assignment) => {
      const submission = submissions.find(
        (item) =>
          item.assignmentId === assignment.id &&
          item.studentId === user.id
      );

      return {
        assignment,
        submission: submission || {
          status: "not-submitted",
        },
      };
    }
  );

  const completed = studentSubmissions.filter(
    (item) =>
      item.submission.status === "submitted"
  ).length;

  const total = assignments.length;

  const pending = total - completed;

  const overallProgress =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const handleSubmit = (assignmentId) => {
    const currentSubmissions = getSubmissions();

    const updated = currentSubmissions.map(
      (submission) => {
        if (
          submission.assignmentId ===
            assignmentId &&
          submission.studentId === user.id
        ) {
          return {
            ...submission,
            status: "submitted",
          };
        }

        return submission;
      }
    );

    saveSubmissions(updated);
    setSubmissions(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex">
        <Sidebar role="student" />

        <main className="min-w-0 flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm font-medium text-indigo-600">
                Student Dashboard
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                Good morning, {user?.name?.split(" ")[0]} 👋
              </h1>

              <p className="mt-2 text-slate-500">
                Track your assignments and submission
                progress.
              </p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <DashboardCard
                title="Total Assignments"
                value={total}
                description="Assignments assigned to you"
                icon="📚"
              />

              <DashboardCard
                title="Completed"
                value={completed}
                description="Assignments submitted"
                icon="✓"
              />

              <DashboardCard
                title="Overall Progress"
                value={`${overallProgress}%`}
                description={`${pending} assignment(s) pending`}
                icon="📈"
              />
            </div>

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  My Assignments
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Complete and confirm your submissions.
                </p>
              </div>
            </div>

            {studentSubmissions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="font-semibold text-slate-700">
                  No assignments yet
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Your assignments will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
                {studentSubmissions.map(
                  ({
                    assignment,
                    submission,
                  }) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      submission={submission}
                      onSubmit={handleSubmit}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;