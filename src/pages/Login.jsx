// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {users} from"../data/mockData.js"
// import {
//     initializeStorage,
//     saveCurrentUser,
// } from "../utils/storage.js"

// function Login() {
//     const Navigate = useNavigate();

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const [error, setError] = useState("");

//     const handleLogin = (e) => {
//         e.preventDefault();

//         const user = users.find(
//             (item) => 
//                 item.email === email &&
//                 item.password === password
//         );

//         if(!user){
//             setError("Invalid email or password");
//             return;
//         }

//         initializeStorage();
//         saveCurrentUser(user);

//         if(user.role ==="student"){
//             navigate("/student");
//         } else{
//             navigate("/admin");
//         }
//     };

//     const demoLogin = (role) => {
//         const user = users.find(
//             (item) => item.role === role
//         );

//         initializeStorage();
//         saveCurrentUser(user);

//         if(role ==="student"){
//             navigate("/student");
//         } else{
//             navigate("/admin");
//         }
//     };

//     return(
//         <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
//             <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid cols-2">
//                 <div className="hidden bg-indigo-600 p-10 text-white md-flex md-flex-col md:justify-center">
//                     <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-indigo-200">
//                         Assignment Management
//                     </p>

//                     <h1 className="text-4xl font-bold leading-tight">
//                         Manage assignments with clarity.
//                     </h1>

//                     <p className="mt-5 leading-7 text-indigo-100">
//                         A simple workspace for students and professors to track assignments progress and submissions.
//                     </p>
//                 </div>

//                 <div className="p-6 sm:p-10">
//                     <div className="mb-8">
//                         <h2 className="text-3xl font-bold text-slate-900">
//                             Welcome back!
//                         </h2>

//                         <p className="mt-2 text-sm text-slate-500">
//                             Sign in to your dashboard.
//                         </p>
//                     </div>

//                     <form 
//                     onSubmit={handleLogin}
//                     className="space-y-5">
//                         <div>
//                             <label className="mb-2 block text-sm font-medium text-slate-700">

//                                 Email
//                             </label>

//                             <input type="email"
//                             value={email}
//                             onChange={(e) =>
//                                 setEmail(e.target.value)
//                             }
//                             placeholder="your@gmail.com"
//                             className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                             required
//                             />
//                         </div>

//                         <div>
//                             <label className="mb-2 block text-sm font-medium text-slate-700">
//                                 Password
//                             </label>

//                             <input type="password"
//                             value={password}
//                             onChange={(e) => 
//                                 setPassword(e.target.value)
//                             }
//                             placeholder="*******" 
//                             className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                             required
                            
//                             />
//                         </div>

//                         {error && (
//                             <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
//                                 {error}
//                             </p>
//                         )}

//                         <button 
//                         type="submit"
//                         className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700">
//                             Sign In
//                         </button>
//                     </form>

//                     <div className="my-6flex items-center gap-3">
//                         <div className="h-px flex-1 bg-slate-200">
//                             <span className="text-xs text-slate-400"
//                             >
//                                 DEMO LOGIN
//                             </span>
//                             <div className="h-px flex-1 bg-slate-200"/>                        </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                         <button
//                         onClick={() => demoLogin("student")}
//                         className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
//                             Student
//                         </button>

//                         <button
//                         onClick={() => demoLogin("admin")}
//                         className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//                         >
//                             Admin
//                         </button>
//                     </div>
//                     <p className="mt-5 text-center text-xs text-slate-400">
//                         Demo password: 123456
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Login;



