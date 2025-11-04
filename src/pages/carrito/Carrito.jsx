import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import carritoVacioImg from "../../assets/img/carrito-vacio.png";

function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, confirmarPedido, total } = useCart();

  if (carrito.length === 0) {
    return (
      <section className="carrito-vacio">
        <img src={carritoVacioImg} alt="Carrito vacío" />
        <h3>Tu carrito está vacío</h3>
        <p>¡Todavía no agregaste productos! Explorá nuestro catálogo y encontrá lo que buscás.</p>
        <Link to="/" className="btn-confirmar">Ir al inicio</Link>
      </section>
    );
  }

  return (
    <section className="table-responsive">
      <h2>
        <i className="fas fa-shopping-cart"></i>
        Carrito de Compras
      </h2>
      <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Categoría</th>
            <th>Precio unitario</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Envío</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td><img src={item.foto} alt={item.nombre} /></td>
              <td>{item.nombre}</td>
              <td>{item.marca || "-"}</td>
              <td>{item.categoria || "-"}</td>
              <td>${item.precio}</td>
              <td>{item.cantidad}</td>
              <td>${item.precio * item.cantidad}</td>
              <td>{item.envioSinCargo ? "Gratis" : "—"}</td>
              <td>
                <button className="btn-eliminar" onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="carrito-actions">
        <p><strong>Total: ${total}</strong></p>
        <button className="btn-vaciar" onClick={vaciarCarrito}>Vaciar carrito</button>
        <button className="btn-confirmar" onClick={confirmarPedido}>Confirmar pedido</button>
      </div>
    </section>
  );
}

export default Carrito;