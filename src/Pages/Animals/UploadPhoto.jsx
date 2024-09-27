import { useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useContext } from "react";
const UploadPhoto = (id) => {
  const { token } = useContext(AppContext);
  const [images, setImages] = useState([]);

  const handleChangeImage = (event) => {
    const files = Array.from(event.target.files);
    // console.log("Arquivos selecionados:", files);
    setImages(files);
  };

  async function uploadToServer(event) {
    event.preventDefault();

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("file[]", image);
      // console.log("Arquivo adicionado ao FormData:", image);
    });

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/animals/${id.id}/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        // console.log("Upload bem-sucedido:", result);
      } else {
        const errorData = await response.json();
        console.error("Erro no upload:", response.statusText, errorData);
      }
    } catch (error) {
      console.error("Erro ao enviar os arquivos:", error);
    }
  }

  return (
    <form
      className="flex space-x-1"
      onSubmit={uploadToServer}
      encType="multipart/form-data"
    >
      <input
        onChange={handleChangeImage}
        className="hidden"
        id="file_input"
        name="file[]"
        type="file"
        multiple
      />

      <label
        htmlFor="file_input"
        className="p-2 bg-custom-btn_primary hover:bg-custom-btn_primary_hover rounded text-white cursor-pointer"
      >
        Escolher arquivos
      </label>

      <button
        type="submit"
        className="p-2 bg-custom-btn_primary hover:bg-custom-btn_primary_hover rounded text-white"
      >
        Adicionar
      </button>
    </form>
  );
};

export default UploadPhoto;
