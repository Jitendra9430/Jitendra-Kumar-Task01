 import { Link, useLocation } from "react-router-dom";

function Sidebar({ role }) {
  const location = useLocation();

  const studentLinks = [
    {
      name: "Dashboard",
      path: "/student",
      icon: "▣",
    },
    {
      name: "Assignments",
      path: "/student#assignments",
      icon: "📚",
    },
    {
      name: "Progress",
      path: "/student#progress",
      icon: "📊",
    },
  ];

  const adminLinks = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "▣",
    },
    {
      name: "Create Assignment",
      path: "/admin/create",
      icon: "＋",
    },
  ];

  const links =
    role === "admin"
      ? adminLinks
      : studentLinks;

  const handleAnchorClick = (path) => {
    if (path.includes("#")) {
      const id = path.split("#")[1];

      setTimeout(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 100);
    }
  };

  return (
    <aside className="hidden min-h-[calc(100vh-64px)] w-64 shrink-0 border-r border-slate-200 bg-white md:block">
      <div className="sticky top-16 p-4">

        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
          Menu
        </p>

        <nav className="space-y-1">

          {links.map((link) => {

            const isDashboard =
              link.path === "/student" ||
              link.path === "/admin";

            const active =
              isDashboard &&
              location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() =>
                  handleAnchorClick(link.path)
                }
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                }`}
              >

                <span className="w-5 text-center">
                  {link.icon}
                </span>

                <span>
                  {link.name}
                </span>

              </Link>
            );
          })}

        </nav>

      </div>
    </aside>
  );
}

export default Sidebar;