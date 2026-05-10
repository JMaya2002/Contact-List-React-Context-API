// Estado inicial del store global
export const initialStore = () => {
  return {
    contacts: [],
    slug: "joelmaya-contacts"
  };
};

// Reducer que gestiona los cambios del store
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    // Cargar todos los contactos desde la API
    case "set_contacts":
      return { ...store, contacts: action.payload };

    // Añadir un contacto nuevo
    case "add_contact":
      return { ...store, contacts: [...store.contacts, action.payload] };

    // Actualizar un contacto existente
    case "update_contact":
      return {
        ...store,
        contacts: store.contacts.map(c =>
          c.id === action.payload.id ? action.payload : c
        )
      };

    // Borrar un contacto por su id
    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter(c => c.id !== action.payload)
      };

    default:
      throw Error("Acción desconocida.");
  }
}
