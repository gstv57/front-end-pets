import { useContext, useEffect, useState, useCallback } from "react";
import { AppContext } from "../../Context/AppContext";
import Loading from "../Component/Loading";
import DatePicker from "../Component/DatePicker";
import SubmitButton from "../Component/SubmitButton";
import Breadcrumb from "../Component/Breadcrumb";
export default function Consulta() {
  const { token } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [animals, setAnimais] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    animal_id: "",
    data_aplicacao: "",
    vacina: "",
    dose: "",
    proxima_dose: "",
    peso_animal: "",
    lote: "",
    via_administracao: "",
    fabricante: "",
    veterinario: "",
    local_aplicacao: "",
    reacoes_adversas: "",
    observacoes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: date[0],
    }));
  };

  async function handleCriarVacina(event) {
    event.preventDefault();

    const res = await fetch("/api/vacinas", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log(data.data);
    if (res.ok) {
      setIsLoading(false);
      setIsSuccess(true);
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
        setAnimais(data.data);
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
          <Breadcrumb path="Dashboard/Vacinas/Criar" />
          <div className="bg-custom-primary text-white p-1 uppercase flex justify-center items-center space-x-2">
            <h1 className="text-center font-bold text-3xl">
              Registrar nova Vacina
            </h1>
          </div>

          <div className="grid grid-cols-1">
            <div className="min-h-screen p-1">
              <div className="max-w-full mx-auto space-y-4">
                <form
                  onSubmit={handleCriarVacina}
                  className="p-3 bg-white rounded-lg shadow-md grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 lg:space-x-1"
                >
                  <div className="mb-4">
                    <label
                      htmlFor="animal_id"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Animal
                    </label>
                    <select
                      id="animal_id"
                      name="animal_id"
                      value={formData.animal_id}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-custom-btn_primary_hover"
                    >
                      <option value="">Selecione um animal</option>
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

                  <div className="">
                    <div className="grid xl:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1">
                      <div className="sm:col-span-1">
                        <label
                          htmlFor="data_aplicacao"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Data de Aplicação
                        </label>
                        <div className="relative">
                          <DatePicker
                            id="data_aplicacao"
                            name="data_aplicacao"
                            value={formData.data_aplicacao}
                            onChange={(date) =>
                              handleDateChange(date, "data_aplicacao")
                            }
                          />
                          {errors.data_aplicacao && (
                            <p className="text-red-600">
                              {errors.data_aplicacao}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-1">
                        <label
                          htmlFor="proxima_dose"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Próxima Dose
                        </label>
                        <div className="relative">
                          <DatePicker
                            id="proxima_dose"
                            name="proxima_dose"
                            value={formData.proxima_dose}
                            onChange={(date) =>
                              handleDateChange(date, "proxima_dose")
                            }
                          />
                          {errors.proxima_dose && (
                            <p className="text-red-600">
                              {errors.proxima_dose}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="vacina"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Vacina
                    </label>
                    <input
                      type="text"
                      id="vacina"
                      name="vacina"
                      value={formData.vacina}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-custom-btn_primary_hover"
                    />
                    {errors.vacina && (
                      <p className="text-red-600">{errors.vacina}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="dose"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Dose
                    </label>
                    <input
                      type="text"
                      id="dose"
                      name="dose"
                      value={formData.dose}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-custom-btn_primary_hover"
                    />
                    {errors.dose && (
                      <p className="text-red-600">{errors.dose}</p>
                    )}
                  </div>

                  {/* Novos Campos Adicionados */}
                  <div className="mb-4">
                    <label
                      htmlFor="veterinario"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Veterinário Responsável
                    </label>
                    <input
                      id="veterinario"
                      name="veterinario"
                      placeholder="Digite o nome do vet"
                      type="text"
                      value={formData.veterinario}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-custom-btn_primary_hover"
                    ></input>
                    {errors.veterinario && (
                      <p className="text-red-600">{errors.veterinario}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="fabricante"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Fabricante da Vacina
                    </label>
                    <input
                      type="text"
                      id="fabricante"
                      name="fabricante"
                      value={formData.fabricante}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-custom-btn_primary_hover"
                    />
                    {errors.fabricante && (
                      <p className="text-red-600">{errors.fabricante}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="lote"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Número do Lote
                    </label>
                    <input
                      type="text"
                      id="lote"
                      name="lote"
                      value={formData.lote}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-custom-btn_primary_hover"
                    />
                    {errors.lote && (
                      <p className="text-red-600">{errors.lote}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="via_administracao"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Via de Administração
                    </label>
                    <input
                      type="text"
                      id="via_administracao"
                      name="via_administracao"
                      value={formData.via_administracao}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-custom-btn_primary_hover"
                    />
                    {errors.via_administracao && (
                      <p className="text-red-600">{errors.via_administracao}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="local_aplicacao"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Local de Aplicação
                    </label>
                    <input
                      type="text"
                      id="local_aplicacao"
                      name="local_aplicacao"
                      value={formData.local_aplicacao}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-custom-btn_primary_hover"
                    />
                    {errors.local_aplicacao && (
                      <p className="text-red-600">{errors.local_aplicacao}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="peso_animal"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Peso do Animal
                    </label>
                    <input
                      type="text"
                      id="peso_animal"
                      name="peso_animal"
                      value={formData.peso_animal}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-custom-btn_primary_hover"
                    />
                    {errors.peso_animal && (
                      <p className="text-red-600">{errors.peso_animal}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="reacoes_adversas"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Reações Adversas
                    </label>
                    <textarea
                      id="reacoes_adversas"
                      name="reacoes_adversas"
                      value={formData.reacoes_adversas}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-custom-btn_primary_hover"
                    ></textarea>
                    {errors.reacoes_adversas && (
                      <p className="text-red-600">{errors.reacoes_adversas}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="observacoes"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Observações
                    </label>
                    <textarea
                      id="observacoes"
                      name="observacoes"
                      value={formData.observacoes}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-custom-btn_primary_hover"
                    ></textarea>
                    {errors.observacoes && (
                      <p className="text-red-600">{errors.observacoes}</p>
                    )}
                  </div>

                  {/* Botão de Envio */}
                  <div className="text-center">
                    <SubmitButton isLoading={isLoading} isSuccess={isSuccess} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
