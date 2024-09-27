import { Link, useLocation } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import VaccinesIcon from "@mui/icons-material/Vaccines";
export default function Sidebar() {
  const location = useLocation();

  const isRouteDashboard = location.pathname === "/dashboard";
  const isRoutePets = location.pathname === "/pets";
  const isRouteConsultas = location.pathname === "/consultas";
  const isRouteVacinas = location.pathname === "/vacinas";
  const isRouteProfile = location.pathname === "/profile";
  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-custom-primary">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white flex items-center">
            Petmania
            <PetsIcon />
          </span>
          <ul className="space-y-2 font-medium mt-2">
            <li>
              <Link
                to={"/dashboard"}
                className={`flex items-center p-2 rounded-lg group ${
                  isRouteDashboard
                    ? "text-black bg-gray-100"
                    : "text-white hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <svg
                  className={`size-6 transition-colors duration-200 ${
                    isRouteDashboard
                      ? "fill-black"
                      : "fill-white group-hover:fill-gray-900"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/pets"}
                className={`flex items-center p-2 rounded-lg group ${
                  isRoutePets
                    ? "text-black bg-gray-100"
                    : "text-white hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className={`size-6 transition-colors duration-200 ${
                    isRoutePets
                      ? "stroke-black fill-white"
                      : "stroke-white fill-none group-hover:stroke-gray-900"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Meus Pets</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/consultas"}
                className={`flex items-center p-2 rounded-lg group
      ${
        isRouteConsultas
          ? "text-black bg-gray-100"
          : "text-white hover:bg-gray-100 hover:text-gray-900"
      }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className={`size-6 transition-colors duration-200
        ${
          isRouteConsultas
            ? "stroke-black fill-white"
            : "stroke-white fill-none group-hover:stroke-gray-900"
        }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Consultas</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/vacinas"}
                className={`flex items-center p-2 rounded-lg group ${
                  isRouteVacinas
                    ? "text-black bg-gray-100"
                    : "text-white hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className={`size-6 transition-colors duration-200 ${
                    isRouteVacinas
                      ? "stroke-black fill-white"
                      : "stroke-white fill-none group-hover:stroke-gray-900"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Vacinas</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/profile"}
                className={`flex items-center p-2 rounded-lg group ${
                  isRouteProfile
                    ? "text-black bg-gray-100"
                    : "text-white hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-900 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-900 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
