import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import ProtectedRoute from "./Middleware/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Animals from "./Pages/Animals/Animals";
import PetProfile from "./Pages/Animals/PetProfile";
import PetCreate from "./Pages/Animals/PetCreate";
import Consulta from "./Pages/Consulta/Consulta";
import ConsultaCreate from "./Pages/Consulta/ConsultaCreate";
import ConsultaShow from "./Pages/Consulta/ConsultaShow";
import Vacina from "./Pages/Vacinas/Vacina";
import VacinaCreate from "./Pages/Vacinas/VacinaCreate";
import VacinaShow from "./Pages/Vacinas/VacinaShow";
export default function App() {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pets" element={<Animals />} />
            <Route path="/pets/criar" element={<PetCreate />} />
            <Route path="/pets/profile/:id" element={<PetProfile />} />
            <Route path="/consultas" element={<Consulta />} />
            <Route path="/consultas/:id" element={<ConsultaShow />} />
            <Route path="/consultas/criar" element={<ConsultaCreate />} />
            <Route path="/vacinas" element={<Vacina />} />
            <Route path="/vacinas/:id" element={<VacinaShow />} />
            <Route path="/vacinas/criar" element={<VacinaCreate />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
