import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { API_URL } from "../../api/ApiConfig";
import { useCart } from "../../context/CartContext";

function Home() {
  const [productos, setProductos] = useState([]);
  const { agregarAlCarrito } = useCart();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(`${API_URL}/productos`);
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          console.error("Ups!! La respuesta no es una lista de resultados", data);
          setProductos([]);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setProductos([]);
      }
    };
    fetchProductos();
  }, []);

  return (
    <section className="home">
      <h2><i className="fas fa-box-open"></i> Listado de Productos</h2>

      <div className="card-grid">
        {productos.map((p) => (
          <div key={p.id} className="card-wrapper">
            <ProductCard producto={p} onAddToCart={agregarAlCarrito} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;