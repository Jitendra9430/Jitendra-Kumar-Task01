 import { useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  logoutUser,
} from "../utils/storage";

function Navbar() {
  const navigate = useNavigate();

  const user = getCurrentUser();

  const logout = () => {
    logoutUser();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">

      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">

        <button
          type="button"
          onClick={() =>
            navigate(
              user.role === "admin"
                ? "/admin"
                : "/student"
            )
          }
          className="flex items-center gap-2"
        >

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-lg shadow-md shadow-indigo-100">
            🎓
          </div>

          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Task<span className="text-indigo-600">Flow</span>
          </span>

        </button>

        <div className="flex items-center gap-3">

          <div className="hidden text-right sm:block">

            <p className="text-sm font-bold text-slate-800">
              {user.name}
            </p>

            <p className="text-xs capitalize text-slate-400">
              {user.role}
            </p>

          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-extrabold text-indigo-700">
            {user.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;