import { useState } from "react";
import FormAlta from "../../components/formAlta/FormAlta";

function RutaProtegida() {
  const [pinIngresado, setPinIngresado] = useState("");
  const [accesoPermitido, setAccesoPermitido] = useState(false);

  const PIN_CORRECTO = import.meta.env.VITE_PIN_ALTA;

  const verificarPin = (e) => {
    e.preventDefault();
    if (pinIngresado === PIN_CORRECTO) {
      setAccesoPermitido(true);
    } else {
      alert("PIN incorrecto, pone el pin correcto");
    }
  };

  if (accesoPermitido) {
    return <FormAlta />;
  }

  return (
    <section className="pin-wrapper">
      <h2><i className="fas fa-lock"></i> Acceso restringido</h2>
      <form onSubmit={verificarPin}>
        <label>Ingresá el PIN para acceder a Alta de Productos:</label>
        <input
          type="password"
          value={pinIngresado}
          onChange={(e) => setPinIngresado(e.target.value)}
          placeholder="••••"
        />
        <button type="submit">Ingresar</button>
      </form>
    </section>
  );
}

export default RutaProtegida;