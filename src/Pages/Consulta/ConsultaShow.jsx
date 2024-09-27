import { useContext, useState, useCallback, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import Loading from "../Component/Loading";
import { useNavigate, useParams } from "react-router-dom";
import SubmitButton from "../Component/SubmitButton";
import Breadcrumb from "../Component/Breadcrumb";
export default function Consulta() {
  const { token } = useContext(AppContext);
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    data: "",
    hora: "",
    descricao: "",
    veterinario: "",
    diagnostico: "",
    prescricao: "",
  });

  useEffect(() => {
    const fetchConsulta = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/consultas/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setFormData(data);
          setIsLoading(false);
        }
        if (res.status === 404) {
          navigate("/consultas");
        }
      } catch (error) {
        console.error("Erro durante a busca do animal:", error);
        setIsLoading(false);
      }
    };

    fetchConsulta();
  }, [token, id]);

  async function handleUpdate(e) {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch(`/api/consultas/${id}`, {
      method: "put",
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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <Breadcrumb path="Dashboard/Meus Pets/Criar" />
          <h1 className="text-3xl font-bold text-white mb-8 text-center bg-custom-primary p-1">
            Relatório de Consulta Veterinária
          </h1>
          <div className="p-8">
            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Dados do Pet */}
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">
                  Dados do Pet
                </h2>
                <div>
                  <label
                    htmlFor="data"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Nome do Pet
                  </label>
                  <input
                    type="text"
                    id="data"
                    name="data"
                    onChange={(e) => {
                      setFormData({ ...formData, nome: e.target.value });
                    }}
                    value={formData.nome}
                    readOnly
                    className="bg-gray-50 border border-custom-btn_primary_hover text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                  />
                  {errors.nome && <p className="text-red-600">{errors.nome}</p>}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="data"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Data da Consulta
                    </label>
                    <input
                      type="text"
                      id="data"
                      name="data"
                      className="bg-gray-50 border border-custom-primary text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                      onChange={(e) => {
                        setFormData({ ...formData, data: e.target.value });
                      }}
                      value={formData.data}
                    />
                    {errors.data && (
                      <p className="text-red-600">{errors.data}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="hora"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Hora
                    </label>
                    <input
                      type="text"
                      id="hora"
                      name="hora"
                      onChange={(e) => {
                        setFormData({ ...formData, hora: e.target.value });
                      }}
                      value={formData.hora}
                      className="bg-gray-50 border border-custom-primary text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                    />
                    {errors.hora && (
                      <p className="text-red-600">{errors.hora}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Descrição e Veterinário */}
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">
                  Descrição da Consulta
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label
                      htmlFor="descricao"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Descrição
                    </label>
                    <textarea
                      id="descricao"
                      name="descricao"
                      rows="4"
                      className="bg-gray-50 border border-custom-primary text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                      onChange={(e) => {
                        setFormData({ ...formData, descricao: e.target.value });
                      }}
                      value={formData.descricao}
                    >
                      Animal apresentando sintomas de febre e falta de apetite.
                    </textarea>
                    {errors.descricao && (
                      <p className="text-red-600">{errors.descricao}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="veterinario"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Veterinário Responsável
                    </label>
                    <input
                      type="text"
                      id="veterinario"
                      name="veterinario"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          veterinario: e.target.value,
                        });
                      }}
                      value={formData.veterinario}
                      className="bg-gray-50 border border-custom-primary text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                    />
                    {errors.veterinario && (
                      <p className="text-red-600">{errors.veterinario}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Diagnóstico */}
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">
                  Diagnóstico
                </h2>
                <div>
                  <label
                    htmlFor="diagnostico"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Diagnóstico
                  </label>
                  <input
                    type="text"
                    id="diagnostico"
                    name="diagnostico"
                    onChange={(e) => {
                      setFormData({ ...formData, diagnostico: e.target.value });
                    }}
                    value={formData.diagnostico}
                    className="bg-gray-50 border border-custom-primary text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                  />
                  {errors.diagnostico && (
                    <p className="text-red-600">{errors.diagnostico}</p>
                  )}
                </div>
              </div>

              {/* Prescrição */}
              <div className="pb-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">
                  Prescrição
                </h2>
                <div>
                  <label
                    htmlFor="prescricao"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Prescrição
                  </label>
                  <textarea
                    id="prescricao"
                    name="prescricao"
                    rows="3"
                    className="bg-gray-50 border border-custom-primary text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                    onChange={(e) => {
                      setFormData({ ...formData, prescricao: e.target.value });
                    }}
                    value={formData.prescricao}
                  >
                    Antibiótico por 7 dias e repouso.
                  </textarea>
                  {errors.prescricao && (
                    <p className="text-red-600">{errors.prescricao}</p>
                  )}
                </div>
              </div>

              {/* Botão de Confirmação */}
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-custom-btn_primary text-white py-2 px-4 rounded-lg hover:bg-custom-btn_primary_hover focus:ring-4 focus:ring-blue-300 font-medium"
                >
                  Confirmar Consulta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
