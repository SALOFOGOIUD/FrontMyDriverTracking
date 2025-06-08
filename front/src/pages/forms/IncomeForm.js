import { useState } from 'react';
import '../../styles/FormStyles.css';

const IncomeForm = ({ onSubmit, initialData = {}, onCancel, vehicleId }) => {
  const [dateStart, setDateStart] = useState(initialData.dateStart || '');
  const [dateEnd, setDateEnd] = useState(initialData.dateEnd || '');
  const [ingresoTotal, setIngresoTotal] = useState(initialData.ingresoTotal || '');
  const [klm, setKlm] = useState(initialData.klm || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!vehicleId) {
      alert('ID Vehículo no está definido');
      return;
    }

    if (!dateStart) {
      alert('Fecha Inicio es obligatoria');
      return;
    }
    if (!dateEnd) {
      alert('Fecha Fin es obligatoria');
      return;
    }
    if (!ingresoTotal || isNaN(Number(ingresoTotal)) || Number(ingresoTotal) < 0) {
      alert('Ingreso Total debe ser un número positivo');
      return;
    }
    if (klm !== '' && (isNaN(Number(klm)) || Number(klm) < 0)) {
      alert('Kilómetros debe ser un número positivo o vacío');
      return;
    }

    onSubmit({
      idCar: vehicleId,
      dateStart,
      dateEnd,
      ingresoTotal: Number(ingresoTotal),
      klm: klm === '' ? 0 : Number(klm),
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label>
             <input type="hidden" value={vehicleId} />
      </label>
      <label>
        Fecha Inicio:
        <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)} required />
      </label>
      <label>
        Fecha Fin:
        <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} required />
      </label>
      <label>
        Ingreso Total:
        <input
          type="number"
          step="0.01"
          value={ingresoTotal}
          onChange={e => setIngresoTotal(e.target.value)}
          required
          min="0"
        />
      </label>
      <label>
        Kilómetros:
        <input
          type="number"
          value={klm}
          onChange={e => setKlm(e.target.value)}
          min="0"
          placeholder="Opcional"
        />
      </label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit">Guardar</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
};

export default IncomeForm;