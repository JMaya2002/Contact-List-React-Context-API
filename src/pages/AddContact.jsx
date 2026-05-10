import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

// Vista del formulario para añadir o editar un contacto
export const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  // Si la URL trae un id, estamos editando; si no, estamos creando
  const isEdit = Boolean(id);

  // Estado local del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Si estamos editando, rellenamos el formulario con los datos del contacto
  useEffect(() => {
    if (isEdit) {
      const contact = store.contacts.find(c => String(c.id) === String(id));
      if (contact) {
        setName(contact.name || "");
        setEmail(contact.email || "");
        setPhone(contact.phone || "");
        setAddress(contact.address || "");
      }
    }
  }, [id, store.contacts]);

  // Cuando se envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const contactData = { name, email, phone, address };

    if (isEdit) {
      // Actualizamos un contacto existente (PUT)
      fetch("https://playground.4geeks.com/contact/agendas/" + store.slug + "/contacts/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData)
      })
        .then(resp => resp.json())
        .then(data => {
          dispatch({ type: "update_contact", payload: data });
          navigate("/");
        })
        .catch(err => console.log("Error al actualizar:", err));
    } else {
      // Creamos un contacto nuevo (POST)
      fetch("https://playground.4geeks.com/contact/agendas/" + store.slug + "/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData)
      })
        .then(resp => resp.json())
        .then(data => {
          dispatch({ type: "add_contact", payload: data });
          navigate("/");
        })
        .catch(err => console.log("Error al crear:", err));
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">
        {isEdit ? "Editar contacto" : "Añadir un nuevo contacto"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Introduce el email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            placeholder="Introduce el teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            placeholder="Introduce la dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          guardar
        </button>

        <Link to="/" className="d-block mt-2">
          o vuelve a la lista de contactos
        </Link>
      </form>
    </div>
  );
};
