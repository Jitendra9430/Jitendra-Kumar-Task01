 import {
  initialAssignments,
  initialSubmissions,
} from "../data/mockData";

export const initializeStorage = () => {
  if (!localStorage.getItem("assignments")) {
    localStorage.setItem(
      "assignments",
      JSON.stringify(initialAssignments)
    );
  }

  if (!localStorage.getItem("submissions")) {
    localStorage.setItem(
      "submissions",
      JSON.stringify(initialSubmissions)
    );
  }
};

export const getAssignments = () => {
  try {
    return JSON.parse(
      localStorage.getItem("assignments") || "[]"
    );
  } catch {
    return [];
  }
};

export const saveAssignments = (assignments) => {
  localStorage.setItem(
    "assignments",
    JSON.stringify(assignments)
  );
};

export const deleteAssignment = (assignmentId) => {
  const assignments = getAssignments();

  saveAssignments(
    assignments.filter(
      (assignment) =>
        assignment.id !== assignmentId
    )
  );

  // Also remove related submissions
  const submissions = getSubmissions();

  saveSubmissions(
    submissions.filter(
      (submission) =>
        submission.assignmentId !==
        assignmentId
    )
  );
};

export const updateAssignment = (
  assignmentId,
  updatedData
) => {
  const assignments = getAssignments();

  const updated = assignments.map(
    (assignment) =>
      assignment.id === assignmentId
        ? {
            ...assignment,
            ...updatedData,
          }
        : assignment
  );

  saveAssignments(updated);
};

export const getSubmissions = () => {
  try {
    return JSON.parse(
      localStorage.getItem("submissions") ||
        "[]"
    );
  } catch {
    return [];
  }
};

export const saveSubmissions = (
  submissions
) => {
  localStorage.setItem(
    "submissions",
    JSON.stringify(submissions)
  );
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(
      localStorage.getItem("currentUser")
    );
  } catch {
    return null;
  }
};

export const saveCurrentUser = (user) => {
  localStorage.setItem(
    "currentUser",
    JSON.stringify(user)
  );
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};