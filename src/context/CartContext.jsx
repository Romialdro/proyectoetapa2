import { createContext, useState, useContext, useEffect } from "react";
import { BACKEND_URL } from "../api/ApiConfig"; // <--- AGREGAMOS ESTO

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Limpieza automática a los 10 minutos
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

  // --------------------------------------------------------------
  // Confirmar pedido, cambios backend, ENVÍA AL BACKEND EXPRESS
  // --------------------------------------------------------------
  const confirmarPedido = async () => {
    if (carrito.length === 0) return alert("El carrito está vacío.");

    const pedido = {
      productos: carrito,
      total,
      fecha: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/carrito`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({
          error: "Error al parsear respuesta",
        }));
        console.error("Error al enviar pedido:", err);
        return alert("No se pudo confirmar el pedido. Intentá nuevamente.");
      }

      const data = await res.json();
      console.log("Respuesta backend:", data);

      alert("Pedido confirmado con éxito.");

      // Guardar historial local
      const historial = JSON.parse(localStorage.getItem("pedidos") || "[]");
      historial.push({ ...pedido, serverId: data.id || null });
      localStorage.setItem("pedidos", JSON.stringify(historial));

      // Vaciado del carrito
      setCarrito([]);
    } catch (error) {
      console.error("Error de red al enviar pedido:", error);
      alert("Hubo un error de conexión. Intentá nuevamente.");
    }
  };
  // --------------------------------------------------------------

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
