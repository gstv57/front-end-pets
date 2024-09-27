import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import Loading from "../Component/Loading";
import PhotoIcon from "@mui/icons-material/Photo";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadPhoto from "./UploadPhoto";
import Breadcrumb from "../Component/Breadcrumb";
export default function PetProfile() {
  const { token } = useContext(AppContext);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [animal, setAnimal] = useState([]);

  // const notify = (msg) =>
  //   toast.success(msg, {
  //     position: "top-right",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //   });

  useEffect(() => {
    const fetchAnimal = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/animals/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setAnimal(data.data);
          setIsLoading(false);
        } else {
          console.error("Erro ao buscar animal:", res.statusText);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erro durante a busca do animal:", error);
        setIsLoading(false);
      }
    };
    fetchAnimal();
  }, [token, id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Breadcrumb path={`Dashboard/Meus Pets/Perfil/${animal.nome}`} />
          <div className="container-fluid space-y-1">
            <div className="bg-white overflow-hidden">
              <div className="relative h-64 sm:h-80">
                <img
                  src={
                    animal.fotos && animal.fotos.length > 0
                      ? animal.fotos[0].url
                      : ""
                  }
                  alt="sem fotos"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 sm:p-6">
                  <h1 className="text-2xl sm:text-4xl font-bold text-white">
                    {animal.nome}, 1 ano
                  </h1>
                  <p className="text-sm sm:text-xl text-gray-300">
                    {animal.especie}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:space-x-1 ml-1">
              <div className="bg-white">
                <h2 className="sm:text-2xl md:text-xs lg:text-xl font-semibold bg-custom-primary p-2 text-white flex justify-between items-center">
                  Informações Básicas
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
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                    />
                  </svg>
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-custom-btn_primary_hover"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      ></path>
                    </svg>
                    Peso: {animal.peso}
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-custom-btn_primary_hover"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                    Sexo: {animal.sexo}
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-custom-btn_primary_hover"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      ></path>
                    </svg>
                    Castrado: Sim
                  </li>
                </ul>
              </div>
              <div className="bg-white">
                <h2 className="text-xl sm:text-2xl md:text-xs lg:text-xl font-semibold bg-custom-primary p-2 text-white flex justify-between">
                  Saúde
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
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-custom-btn_primary_hover"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Próxima vacina: data proxima vacina
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-custom-btn_primary_hover"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Próxima consulta: proxima consulta
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-custom-btn_primary_hover"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                    Veterinário: Gustavo Henrique de Moraes
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex md:text-xs lg:text-xl justify-between bg-custom-primary  p-3 text-white text-center font-bold ml-1 ">
              <div className="">Galeria de Fotos</div>
              <PhotoIcon />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {animal.fotos &&
                animal.fotos.map((foto) => (
                  <div key={foto.id}>
                    <img
                      className="h-auto w-auto -lg"
                      src={foto.url}
                      alt={animal.nome}
                    ></img>
                  </div>
                ))}
            </div>

            <div className="flex md:text-xs lg:text-xl justify-between bg-custom-primary  p-3 text-white text-center font-bold ml-1">
              <div className="">Adicione novas fotos</div>
              <AddAPhotoIcon />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ml-1">
              <UploadPhoto id={id} />
            </div>

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </div>
      )}
    </>
  );
}
