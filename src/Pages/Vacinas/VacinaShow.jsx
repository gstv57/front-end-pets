import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Loading from "../Component/Loading";
import Breadcrumb from "../Component/Breadcrumb";
export default function Consulta() {
  const { id } = useParams();
  const { token } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    nome: "",
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

  useEffect(() => {
    const fetchConsulta = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/vacinas/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setFormData(data.data);
          console.log(data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erro durante a busca do animal:", error);
        setIsLoading(false);
      }
    };

    fetchConsulta();
  }, [token, id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="min-h-screen">
          <Breadcrumb path="Dashboard/Vacinas/Visualizar" />
          <div className="bg-custom-primary text-white p-1 uppercase flex justify-center items-center space-x-2">
            <h1 className="text-center font-bold text-3xl">
              Vacina: {formData.vacina}
            </h1>
          </div>

          <div className="grid grid-cols-1">
            <div className="min-h-screen p-1">
              <div className="max-w-full space-y-4">
                <form
                  method="POST"
                  className="p-6 bg-white shadow-md rounded  sm:grid xl:grid grid-cols-2 space-x-2"
                >
                  <div className="mb-4">
                    <label
                      htmlFor="nome"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nome do pet
                    </label>
                    <input
                      type="text"
                      name="nome"
                      id="nome"
                      value={formData.nome}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="data_aplicacao"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Data da Aplicação
                    </label>
                    <input
                      type="text"
                      name="data_aplicacao"
                      id="data_aplicacao"
                      value={formData.data_aplicacao}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="vacina"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Vacina
                    </label>
                    <input
                      type="text"
                      name="vacina"
                      id="vacina"
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          vacina: e.target.value,
                        });
                      }}
                      value={formData.vacina ?? "NÃO PREENCHIDO"}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="dose"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Dose
                    </label>
                    <input
                      type="text"
                      name="dose"
                      id="dose"
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dose: e.target.value,
                        });
                      }}
                      value={formData.dose ?? "NÃO PREENCHIDO"}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="proxima_dose"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Próxima Dose
                    </label>
                    <input
                      type="text"
                      name="proxima_dose"
                      id="proxima_dose"
                      value={formData.proxima_dose}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="peso_animal"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Peso do Animal
                    </label>
                    <input
                      type="text"
                      name="peso_animal"
                      id="peso_animal"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          peso_animal: e.target.value,
                        });
                      }}
                      value={formData.peso_animal ?? "NÃO PREENCHIDO"}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="lote"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Lote
                    </label>
                    <input
                      type="text"
                      name="lote"
                      id="lote"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          lote: e.target.value,
                        });
                      }}
                      value={formData.lote ?? "NÃO PREENCHIDO"}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="via_administracao"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Via de Administração
                    </label>
                    <input
                      type="text"
                      name="via_administracao"
                      id="via_administracao"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          via_administracao: e.target.value,
                        });
                      }}
                      value={formData.via_administracao ?? "NÃO PREENCHIDO"}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="fabricante"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Fabricante
                    </label>
                    <input
                      type="text"
                      name="fabricante"
                      id="fabricante"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          fabricante: e.target.value,
                        });
                      }}
                      value={formData.fabricante ?? "NÃO PREENCHIDO"}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="veterinario"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Veterinário
                    </label>
                    <input
                      type="text"
                      name="veterinario"
                      id="veterinario"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          veterinario: e.target.value,
                        });
                      }}
                      value={formData.veterinario ?? "NÃO PREENCHIDO"}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="local_aplicacao"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Local da Aplicação
                    </label>
                    <input
                      type="text"
                      name="local_aplicacao"
                      id="local_aplicacao"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          local_aplicacao: e.target.value,
                        });
                      }}
                      value={formData.local_aplicacao ?? "NÃO PREENCHIDO"}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="reacoes_adversas"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Reações Adversas
                    </label>
                    <input
                      type="text"
                      name="reacoes_adversas"
                      id="reacoes_adversas"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          reacoes_adversas: e.target.value,
                        });
                      }}
                      value={formData.reacoes_adversas ?? "NÃO PREENCHIDO"}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="observacoes"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Observações
                    </label>
                    <textarea
                      name="observacoes"
                      id="observacoes"
                      rows="4"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          observacoes: e.target.value,
                        });
                      }}
                      value={formData.observacoes ?? "NÃO PREENCHIDO"}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <Link
                      to={"/vacinas"}
                      className="mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 bg-custom-primary hover:bg-custom-btn_primary_hover text-white p-3 text-center"
                    >
                      Voltar
                    </Link>
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
