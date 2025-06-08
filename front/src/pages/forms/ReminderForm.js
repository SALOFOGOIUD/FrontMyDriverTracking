import { useState } from 'react';
import '../../styles/FormStyles.css';

const ReminderForm = ({ onSubmit, onCancel, vehicleId, initialData = {} }) => {
  const [dateStart, setDateStart] = useState(initialData.dateStart ? initialData.dateStart.substring(0, 10) : '');
  const [dateEnd, setDateEnd] = useState(initialData.dateEnd ? initialData.dateEnd.substring(0, 10) : '');
  const [item, setItem] = useState(initialData.item || '');
  const [detalle, setDetalle] = useState(initialData.detalle || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      idCar: vehicleId,
      dateStart,
      dateEnd,
      item,
      detalle,
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
        Ítem:
        <input type="text" value={item} onChange={e => setItem(e.target.value)} required />
      </label>
      <label>
        Detalle:
        <input type="text" value={detalle} onChange={e => setDetalle(e.target.value)} />
      </label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit">Guardar</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
};

export default ReminderForm;
