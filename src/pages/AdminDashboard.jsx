import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import ProgressBar from "../components/ProgressBar";
import StatusBadge from "../components/StatusBadge";
import {
  getAssignments,
  getSubmissions,
} from "../utils/storage";
import { users } from "../data/mockData";

function AdminDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] =
    useState([]);

  useEffect(() => {
    setAssignments(getAssignments());
    setSubmissions(getSubmissions());
  }, []);

  const students = users.filter(
    (user) => user.role === "student"
  );

  const totalPossible =
    assignments.length * students.length;

  const totalSubmitted = submissions.filter(
    (item) => item.status === "submitted"
  ).length;

  const submissionRate =
    totalPossible === 0
      ? 0
      : Math.round(
          (totalSubmitted / totalPossible) * 100
        );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex">
        <Sidebar role="admin" />

        <main className="min-w-0 flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-medium text-indigo-600">
                  Admin Dashboard
                </p>

                <h1 className="mt-1 text-3xl font-bold text-slate-900">
                  Assignment Overview
                </h1>

                <p className="mt-2 text-slate-500">
                  Manage assignments and monitor student
                  submissions.
                </p>
              </div>

              <Link
                to="/admin/create"
                className="rounded-xl bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
              >
                + Create Assignment
              </Link>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <DashboardCard
                title="Assignments"
                value={assignments.length}
                description="Assignments created"
                icon="📚"
              />

              <DashboardCard
                title="Students"
                value={students.length}
                description="Students being tracked"
                icon="👥"
              />

              <DashboardCard
                title="Submission Rate"
                value={`${submissionRate}%`}
                description="Overall submission rate"
                icon="📊"
              />
            </div>

            <div className="space-y-6">
              {assignments.map((assignment) => {
                const assignmentSubmissions =
                  students.map((student) => {
                    const submission =
                      submissions.find(
                        (item) =>
                          item.assignmentId ===
                            assignment.id &&
                          item.studentId ===
                            student.id
                      );

                    return {
                      student,
                      status:
                        submission?.status ||
                        "not-submitted",
                    };
                  });

                const submittedCount =
                  assignmentSubmissions.filter(
                    (item) =>
                      item.status === "submitted"
                  ).length;

                const assignmentProgress =
                  students.length === 0
                    ? 0
                    : Math.round(
                        (submittedCount /
                          students.length) *
                          100
                      );

                return (
                  <div
                    key={assignment.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
                  >
                    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">
                          {assignment.title}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          Deadline:{" "}
                          {new Date(
                            assignment.deadline
                          ).toLocaleDateString(
                            "en-IN"
                          )}
                        </p>
                      </div>

                      <div className="w-full md:w-64">
                        <ProgressBar
                          progress={
                            assignmentProgress
                          }
                        />
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[600px]">
                        <thead>
                          <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wider text-slate-400">
                            <th className="pb-3">
                              Student
                            </th>
                            <th className="pb-3">
                              Progress
                            </th>
                            <th className="pb-3">
                              Status
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {assignmentSubmissions.map(
                            ({
                              student,
                              status,
                            }) => (
                              <tr
                                key={student.id}
                                className="border-b border-slate-50 last:border-none"
                              >
                                <td className="py-4">
                                  <div>
                                    <p className="font-semibold text-slate-800">
                                      {student.name}
                                    </p>

                                    <p className="text-xs text-slate-400">
                                      {student.email}
                                    </p>
                                  </div>
                                </td>

                                <td className="w-64 py-4">
                                  <ProgressBar
                                    progress={
                                      status ===
                                      "submitted"
                                        ? 100
                                        : 0
                                    }
                                  />
                                </td>

                                <td className="py-4">
                                  <StatusBadge
                                    status={status}
                                  />
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;