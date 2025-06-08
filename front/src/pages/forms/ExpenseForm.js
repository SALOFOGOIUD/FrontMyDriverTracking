import { useState } from 'react';
import '../../styles/FormStyles.css';

const ExpenseForm = ({ onSubmit, onCancel, vehicleId, initialData = {} }) => {
  const [dateStart, setDateStart] = useState(initialData.dateStart || '');
  const [dateEnd, setDateEnd] = useState(initialData.dateEnd || '');
  const [concepto, setConcepto] = useState(initialData.concepto || '');
  const [gastoTotal, setGastoTotal] = useState(initialData.gastoTotal || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!vehicleId) {
      alert('ID Vehículo no está definido');
      return;
    }

    if (!dateStart || !dateEnd || !concepto || gastoTotal === '') {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Convertir gastoTotal a número float
    const gastoNum = parseFloat(gastoTotal);
    if (isNaN(gastoNum)) {
      alert('Gasto Total debe ser un número válido');
      return;
    }

    onSubmit({
      idCar: vehicleId,
      dateStart,
      dateEnd,
      concepto,
      gastoTotal: gastoNum,
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
        Concepto:
        <input value={concepto} onChange={e => setConcepto(e.target.value)} required />
      </label>
      <label>
        Gasto Total:
        <input type="number" step="0.01" value={gastoTotal} onChange={e => setGastoTotal(e.target.value)} required />
      </label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit">Guardar</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
};

export default ExpenseForm;
