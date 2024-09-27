import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import SubmitButton from "../Component/SubmitButton";
import Loading from "../Component/Loading";
import Breadcrumb from "../Component/Breadcrumb";
export default function Animals() {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    sexo: "",
    especie: "",
    raca: "",
    idade: "",
    data_nascimento: "",
    peso: "",
    castrado: "",
    cor: "",
    tamanho: "",
    chip_identificacao: "",
    comportamento: "",
    pedigree: "",
    pelagem: "",
    fotos: [],
  });

  const [errors, setErrors] = useState({});

  async function handleCreate(e) {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/animals", {
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
      setTimeout(() => {
        navigate(`/pets/profile/${data.data.id}`);
      }, 1000);
    } else {
      console.error(data.errors);
      setErrors(data.errors);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Breadcrumb path="Dashboard/Meus Pets/Criar" />

      <h2 className="text-3xl font-semibold text-white text-center bg-custom-primary">
        Cadastro de Pet
      </h2>

      <form className=" p-2 bg-white" onSubmit={handleCreate}>
        {/* Nome */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              value={formData.nome}
              onChange={(e) => {
                setFormData({ ...formData, nome: e.target.value });
              }}
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome do pet"
              className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
            />
            {errors.nome && <p className="text-red-600">{errors.nome}</p>}
          </div>
          {/* Sexo */}
          <div>
            <label
              htmlFor="sexo"
              className="block text-sm font-medium text-gray-700"
            >
              Sexo
            </label>
            <select
              value={formData.sexo}
              onChange={(e) => {
                setFormData({ ...formData, sexo: e.target.value });
              }}
              id="sexo"
              name="sexo"
              className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
            >
              <option selected value>
                Selecione um sexo
              </option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
            {errors.sexo && <p className="text-red-600">{errors.sexo}</p>}
          </div>

          {/* castração */}
          <div>
            <label
              htmlFor="castrado"
              className="block text-sm font-medium text-gray-700"
            >
              Castrado
            </label>
            <select
              value={formData.castrado}
              onChange={(e) => {
                setFormData({ ...formData, castrado: e.target.value });
              }}
              id="castrado"
              name="castrado"
              className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
            >
              <option selected value>
                Selecione uma opção
              </option>
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
            {errors.castrado && (
              <p className="text-red-600">{errors.castrado}</p>
            )}
          </div>

          {/* cor */}
          <div>
            <label
              htmlFor="cor"
              className="block text-sm font-medium text-gray-700"
            >
              Cor
            </label>
            <input
              value={formData.cor}
              onChange={(e) => {
                setFormData({ ...formData, cor: e.target.value });
              }}
              type="text"
              id="cor"
              name="cor"
              placeholder="Cor do pet"
              className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
            />

            {errors.castrado && (
              <p className="text-red-600">{errors.castrado}</p>
            )}
          </div>

          {/* tamanho */}
          <div>
            <label
              htmlFor="tamanho"
              className="block text-sm font-medium text-gray-700"
            >
              Tamanho
            </label>
            <select
              value={formData.tamanho}
              onChange={(e) => {
                setFormData({ ...formData, tamanho: e.target.value });
              }}
              id="tamanho"
              name="tamanho"
              placeholder="Tamanho do pet"
              className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
            >
              <option value selected>
                Selecione uma opção
              </option>
              <option value="p">Pequeno</option>
              <option value="m">Médio</option>
              <option value="g">Grande</option>
            </select>

            {errors.tamanho && <p className="text-red-600">{errors.tamanho}</p>}
          </div>

          {/* chip_identificacao */}
          <div>
            <label
              htmlFor="tamanho"
              className="block text-sm font-medium text-gray-700"
            >
              Chip de Identificação
            </label>

            <input
              value={formData.chip_indentificacao}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  chip_identificacao: e.target.value,
                });
              }}
              id="chip_identificacao"
              name="chip_identificacao"
              placeholder="Chip de indentificação do pet"
              className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
            />

            {errors.chip_identificacao && (
              <p className="text-red-600">{errors.chip_identificacao}</p>
            )}
          </div>

          <div className="col-span-2">
            <label
              htmlFor="pelagem"
              className="block text-sm font-medium text-gray-700"
            >
              Comportamento
            </label>
            <textarea
              value={formData.comportamento}
              onChange={(e) => {
                setFormData({ ...formData, comportamento: e.target.value });
              }}
              id="comportamento"
              name="comportamento"
              cols={20}
              rows={2}
              placeholder="Características comportamentais e personalidade (ex.: amigável, agressivo, ativo)."
              className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
            />
            {errors.comportamento && (
              <p className="text-red-600">{errors.comportamento}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="pedigree"
              className="block text-sm font-medium text-gray-700"
            >
              Pedigree
            </label>
            <input
              value={formData.pedigree}
              onChange={(e) => {
                setFormData({ ...formData, pedigree: e.target.value });
              }}
              type="text"
              id="pedigree"
              name="pedigree"
              placeholder="Registro genealógico do pet"
              className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
            />
            {errors.pedigree && (
              <p className="text-red-600">{errors.pedigree}</p>
            )}
          </div>
        </div>
        {/* Espécie e Raça */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          <div>
            <label
              htmlFor="especie"
              className="block text-sm font-medium text-gray-700"
            >
              Espécie
            </label>
            <input
              value={formData.especie}
              onChange={(e) => {
                setFormData({ ...formData, especie: e.target.value });
              }}
              type="text"
              id="especie"
              name="especie"
              placeholder="Ex: Dog, Cat"
              className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
            />
            {errors.especie && <p className="text-red-600">{errors.especie}</p>}
          </div>
          <div>
            <label
              htmlFor="raca"
              className="block text-sm font-medium text-gray-700"
            >
              Raça
            </label>
            <input
              value={formData.raca}
              onChange={(e) => {
                setFormData({ ...formData, raca: e.target.value });
              }}
              type="text"
              id="raca"
              name="raca"
              placeholder="Raça do pet"
              className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
            />
            {errors.raca && <p className="text-red-600">{errors.raca}</p>}
          </div>

          <div>
            <label
              htmlFor="pelagem"
              className="block text-sm font-medium text-gray-700"
            >
              Pelagem
            </label>
            <input
              value={formData.pelagem}
              onChange={(e) => {
                setFormData({ ...formData, pelagem: e.target.value });
              }}
              type="text"
              id="pelagem"
              name="pelagem"
              placeholder="tipo do pelo (ex.: liso, encaracolado, curto, longo)"
              className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
            />
            {errors.pelagem && <p className="text-red-600">{errors.pelagem}</p>}
          </div>
        </div>
        {/* Idade e Data de Nascimento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          <div>
            <label
              htmlFor="idade"
              className="block text-sm font-medium text-gray-700"
            >
              Idade (em anos)
            </label>
            <input
              value={formData.idade}
              onChange={(e) => {
                setFormData({ ...formData, idade: e.target.value });
              }}
              type="tel"
              min={1}
              id="idade"
              name="idade"
              placeholder="Idade do pet"
              className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
            />
            {errors.idade && <p className="text-red-600">{errors.idade}</p>}
          </div>
          <div>
            <label
              htmlFor="data_nascimento"
              className="block text-sm font-medium text-gray-700"
            >
              Data de Nascimento
            </label>
            <input
              value={formData.data_nascimento}
              onChange={(e) => {
                setFormData({ ...formData, data_nascimento: e.target.value });
              }}
              type="date"
              id="data_nascimento"
              name="data_nascimento"
              max="2024-09-17"
              className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
            />

            {errors.data_nascimento && (
              <p className="text-red-600">{errors.data_nascimento}</p>
            )}
          </div>
          {/* Peso */}
          <div className="">
            <label
              htmlFor="peso"
              className="block text-sm font-medium text-gray-700"
            >
              Peso (kg)
            </label>
            <input
              value={formData.peso}
              onChange={(e) => {
                setFormData({ ...formData, peso: e.target.value });
              }}
              type="number"
              id="peso"
              name="peso"
              placeholder="Peso do pet em kg"
              className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:!border-custom-btn_primary focus:!ring-custom-btn_primary_hover dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
            />
            {errors.peso && <p className="text-red-600">{errors.peso}</p>}
          </div>
        </div>

        {/* Botão de Envio */}
        <div className="mt-6 text-center">
          <SubmitButton isLoading={isLoading} isSuccess={isSuccess} />
        </div>
      </form>
      {isLoading ? <Loading /> : ""}
    </>
  );
}
