import { Routes, Route } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Home from "../pages/home/Home";
import Contacto from "../pages/contacto/Contacto";
import Nosotros from "../pages/nosotros/Nosotros";
import Carrito from "../pages/carrito/Carrito";
import RutaProtegida from "../pages/rutaProtegida/RutaProtegida"; 

function AppRouter() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alta" element={<RutaProtegida />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default AppRouter;
