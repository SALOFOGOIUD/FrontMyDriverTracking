import { useState } from 'react';
import '../../styles/FormStyles.css';

const FixedCostForm = ({ onSubmit, initialData = {}, onCancel, vehicleId }) => {
  const [concepto, setConcepto] = useState(initialData.concepto || '');
  const [klm, setKlm] = useState(
    initialData.klm !== undefined && initialData.klm !== null ? String(initialData.klm) : ''
  );
  const [valor, setValor] = useState(
    initialData.valor !== undefined && initialData.valor !== null ? String(initialData.valor) : ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!vehicleId) {
      alert('ID Vehículo no está definido');
      return;
    }

    if (!concepto.trim()) {
      alert('El campo Concepto es obligatorio');
      return;
    }

    const klmNum = klm === '' ? 0 : Number(klm);
    if (klm !== '' && (isNaN(klmNum) || klmNum < 0)) {
      alert('Kilómetros debe ser un número positivo');
      return;
    }

    const valorNum = Number(valor);
    if (valor === '' || isNaN(valorNum) || valorNum < 0) {
      alert('Valor debe ser un número positivo');
      return;
    }

    onSubmit({
      idCar: vehicleId,
      concepto: concepto.trim(),
      klm: klmNum,
      valor: valorNum,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label>
        <input type="hidden" value={vehicleId} />
      </label>
      <label>
        Concepto:
        <input
          value={concepto}
          onChange={e => setConcepto(e.target.value)}
          required
          placeholder="Concepto del costo fijo"
        />
      </label>
      <label>
        Kilómetros:
        <input
          type="number"
          value={klm}
          onChange={e => setKlm(e.target.value)}
          min="0"
          step="0.01"
          placeholder="Kilómetros asociados"
        />
      </label>
      <label>
        Valor:
        <input
          type="number"
          value={valor}
          onChange={e => setValor(e.target.value)}
          min="0"
          step="0.01"
          placeholder="Monto del costo fijo"
          required
        />
      </label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit">Guardar</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
};

export default FixedCostForm;
