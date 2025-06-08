import React from 'react';
import '../../styles/Modal.css';

function Modal({ isOpen, onClose, title, data, onEdit, onDelete }) {
  if (!isOpen) return null;
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>{title}</h2>
          <p>No hay datos para mostrar.</p>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  }

  const columns = Object.keys(data[0]).filter(k => k !== '_id' && k !== '__v' && k !== 'idCar' && k !== 'idUser');

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <table>
          <thead>
            <tr>
              {columns.map(col => <th key={col}>{col}</th>)}
              {(onEdit || onDelete) && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {columns.map(col => (
                  <td key={col}>{row[col]}</td>
                ))}
                {(onEdit || onDelete) && (
                  <td>
                    {onEdit && (
                      <button onClick={() => onEdit(row)}>Editar</button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(row._id)}>Eliminar</button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default Modal;