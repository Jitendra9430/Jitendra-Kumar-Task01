export const users = [
    {
        id: "student1",
        name: "Rahul Kumar",
        email: "rahul@student.com",
        password: "123456",
        role: "student",
    },
    {
        id: "student2",
        name: "Priya Singh",
        email: "priya@student.com",
        password: "123456",
        role: "student",
    },
    {
    id: "student3",
    name: "Aman Kumar",
    email: "aman@student.com",
    password: "123456",
    role: "student",
  },
  {
    id: "admin1",
    name: "Dr. Amit Verma",
    email: "admin@1234.com",
    password: "123456",
    role: "admin",
  },
];

export const initalAssignment = [
    {
        id: "assignment1",
        title: "React Fundamentals",
        description: "Build a responsive react application",
        deadline: "26-09-2026",
        createdBy: "admin1",
    },
    {
        id: "assignment2",
        title: "JavaScript ES6",
        description: "Solve javaScript problems by using ES6+ concepts",
        deadline: "27-09-2026",
        createdBy: "admin1",
    },
    {
    id: "assignment3",
    title: "CSS Responsive Design",
    description:
      "Create a responsive landing page for desktop, tablet and mobile.",
    deadline: "2026-10-02",
    createdBy: "admin1",
  },
];

export const initialSubmissions = [
  {
    assignmentId: "assignment1",
    studentId: "student1",
    status: "submitted",
  },
  {
    assignmentId: "assignment2",
    studentId: "student1",
    status: "not-submitted",
  },
  {
    assignmentId: "assignment3",
    studentId: "student1",
    status: "submitted",
  },

  {
    assignmentId: "assignment1",
    studentId: "student2",
    status: "submitted",
  },
  {
    assignmentId: "assignment2",
    studentId: "student2",
    status: "not-submitted",
  },
  {
    assignmentId: "assignment3",
    studentId: "student2",
    status: "not-submitted",
  },

  {
    assignmentId: "assignment1",
    studentId: "student3",
    status: "not-submitted",
  },
  {
    assignmentId: "assignment2",
    studentId: "student3",
    status: "submitted",
  },
  {
    assignmentId: "assignment3",
    studentId: "student3",
    status: "not-submitted",
  },
];