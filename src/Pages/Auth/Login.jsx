import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Loading from "../Component/Loading";

export default function Login() {
  const { setToken } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
      setIsLoading(false);
      setFormData({ ...formData, password: "" });
    } else {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/dashboard");
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? <Loading /> : ""}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-sm">
          <form
            className="bg-white dark:bg-slate-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
            onSubmit={handleLogin}
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Seu email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
              {errors.email && <p className="text-red-600">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                placeholder="Sua senha"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Acessar conta
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
