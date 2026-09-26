import { Link, useLocation } from "react-router-dom";

function Sidebar({ role }) {
  const location = useLocation();

  const studentLinks = [
    {
      name: "Dashboard",
      path: "/student",
    },
  ];

  const adminLinks = [
    {
      name: "Dashboard",
      path: "/admin",
    },
    {
      name: "Create Assignment",
      path: "/admin/create",
    },
  ];

  const links =
    role === "admin" ? adminLinks : studentLinks;

  return (
    <aside className="hidden min-h-[calc(100vh-64px)] w-64 border-r border-slate-200 bg-white md:block">
      <div className="p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Menu
        </p>

        <nav className="space-y-1">
          {links.map((link) => {
            const active = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;