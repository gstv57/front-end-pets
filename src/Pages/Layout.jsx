import { useContext, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Loading from "./Component/Loading";
import Sidebar from "./partials/Sidebar";
import PetsIcon from "@mui/icons-material/Pets";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import HomeIcon from "@mui/icons-material/Home";
import ProfileNavbar from "./Component/ProfileNavbar";

export default function Layout() {
  const location = useLocation();
  const isRouteConsultas = location.pathname === "/consultas";
  const isRouteDashboard = location.pathname === "/dashboard";
  const isRoutePets = location.pathname === "/pets";
  const isRouteVacinas = location.pathname === "/vacinas";
  const { token, setUser, setToken } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        navigate("/");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro durante o logout:", error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow pb-16 bg-slate-300">
        {/* Adiciona padding inferior */}
        <div className="hidden md:block">
          <Sidebar className="w-64" />
        </div>
        <main className="flex-grow md:ml-64 ">
          <div className="w-full">
            <ProfileNavbar />
            {isLoading ? <Loading /> : null}
            <Outlet />
          </div>
        </main>
      </div>

      {/* Navbar fixa no rodapé para mobile */}
      <div className="md:hidden fixed bottom-0 w-full bg-custom-primary text-white p-4">
        <div className="flex justify-around">
          <Link
            to={"/dashboard"}
            className="focus:outline-none flex flex-col items-center"
          >
            <HomeIcon />
            {isRouteDashboard && (
              <span className="w-2 h-2 mt-1 bg-custom-badge_status_navbar_mobile rounded-full"></span>
            )}
          </Link>

          <Link
            to={"/consultas"}
            className="focus:outline-none flex flex-col items-center"
          >
            <FavoriteIcon />
            {isRouteConsultas && (
              <span className="w-2 h-2 mt-1 bg-custom-badge_status_navbar_mobile rounded-full"></span>
            )}
          </Link>
          <Link
            to={"/pets"}
            className="focus:outline-none flex flex-col items-center"
          >
            <PetsIcon />
            {isRoutePets && (
              <span className="w-2 h-2 mt-1 bg-custom-badge_status_navbar_mobile rounded-full"></span>
            )}
          </Link>

          <Link
            className="focus:outline-none flex flex-col items-center"
            to={"/vacinas"}
          >
            <VaccinesIcon />
            {isRouteVacinas && (
              <span className="w-2 h-2 mt-1 bg-custom-badge_status_navbar_mobile rounded-full"></span>
            )}
          </Link>
          <form onClick={handleLogout}>
            <button type="submit" className="focus:outline-none">
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
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