import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { users } from "../data/mockData";
import {
  initializeStorage,
  saveCurrentUser,
} from "../utils/storage";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ================================
  // LOGIN FUNCTION
  // ================================

  const loginUser = (user) => {
    console.log("LOGIN USER:", user);

    try {
      // Initialize assignment data
      initializeStorage();

      // Save logged-in user
      saveCurrentUser(user);

      // Verify localStorage
      const savedUser =
        localStorage.getItem("currentUser");

      console.log(
        "SAVED USER:",
        savedUser
      );

      // Navigate according to role
      if (user.role === "student") {
        console.log("Navigating to student...");
        navigate("/student");
      } else if (user.role === "admin") {
        console.log("Navigating to admin...");
        navigate("/admin");
      }

    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err
      );

      setError(
        "Something went wrong while logging in."
      );
    }
  };

  // ================================
  // NORMAL LOGIN
  // ================================

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    const enteredEmail =
      email.trim().toLowerCase();

    const user = users.find(
      (item) =>
        item.email.toLowerCase() ===
          enteredEmail &&
        item.password === password
    );

    if (!user) {
      setError(
        "Invalid email or password."
      );

      return;
    }

    loginUser(user);
  };

  // ================================
  // DEMO LOGIN
  // ================================

  const handleDemoLogin = (role) => {
    console.log(
      "DEMO BUTTON CLICKED:",
      role
    );

    setError("");

    const user = users.find(
      (item) => item.role === role
    );

    console.log(
      "DEMO USER FOUND:",
      user
    );

    if (!user) {
      setError(
        `No ${role} demo user found.`
      );

      return;
    }

    loginUser(user);
  };

  return (
    <div className="login-page">

      {/* =================================
          LEFT SIDE
      ================================= */}

      <section className="login-left">

        <div className="login-brand">

          <div className="brand-logo">

            <div className="brand-icon">
              🎓
            </div>

            <div className="brand-name">
              TaskFlow
            </div>

          </div>

          <div className="brand-tag">
            🎓 Assignment Management
          </div>

        </div>

        <div className="login-left-content">

          <div className="eyebrow">
            ✨ Simplify
            <span>•</span>
            Track
            <span>•</span>
            Succeed
          </div>

          <h1 className="login-title">
            Manage assignments
            <br />
            with <span>clarity.</span>
          </h1>

          <p className="login-description">
            A simple workspace for students and
            professors to track assignments,
            monitor progress, and manage
            submissions effortlessly.
          </p>

          <div className="features">

            <div className="feature">

              <div className="feature-icon">
                📚
              </div>

              <div>
                <h3>
                  View & Create Assignments
                </h3>

                <p>
                  Students view, admins create
                  and manage assignments.
                </p>
              </div>

            </div>

            <div className="feature">

              <div className="feature-icon">
                📊
              </div>

              <div>
                <h3>
                  Track Progress
                </h3>

                <p>
                  Visual progress indicators
                  for every assignment.
                </p>
              </div>

            </div>

            <div className="feature">

              <div className="feature-icon">
                👥
              </div>

              <div>
                <h3>
                  Stay Organized
                </h3>

                <p>
                  Clean and easy-to-use
                  dashboards.
                </p>
              </div>

            </div>

          </div>

        </div>

        <div className="login-quote">

          <p>
            "Education is the most powerful
            weapon which you can use to
            change the world."
          </p>

          <span>
            — Nelson Mandela
          </span>

        </div>

      </section>

      {/* =================================
          RIGHT SIDE
      ================================= */}

      <section className="login-right">

        <div className="login-card">

          <div className="login-card-header">

            <h2>
              Welcome back! 👋
            </h2>

            <p>
              Sign in to your dashboard.
            </p>

          </div>

          {/* LOGIN FORM */}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="form-group">

              <label className="form-label">
                Email
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  className="form-input"
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="form-group">

              <label className="form-label">
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  className="form-input"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword
                    ? "🙈"
                    : "👁"}
                </button>

              </div>

            </div>

            {/* ERROR */}

            {error && (
              <div className="login-error">
                <span>⚠️</span>

                <span>
                  {error}
                </span>
              </div>
            )}

            {/* NORMAL LOGIN */}

            <button
              type="submit"
              className="sign-in-button"
            >
              Sign In →
            </button>

          </form>

          {/* DIVIDER */}

          <div className="divider">

            <div className="divider-line" />

            <span>OR</span>

            <div className="divider-line" />

          </div>

          {/* DEMO LOGIN */}

          <p className="demo-title">
            QUICK DEMO LOGIN
          </p>

          <div className="demo-buttons">

            {/* STUDENT */}

            <button
              type="button"
              className="demo-button student-demo"
              onClick={() =>
                handleDemoLogin("student")
              }
            >
              👨‍🎓
              <span>
                Student
              </span>
            </button>

            {/* ADMIN */}

            <button
              type="button"
              className="demo-button admin-demo"
              onClick={() =>
                handleDemoLogin("admin")
              }
            >
              👨‍🏫
              <span>
                Admin
              </span>
            </button>

          </div>

          {/* DEMO PASSWORD */}

          <div className="demo-password">
            🔑

            <span>
              Demo password:
              {" "}
              <strong>
                123456
              </strong>
            </span>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Login;