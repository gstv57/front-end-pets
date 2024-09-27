import { useContext, useState, useCallback, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import Loading from "../Component/Loading";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../Component/SubmitButton";
import Breadcrumb from "../Component/Breadcrumb";
export default function Consulta() {
  const { token } = useContext(AppContext);
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    animal_id: "",
    data: "",
    hora: "",
    descricao: "",
    veterinario: "",
    diagnostico: "",
    prescricao: "",
  });

  async function handleCreate(e) {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/consultas", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      setIsLoading(false);
      setIsSuccess(true);
      navigate(`/consultas`);
      // navigate(`/consultas/${data.id}`);
    } else {
      console.error(data.errors);
      setErrors(data.errors);
      setIsLoading(false);
    }
  }

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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="min-h-screen">
          <Breadcrumb path="Dashboard/Consulta/Criar" />

          <form
            className="space-y-auto bg-white p-6 m-1 rounded-md shadow-md grid md:grid-cols-1 lg:grid-cols-2 lg:space-x-1 md:space-x-1"
            onSubmit={handleCreate}
          >
            <div>
              <label
                htmlFor="animal_id"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Pet <span className="text-red-500">*</span>
              </label>
              <select
                id="animal_id"
                name="animal_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover block w-full p-2.5"
                value={formData.animal_id}
                onChange={(e) => {
                  setFormData({ ...formData, animal_id: e.target.value });
                }}
              >
                <option value="">Selecione um pet</option>
                {animals &&
                  animals.map((animal) => (
                    <option key={animal.id} value={animal.id}>
                      {animal.nome}
                    </option>
                  ))}
              </select>
              {errors.animal_id && (
                <p className="text-red-600">{errors.animal_id}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="data"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Data <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="data"
                name="data"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover block w-full p-2.5"
                value={formData.data}
                onChange={(e) => {
                  setFormData({ ...formData, data: e.target.value });
                }}
              ></input>
              {errors.data && <p className="text-red-600">{errors.data}</p>}
            </div>

            <div>
              <label
                htmlFor="hora"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Hora <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                id="hora"
                name="hora"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover block w-full p-2.5"
                value={formData.hora}
                onChange={(e) => {
                  setFormData({ ...formData, hora: e.target.value });
                }}
              ></input>
              {errors.hora && <p className="text-red-600">{errors.hora}</p>}
            </div>

            <div>
              <label
                htmlFor="descricao"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Descrição <span className="text-red-500">*</span>
              </label>
              <textarea
                id="descricao"
                name="descricao"
                rows="4"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover block w-full p-2.5"
                placeholder="Descrição do problema"
                value={formData.descricao}
                onChange={(e) => {
                  setFormData({ ...formData, descricao: e.target.value });
                }}
              ></textarea>
              {errors.descricao && (
                <p className="text-red-600">{errors.descricao}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="veterinario"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Veterinário
              </label>
              <input
                type="text"
                id="veterinario"
                name="veterinario"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover block w-full p-2.5"
                placeholder="Nome do Veterinário"
                value={formData.veterinario}
                onChange={(e) => {
                  setFormData({ ...formData, veterinario: e.target.value });
                }}
              ></input>
              {errors.veterinario && (
                <p className="text-red-600">{errors.veterinario}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="diagnostico"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Diagnóstico
              </label>
              <input
                type="text"
                id="diagnostico"
                name="diagnostico"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover block w-full p-2.5"
                placeholder="Diagnóstico"
                value={formData.diagnostico}
                onChange={(e) => {
                  setFormData({ ...formData, diagnostico: e.target.value });
                }}
              ></input>

              {errors.diagnostico && (
                <p className="text-red-600">{errors.diagnostico}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="prescricao"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Prescrição
              </label>
              <textarea
                id="prescricao"
                name="prescricao"
                rows="3"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover block w-full p-2.5"
                placeholder="Prescrição do tratamento"
                value={formData.prescricao}
                onChange={(e) => {
                  setFormData({ ...formData, prescricao: e.target.value });
                }}
              ></textarea>

              {errors.prescricao && (
                <p className="text-red-600">{errors.prescricao}</p>
              )}
            </div>

            <div className="md:h-12 flex md:justify-self-center md:mt-10 mt-1">
              <SubmitButton isLoading={isLoading} isSuccess={isSuccess} />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
