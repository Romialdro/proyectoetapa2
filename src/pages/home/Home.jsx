import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { BACKEND_URL } from "../../api/ApiConfig";
import { useCart } from "../../context/CartContext";
import sinstock from "../../assets/img/sinstock.jpg";

import {
  FaShoePrints,
  FaFootballBall,
  FaTshirt,
  FaFemale,
  FaRunning,
  FaSnowflake,
} from "react-icons/fa";

function Home() {
  const [productos, setProductos] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const { agregarAlCarrito } = useCart();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/productos`);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const data = await res.json();

        if (Array.isArray(data)) {
          const productosFormateados = data.map((prod) => ({
            ...prod,
            id: prod._id,
          }));
          setProductos(productosFormateados);
        } else {
          setProductos([]);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setProductos([]);
      }
    };

    fetchProductos();
  }, []);

  const productosFiltrados = categoriaFiltro
    ? productos.filter((p) => p.categoria === categoriaFiltro)
    : productos;

  return (
    <section className="home">
      <h2>
        <i className="fas fa-box-open"></i> Listado de Productos
      </h2>

      <div className="categorias-icons">
        <button onClick={() => setCategoriaFiltro("calzado")}><FaShoePrints /> Calzado</button>
        <button onClick={() => setCategoriaFiltro("elementos deportivos")}><FaFootballBall /> Elementos deportivos</button>
        <button onClick={() => setCategoriaFiltro("remeras y buzos")}><FaTshirt /> Remeras y buzos</button>
        <button onClick={() => setCategoriaFiltro("tops")}><FaFemale /> Tops</button>
        <button onClick={() => setCategoriaFiltro("pantalones y calzas")}><FaRunning /> Pantalones y calzas</button>
        <button onClick={() => setCategoriaFiltro("camperas")}><FaSnowflake /> Camperas</button>
        <button onClick={() => setCategoriaFiltro("")}>Todas</button>
      </div>

      <div className="card-grid">
        {productosFiltrados.length === 0 ? (
          <div className="empty-category-wrapper">
            <div className="empty-category">
              <img src={sinstock} alt="Sin productos" className="empty-img" />
              <p className="empty-text">No hay productos en esta categoría.</p>
            </div>
          </div>
        ) : (
          productosFiltrados.map((p) => (
            <div key={p.id} className="card-wrapper">
              <ProductCard producto={p} onAddToCart={agregarAlCarrito} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Home;
