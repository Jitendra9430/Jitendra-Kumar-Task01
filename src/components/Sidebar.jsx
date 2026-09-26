 import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ role }) {
  const location = useLocation();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const studentLinks = [
  {
    name: "Dashboard",
    path: "/student",
    icon: "▣",
  },
  {
    name: "Assignments",
    path: "/student/assignments",
    icon: "📚",
  },
  {
    name: "Progress",
    path: "/student/progress",
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

  const navigateHash = (path) => {
    setMobileOpen(false);

    if (path.includes("#")) {
      const id = path.split("#")[1];

      setTimeout(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 150);
    }
  };

  return (
    <>
      {/* MOBILE BUTTON */}

      <button
        type="button"
        onClick={() =>
          setMobileOpen(true)
        }
        className="fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-xl text-white shadow-xl md:hidden"
      >
        ☰
      </button>

      {/* DESKTOP */}

      <aside className="hidden min-h-[calc(100vh-64px)] w-64 shrink-0 border-r border-slate-200 bg-white md:block">

        <SidebarContent
          links={links}
          location={location}
          navigateHash={navigateHash}
        />

      </aside>

      {/* MOBILE */}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">

          <div
            className="absolute inset-0 bg-slate-950/40"
            onClick={() =>
              setMobileOpen(false)
            }
          />

          <aside className="relative h-full w-72 bg-white shadow-2xl">

            <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">

              <span className="text-lg font-extrabold">
                Menu
              </span>

              <button
                type="button"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>

            </div>

            <SidebarContent
              links={links}
              location={location}
              navigateHash={navigateHash}
            />

          </aside>

        </div>
      )}
    </>
  );
}

function SidebarContent({
  links,
  location,
  navigateHash,
}) {
  return (
    <div className="p-4">

      <p className="mb-3 px-3 text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
        Workspace
      </p>

      <nav className="space-y-1">

        {links.map((link) => {

          const basePath =
            link.path.split("#")[0];

          const active =
            location.pathname === link.path;

          return (
            <Link
                 key={link.path}
                 to={link.path}
                 onClick={() => setMobileOpen(false)}
                 className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${
                 active
                 ? "bg-indigo-50 text-indigo-700"
               : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
              }`}
>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50     text-base">
            {link.icon}
            </span>

              {link.name}
            </Link>
          );
        })}

      </nav>

    </div>
  );
}

export default Sidebar;