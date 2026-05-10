import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

// Vista principal: muestra la lista de contactos
export const Contact = () => {
  const { store, dispatch } = useGlobalReducer();

  // Al montar la vista, cargamos los contactos desde la API
  useEffect(() => {
    // Primero comprobamos si la agenda existe, si no la creamos
    fetch("https://playground.4geeks.com/contact/agendas/" + store.slug)
      .then(resp => {
        if (resp.status === 404) {
          // La agenda no existe, la creamos
          return fetch("https://playground.4geeks.com/contact/agendas/" + store.slug, {
            method: "POST"
          });
        }
        return resp;
      })
      .then(() => {
        // Pedimos los contactos de la agenda
        return fetch("https://playground.4geeks.com/contact/agendas/" + store.slug + "/contacts");
      })
      .then(resp => resp.json())
      .then(data => {
        // Guardamos los contactos en el store global
        dispatch({ type: "set_contacts", payload: data.contacts || [] });
      })
      .catch(err => console.log("Error al cargar los contactos:", err));
  }, []);

  return (
    <div className="container py-4">
      {/* Botón para ir a la vista de añadir contacto */}
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add-contact">
          <button className="btn btn-success">Añadir nuevo contacto</button>
        </Link>
      </div>

      {/* Lista de contactos */}
      <div className="border rounded">
        {store.contacts.length === 0 ? (
          <p className="text-center text-muted py-4 mb-0">
            No hay contactos todavía. ¡Añade el primero!
          </p>
        ) : (
          store.contacts.map(contact => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        )}
      </div>
    </div>
  );
};
