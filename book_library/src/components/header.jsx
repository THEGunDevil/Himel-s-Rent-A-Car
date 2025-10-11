"use client";
import Link from "next/link";
import Logo from "./logo";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "./searchBar";
import { SidebarIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/contexts/authContext";
export default function Header() {
  const { token, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleRef = useRef(null); // Ref for the hamburger button
  const pathname = usePathname();
  const router = useRouter();
  const navigation = [
    { title: "Home", path: "/" },
    { title: "Browse Books", path: "/browse_books" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    ...(token ? [{ title: "Profile", path: "/profile" }] : []),
    ...(token
      ? [
          {
            title: "Dashboard",
            path: "/dashboard/addbook",
            hiddenOnMobile: true,
          },
        ]
      : []),
    ...(!token
      ? [
          { title: "Log In", path: "/auth/log-in" },
          { title: "Sign Up", path: "/auth/sign-up" },
        ]
      : [{ title: "Log Out", path: "#" }]),
  ];

  // Close sidebar when clicking outside (ignoring the toggle button)
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setLogoutDialogOpen(false);
    router.push("/");
  };

  return (
    <>
      <header className="w-screen md:h-28 border-blue-300 border-b h-20 flex fixed items-center justify-between xl:px-60 lg:px-30 md:px-8 px-4">
        {/* Logo */}
        <div className="md:flex hidden justify-center items-center">
          <Logo width={112} />
        </div>
        <div className="md:hidden flex justify-center items-center">
          <Logo width={82} />
        </div>

        {/* Search */}
        <div className="relative md:flex hidden">
          <SearchBar />
        </div>

        {/* Navigation */}
        <nav className="lg:flex hidden">
          <ul className="flex gap-6 uppercase font-medium text-sm">
            {navigation.map((nav) => (
              <li
                key={nav.path}
                className={nav.hiddenOnMobile ? "hidden sm:block" : ""}
              >
                {nav.title === "Log Out" ? (
                  <button
                    onClick={handleLogoutClick}
                    className="hover:text-blue-400 text-gray-700 uppercase font-medium"
                  >
                    Log Out
                  </button>
                ) : (
                  <Link
                    href={nav.path}
                    className={`hover:text-blue-400 ${
                      pathname === nav.path
                        ? "text-blue-400 font-bold"
                        : "text-gray-700"
                    }`}
                  >
                    {nav.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar */}
        <nav
          ref={sidebarRef}
          className={`fixed lg:hidden top-0 left-0 h-screen w-sm p-8 bg-blue-200 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="absolute border-l w-1/2 bg-gradient-to-r from-blue-400 to-blue-200">
            <Logo width={100} />
          </div>

          <ul className="flex gap-6 uppercase font-medium text-lg flex-col mt-40">
            {navigation.map((nav) => (
              <li
                key={nav.path}
                className={nav.hiddenOnMobile ? "hidden sm:block" : ""}
              >
                {nav.title === "Log Out" ? (
                  <button
                    onClick={handleLogoutClick}
                    className="hover:text-blue-400 text-gray-700 uppercase font-medium"
                  >
                    Log Out
                  </button>
                ) : (
                  <Link
                    href={nav.path}
                    className={`hover:text-blue-400 ${
                      pathname === nav.path
                        ? "text-blue-400 font-bold"
                        : "text-gray-700"
                    }`}
                  >
                    {nav.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger Icon */}
        <div
          ref={toggleRef}
          className="cursor-pointer lg:hidden"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <SidebarIcon className="h-7 w-7" />
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      {logoutDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Log Out
              </button>
              <button
                onClick={() => setLogoutDialogOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
