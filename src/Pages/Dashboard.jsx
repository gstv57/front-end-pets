import { useState, useCallback, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md mb-4 text-white">
    <h2 className="text-lg font-semibold mb-2 text-center bg-custom-btn_primary">
      {title}
    </h2>
    {children}
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [dashboard, setDashboard] = useState([]);

  const [aiTip, setAiTip] = useState(
    "Mantenha a água do seu pet sempre fresca e limpa!"
  );

  const consultationData = {
    labels: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    datasets: [
      {
        label: "Consultas",
        data: [5, 12, 7, 15, 8, 20, 11, 9, 14, 4, 18, 6],
        backgroundColor: "#ff5252",
      },
    ],
  };

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setDashboard(data);
      } else {
        console.error("Erro ao buscar animais:", res.statusText);
      }
    } catch (error) {
      console.error("Erro durante a busca:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <div className="m-1">
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 2xl:space-x-1 xl:space-x-1 lg:space-x-1">
        <DashboardCard title="Consultas Recentes">
          <Bar
            data={consultationData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
              scales: {
                x: { beginAtZero: true },
                y: { beginAtZero: true },
              },
            }}
          />
        </DashboardCard>

        <DashboardCard title="Dica de IA Diária">
          <div className="flex flex-col items-center">
            <p className="text-lg text-gray-800 mb-4">{aiTip}</p>
            <button
              onClick={() =>
                setAiTip(
                  "Brinque com seu pet por pelo menos 15 minutos por dia!"
                )
              }
              className="mb-1 flex items-center bg-gradient-to-r from-custom-btn_primary_hover to-custom-btn_primary text-white px-4 py-2 rounded-lg shadow-md hover:from-custom-btn_primary_hover hover:to-blue-700 transition duration-500 ease-in-out"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 2v20m10-10H2"
                />
              </svg>
              <span className="text-base font-semibold">Nova Dica</span>
            </button>
          </div>
        </DashboardCard>

        <DashboardCard title="Próximas Vacinas">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <ul className="space-y-3">
              {isLoading ? (
                <div className="col-span-full text-center py-8 text-gray-500">
                  Carregando...
                </div>
              ) : dashboard &&
                dashboard.proximas_vacinas &&
                dashboard.proximas_vacinas.length > 0 ? (
                dashboard.proximas_vacinas.map((proxima_vacina) => (
                  <li
                    onClick={() => {
                      navigate(`/vacinas/${proxima_vacina.id}`);
                    }}
                    className="flex justify-between items-center transition duration-300 ease-in-out group hover:bg-custom-btn_primary rounded p-2"
                    key={proxima_vacina.id}
                  >
                    <span className="text-lg font-medium text-gray-700">
                      {proxima_vacina.vacina}
                    </span>
                    <span className="text-sm text-white bg-custom-btn_primary_hover py-1 px-2 rounded-md">
                      {proxima_vacina.proxima_dose}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">
                  Nenhuma vacina futura encontrada.
                </li>
              )}
            </ul>
          </div>
        </DashboardCard>

        <DashboardCard title="Próximas Consultas">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <ul className="space-y-3">
              {isLoading ? (
                <div className="col-span-full text-center py-8 text-gray-500">
                  Carregando...
                </div>
              ) : dashboard &&
                dashboard.proximas_consultas &&
                dashboard.proximas_consultas.length > 0 ? (
                dashboard.proximas_consultas.map((proximas_consulta) => (
                  <li
                    onClick={() => {
                      navigate(`/consultas/${proximas_consulta.id}`);
                    }}
                    className="flex justify-between items-center transition duration-300 ease-in-out group hover:bg-custom-btn_primary rounded p-2"
                    key={proximas_consulta.id}
                  >
                    <span className="text-lg font-medium text-gray-700">
                      {proximas_consulta.nome}
                    </span>
                    <span className="text-sm text-white bg-custom-btn_primary_hover py-1 px-2 rounded-md">
                      {proximas_consulta.data}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">
                  Nenhuma vacina futura encontrada.
                </li>
              )}
            </ul>
          </div>
        </DashboardCard>

        <DashboardCard title="Seus Pets">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {isLoading ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                Carregando...
              </div>
            ) : dashboard &&
              dashboard.meus_pets &&
              dashboard.meus_pets.length > 0 ? (
              dashboard.meus_pets.map((pet) => (
                <div
                  key={pet.id}
                  className="p-4 rounded-lg shadow-md flex flex-col items-center transition duration-300 ease-in-out group"
                >
                  <div className="rounded-full w-24 h-24 flex items-center justify-center mb-3 overflow-hidden group-hover:ring-4 ring-custom-btn_primary_hover transition duration-300">
                    {pet.fotos.length > 0 ? (
                      <img
                        src={pet.fotos[0].url}
                        className="w-full h-full object-cover object-center transition duration-300 transform group-hover:scale-105"
                        alt={`Foto de ${pet.nome}`}
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    )}
                  </div>

                  <p className="text-lg font-semibold text-gray-800 group-hover:text-custom-btn_primary_hover transition duration-300">
                    {pet.nome}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                Você ainda não cadastrou nenhum pet.
              </div>
            )}
          </div>
        </DashboardCard>

        <DashboardCard title="Dicas e Truques">
          <div className="bg-gray-50 p-4 rounded-lg">
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="bg-green-200 text-green-800 rounded-full p-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 3v6h6M4.293 7.293a1 1 0 011.414 0L12 11.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Escove os dentes do seu pet regularmente
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <div className="bg-blue-200 text-blue-800 rounded-full p-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-2.5 0-4.5 2-4.5 4s2 4 4.5 4 4.5-2 4.5-4-2-4-4.5-4zM12 6v3m0 4v2"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Faça exercícios diários com seu animal
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <div className="bg-yellow-200 text-yellow-800 rounded-full p-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v12m6-6H6"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">Mantenha as vacinas em dia</p>
              </li>
            </ul>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
