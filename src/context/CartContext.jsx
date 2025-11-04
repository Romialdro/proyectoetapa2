import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Limpieza automática
  useEffect(() => {
    if (carrito.length === 0) return;

    const timeout = setTimeout(() => {
      alert("Ups, Tu carrito expiró.");
      setCarrito([]);
    }, 1000 * 60 * 10);

    return () => clearTimeout(timeout);
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const confirmarPedido = () => {
    if (carrito.length === 0) return alert("El carrito está vacío.");

    const pedido = {
      productos: carrito,
      total,
      fecha: new Date().toISOString(),
    };

    console.log("Simulando envío de pedido:", pedido);
    alert("Pedido confirmado con éxito.");

    
    const historial = JSON.parse(localStorage.getItem("pedidos") || "[]");
    historial.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(historial));

    setCarrito([]);
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        confirmarPedido,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);