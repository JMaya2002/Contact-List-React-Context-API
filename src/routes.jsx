import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Contact } from "./pages/Contact";
import { AddContact } from "./pages/AddContact";

// Rutas de la aplicación
export const router = createBrowserRouter(
  createRoutesFromElements(
    // El Layout contiene Navbar y Footer comunes a todas las páginas
    <Route path="/" element={<Layout />} errorElement={<h1>¡Página no encontrada!</h1>}>
      {/* Lista de contactos */}
      <Route path="/" element={<Contact />} />
      {/* Formulario para crear un contacto nuevo */}
      <Route path="/add-contact" element={<AddContact />} />
      {/* Mismo formulario, pero con un id se usa para editar */}
      <Route path="/edit-contact/:id" element={<AddContact />} />
    </Route>
  )
);
