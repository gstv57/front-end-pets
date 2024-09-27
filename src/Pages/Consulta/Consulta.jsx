import { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Loading from "../Component/Loading";
import SweetAlert2 from "react-sweetalert2";
import EmergencyIcon from "@mui/icons-material/Emergency";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FeedbackIcon from "@mui/icons-material/Feedback";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import Breadcrumb from "../Component/Breadcrumb";
export default function Consulta() {
  const { token } = useContext(AppContext);
  const [consultas, setConsultas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [destroyConsultaID, setDestroyConsultaID] = useState(null);
  const [swalProps, setSwalProps] = useState({});

  const handleClickDestroy = (id) => {
    setDestroyConsultaID(id);
    setSwalProps({
      show: true,
      title: "Tem certeza?",
      text: "Essa ação é irreversível.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Não, cancelar",
      confirmButtonColor: "#e02424",
    });
  };

  const handleSucessDestroyConsulta = () => {
    setSwalProps({
      show: true,
      title: "Sucesso!",
      text: "Ação realizada com sucesso!",
      icon: "success",
      timer: 1000,
    });
  };

  const handleSearch = (search) => {
    setSearchText(search);
  };

  const fetchConsultas = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/consultas?search=${encodeURIComponent(searchText)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setConsultas(data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token, searchText]);

  useEffect(() => {
    fetchConsultas();
  }, [fetchConsultas]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="min-h-screen">
          <Breadcrumb path="Dashboard/Consultas" />
          <div className="bg-custom-primary text-white p-1 uppercase flex justify-center items-center space-x-2">
            <h1 className="text-center font-bold text-3xl">Consultas</h1>
            <MedicalServicesIcon />
          </div>
          <div className="text-white rounded p-1 uppercase">
            <div className="flex justify-between">
              <form className="w-full flex justify-between items-center space-x-1">
                <input
                  type="text"
                  className="w-full text-black p-1 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover rounded border border-custom-btn_primary_hover"
                  placeholder="Pesquisar por consulta"
                />

                <span className="bg-custom-icon p-1 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-custom-icon_background"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </span>
                <span className="bg-custom-icon p-1 rounded">
                  <Link to={"/consultas/criar"} className="text-slate-800">
                    <AddCircleOutlineIcon className="text-custom-icon_background" />
                  </Link>
                </span>
              </form>
            </div>

            <div className="space-y-1">
              {consultas &&
                consultas.map((consulta) => (
                  <div
                    key={consulta.id}
                    className="bg-white shadow-md rounded-lg overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={
                            consulta.profile_picture ||
                            "https://via.placeholder.com/150"
                          }
                          alt={consulta.nome}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800">
                            {consulta.nome}
                          </h2>
                          <p className="text-sm text-gray-600">
                            Dono: {consulta.dono}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-blue-100 p-3 rounded-md flex items-center justify-center">
                          <CalendarTodayIcon className="w-5 h-5 mr-2 text-blue-600" />
                          <span className="text-blue-800">
                            {consulta.data} às {consulta.hora}
                          </span>
                        </div>
                        <div className="bg-green-100 p-3 rounded-md flex items-center justify-center">
                          <EmergencyIcon className="w-5 h-5 mr-2 text-green-600" />
                          <span className="text-green-800">
                            {consulta.veterinario}
                          </span>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-md">
                          <div className="flex items-center justify-center mb-1">
                            <FeedbackIcon className="w-5 h-5 mr-2 text-purple-600" />
                            <span className="font-semibold text-purple-800">
                              Motivo
                            </span>
                          </div>
                          <p className="text-sm text-purple-800 text-center">
                            {consulta.descricao}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Link
                          to={`/consultas/${consulta.id}`}
                          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 mr-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                          Ver Detalhes
                        </Link>

                        <button
                          onClick={() => handleClickDestroy(consulta.id)}
                          className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 mr-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                          CANCELAR
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <SweetAlert2
            {...swalProps}
            didClose={() => {
              setSwalProps({});
              setDestroyConsultaID(null);
            }}
            onConfirm={async (result) => {
              if (result.isConfirmed) {
                try {
                  const response = await fetch(
                    `/api/consultas/${destroyConsultaID}`,
                    {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  if (!response.ok) {
                    throw new Error("Erro na requisição");
                  }
                  if (response.ok) {
                    handleSucessDestroyConsulta();
                    fetchConsultas();
                  }
                  setDestroyConsultaID(null);
                } catch (error) {
                  console.error("Erro:", error);
                }
              }
            }}
          />
        </div>
      )}
    </>
  );
}
