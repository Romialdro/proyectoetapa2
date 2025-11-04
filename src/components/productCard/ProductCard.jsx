function ProductCard({ producto, onAddToCart }) {
  const handleAddToCart = async () => {
    try {
      await onAddToCart(producto);
      alert("Producto agregado al carrito con éxito.");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("Hubo un error al agregar el producto al carrito.");
    }
  };

  return (
    <div className="card-custom">
      <div className="card-img-wrapper">
        <img
          src={producto.foto}
          alt={`Foto de ${producto.nombre}`}
          className="card-img-custom"
        />
      </div>

      <h3>
        <i className="fas fa-shopping-cart" style={{ marginRight: "8px", color: "#00c3ff" }}></i>
        {producto.nombre}
      </h3>

      <p className="detalle">Precio: ${producto.precio}</p>
      <p className="detalle">Stock disponible: {producto.stock}</p>
      <p className="detalle">Marca: {producto.marca}</p>
      <p className="detalle">Categoría: {producto.categoria}</p>
      <p className="desc-corta">Descripción: {producto.descripcionCorta}</p>
      <p className="desc-larga">{producto.descripcionLarga}</p>
      <p className="detalle">Envío: {producto.envioSinCargo ? "Sin cargo" : "No incluido"}</p>

      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </div>
  );
}

export default ProductCard;