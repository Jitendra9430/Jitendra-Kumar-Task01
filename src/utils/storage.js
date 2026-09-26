import {
    initalAssignment,
    initialSubmissions,
} from "../data/mockData.js";

export const initializeStorage = () => {
    if (!localStorage.getItem("assignments")) {
        localStorage.setItem(
            "assignments",
            JSON.stringify(initalAssignment)
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
    return JSON.parse(localStorage.getItem("assignments")) || [];
};

export const saveAssignments = (assignments) => {
    localStorage.setItem(
        "assignments",
        JSON.stringify(assignments)
    );
};

export const getSubmissions = () => {
    return JSON.parse(localStorage.getItem("submissions")) || [];
};

export const saveSubmissions = (submissions) => {
    localStorage.setItem(
        "submissions",
        JSON.stringify(submissions)
    );
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
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