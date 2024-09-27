import { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Loading from "../Component/Loading";
import SweetAlert2 from "react-sweetalert2";
import PetsIcon from "@mui/icons-material/Pets";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CakeIcon from "@mui/icons-material/Cake";
import Breadcrumb from "../Component/Breadcrumb";
export default function Animals() {
  const { token } = useContext(AppContext);
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [swalProps, setSwalProps] = useState({});
  const [destroyAnimalID, setDestroyAnimalID] = useState(null);
  const handleClickDestroy = (id) => {
    setDestroyAnimalID(id);
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

  const handleSucessDestroyAnimal = () => {
    setSwalProps({
      show: true,
      title: "Sucesso!",
      text: "Ação realizada com sucesso!",
      icon: "success",
      timer: 1000,
    });
  };

  const fetchAnimals = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/animals", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setAnimals(data.data);
        setIsLoading(false);
      } else {
        console.error("Erro ao buscar animais:", res.statusText);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro durante a busca:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  return (
    <>
      <div className="">
        <Breadcrumb path="Dashboard/Meus Pets" />
        <div className="bg-custom-primary text-white p-1 uppercase flex justify-center space-x-2 items-center">
          <h1 className="text-center font-bold text-3xl">Meus Pets</h1>
          <PetsIcon />
        </div>

        <div className="bg-slate-200 text-white rounded p-1 uppercase">
          {isLoading ? (
            <Loading />
          ) : (
            <form className="w-full flex justify-between items-center space-x-1">
              <input
                type="text"
                className="w-full text-black p-1 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover rounded border border-custom-btn_primary_hover"
                placeholder="Pesquisar por pet"
              ></input>
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
                <Link to={"/pets/criar"} className="text-slate-800 ">
                  <AddCircleOutlineIcon className="text-custom-icon_background" />
                </Link>
              </span>
            </form>
          )}
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 2xl:space-x-1 xl:space-x-1 lg:space-x-1 md:space-y-1 sm:space-y-1">
          {animals &&
            animals.map((animal) => (
              <div
                className="bg-white rounded shadow-lg overflow-hidden border border-gray-200 m-1"
                key={animal.id}
              >
                <div className="relative">
                  <img
                    src={
                      animal.fotos && animal.fotos.length > 0
                        ? animal.fotos[0].url
                        : ""
                    }
                    alt={animal.nome}
                    className="w-full h-48 object-cover rounded border-slate-800"
                  />
                  <div className="absolute top-4 right-4 bg-custom-badge_pet text-white px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-md">
                    {animal.especie}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {animal.nome}
                    </h2>
                    <span className="p-1 rounded text-sm text-white bg-custom-badge_raca">
                      {animal.raca}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <CakeIcon className="text-custom-btn_primary_hover" />
                    <span className="text-sm">{animal.idade} anos</span>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-custom-btn_primary_hover"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        Próxima vacina:{" "}
                        <strong className="font-semibold">15/10/2024</strong>
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-custom-btn_primary_hover"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        Próxima consulta:{" "}
                        <strong className="font-semibold">05/11/2024</strong>
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-custom-btn_primary_hover"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      <span>
                        Peso:{" "}
                        <strong className="font-semibold">
                          {animal.peso} kg
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-custom-btn_primary_hover"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>
                        Veterinário:{" "}
                        <strong className="font-semibold">
                          Gustavo Henrique
                        </strong>
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Link
                      className="text-white bg-custom-btn_primary hover:bg-custom-btn_primary_hover focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none transition duration-300 ease-in-out"
                      to={`/pets/profile/${animal.id}`}
                    >
                      Ver Perfil
                    </Link>

                    <button
                      onClick={() => handleClickDestroy(animal.id)}
                      className="text-white bg-custom-btn_danger hover:bg-custom-btn_danger_hover focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none transition duration-300 ease-in-out"
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
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
          setDestroyAnimalID(null);
        }}
        onConfirm={async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await fetch(`/api/animals/${destroyAnimalID}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if (!response.ok) {
                throw new Error("Erro na requisição");
              }
              if (response.ok) {
                handleSucessDestroyAnimal();
                fetchAnimals();
              }
              setDestroyAnimalID(null);
            } catch (error) {
              console.error("Erro:", error);
            }
          }
        }}
      />
    </>
  );
}
