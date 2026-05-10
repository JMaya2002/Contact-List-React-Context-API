import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

// Componente que muestra un único contacto
export const ContactCard = ({ contact }) => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  // Estado local para abrir/cerrar el modal de confirmación
  const [showModal, setShowModal] = useState(false);

  // Llamada DELETE a la API y actualización del store
  const handleDelete = () => {
    fetch("https://playground.4geeks.com/contact/agendas/" + store.slug + "/contacts/" + contact.id, {
      method: "DELETE"
    })
      .then(() => {
        dispatch({ type: "delete_contact", payload: contact.id });
        setShowModal(false);
      })
      .catch(err => console.log("Error al eliminar:", err));
  };

  return (
    <>
      <div className="d-flex align-items-center border-bottom p-3">
        {/* Foto del contacto (avatar genérico según el id) */}
        <img
          src={"https://i.pravatar.cc/150?u=" + contact.id}
          alt={contact.name}
          className="rounded-circle me-4"
          style={{ width: 110, height: 110, objectFit: "cover" }}
        />

        {/* Datos del contacto */}
        <div className="flex-grow-1">
          <h4 className="mb-2 text-secondary">{contact.name}</h4>
          <p className="mb-1 text-muted">
            <i className="fas fa-map-marker-alt me-2" />
            {contact.address}
          </p>
          <p className="mb-1 text-muted">
            <i className="fas fa-phone me-2" />
            {contact.phone}
          </p>
          <p className="mb-0 text-muted">
            <i className="fas fa-envelope me-2" />
            {contact.email}
          </p>
        </div>

        {/* Botones de editar y eliminar */}
        <div className="d-flex gap-3 align-items-start">
          <button
            className="btn btn-link text-secondary p-0"
            onClick={() => navigate("/edit-contact/" + contact.id)}
          >
            <i className="fas fa-pencil-alt" />
          </button>
          <button
            className="btn btn-link text-secondary p-0"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-trash" />
          </button>
        </div>
      </div>

      {/* Modal de confirmación antes de eliminar */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">¿Estás seguro?</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body">
                <p>
                  ¿Seguro que quieres eliminar a <strong>{contact.name}</strong>?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  ¡No, espera!
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  ¡Sí, eliminar!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
