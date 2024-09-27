import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Loading from "../Component/Loading";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import Breadcrumb from "../Component/Breadcrumb";
export default function Consulta() {
  const { token } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [vacinas, setVacinas] = useState([]);

  useEffect(() => {
    const fetchVacinas = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/vacinas", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setVacinas(data.data);
          console.log(data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchVacinas();
  }, [token]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="min-h-screen">
          <Breadcrumb path="Dashboard/Vacinas" />
          <div className="bg-custom-primary text-white p-1 uppercase flex justify-center items-center space-x-2">
            <h1 className="text-center font-bold text-3xl">Vacinas</h1>
            <VaccinesIcon />
          </div>

          <div className="bg-slate-200 text-white rounded p-1 uppercase">
            <div className="flex justify-between">
              <form className="w-full flex justify-between items-center space-x-1">
                <input
                  type="text"
                  className="w-full text-black p-1 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover rounded border border-custom-btn_primary_hover"
                  placeholder="Pesquisar por vacina"
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
                  <Link to={"/vacinas/criar"} className="text-slate-800">
                    <AddCircleOutlineIcon className="text-custom-icon_background" />
                  </Link>
                </span>
              </form>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="min-h-screen p-1">
              <div className="max-w-full mx-auto space-y-1">
                {/* loop */}

                {vacinas &&
                  vacinas.map((vacina) => (
                    <div
                      className="bg-white shadow-md rounded-lg p-4"
                      key={vacina.id}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div>
                          <h3 className="text-xl font-semibold flex items-center gap-2">
                            <i className="fas fa-syringe text-blue-600"></i>
                            {vacina.vacina}
                          </h3>
                          <p className="text-gray-600 flex items-center gap-2">
                            <i className="far fa-calendar-alt text-gray-500"></i>
                            Data: <b>{vacina.data_aplicacao}</b>
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <i className="fas fa-calendar-check text-gray-500"></i>
                            Próxima: <b>{vacina.proxima_dose}</b>
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <i className="fas fa-prescription-bottle-alt text-gray-500"></i>
                            Dose:
                            <span className="ml-1 inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                              <b>{vacina.dose}ª dose</b>
                            </span>
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <i className="fas fa-user-nurse text-gray-500"></i>
                            Aplicado por: <b>Gustavo</b>
                          </p>
                        </div>

                        <div className="flex md:justify-end space-x-1">
                          <Link
                            to={`/vacinas/${vacina.id}`}
                            className="p-2 bg-custom-primary hover:bg-custom-btn_primary_hover rounded-md text-white flex items-center gap-2"
                          >
                            <i className="fas fa-info-circle"></i> Mais
                            informações
                          </Link>

                          <button className="p-2 bg-custom-btn_danger hover:bg-custom-btn_danger_hover rounded-md text-white flex items-center gap-2">
                            <i className="fas fa-info-circle"></i> Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* endloop */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
