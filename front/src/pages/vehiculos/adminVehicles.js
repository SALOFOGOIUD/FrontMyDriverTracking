import React, { useState } from 'react';
import ExpenseForm from '../forms/ExpenseForm';
import IncomeForm from '../forms/IncomeForm';
import FixedCostForm from '../forms/FixedCostForm';
import ReminderForm from '../forms/ReminderForm';
import { BsCashCoin, BsCreditCard2Front, BsCalendar2Check, BsGearWideConnected } from "react-icons/bs";
import {
  createIncome,
  createExpense,
  createFixedCost,
  createReminder
} from '../../services/ServicesGeneral';
import '../../styles/AdminVehicles.css';

const AdminVehicles = ({ iddelvehiculo, onDataChange }) => {
  const [modal, setModal] = useState(null);

  const closeModal = () => setModal(null);

  const labels = {
    income: 'Ingresos',
    expense: 'Gastos',
    fixed: 'Costos Fijos',
    reminder: 'Recordatorios',
  };

  const handleFormSubmit = async (data) => {
    try {
      const dataWithVehicle = { ...data, idCar: iddelvehiculo };

      switch (modal) {
        case 'income':
          await createIncome(dataWithVehicle);
          break;
        case 'expense':
          await createExpense(dataWithVehicle);
          break;
        case 'fixed':
          await createFixedCost(dataWithVehicle);
          break;
        case 'reminder':
          await createReminder(dataWithVehicle);
          break;
        default:
          throw new Error('Formulario desconocido');
      }

      closeModal();
      if (onDataChange) {
        onDataChange();
      }
    } catch (error) {
      alert('Error al guardar: ' + (error.response?.data?.message || error.message));
    }
  };

  const renderForm = () => {
    const commonProps = {
      onCancel: closeModal,
      onSubmit: handleFormSubmit,
      vehicleId: iddelvehiculo,
    };

    switch (modal) {
      case 'income':
        return <IncomeForm {...commonProps} />;
      case 'expense':
        return <ExpenseForm {...commonProps} />;
      case 'fixed':
        return <FixedCostForm {...commonProps} />;
      case 'reminder':
        return <ReminderForm {...commonProps} />;
      default:
        return null;
    }
  };

  const cards = [
    { key: 'income', label: 'Ingresos', icon: <BsCashCoin size={30} /> },
    { key: 'expense', label: 'Gastos', icon: <BsCreditCard2Front size={30} /> },
    { key: 'fixed', label: 'Costos Fijos', icon: <BsGearWideConnected size={30} /> },
    { key: 'reminder', label: 'Recordatorios', icon: <BsCalendar2Check size={30} /> },
  ];

  return (
    <div className='divss'>
      <div className="cards-grid">
        {cards.map(({ key, label, icon }) => (
          <div
            key={key}
            onClick={() => setModal(key)}
            className="card"
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setModal(key)}
          >
            <div className="card-icon">{icon}</div>
            <div className="card-label">{label}</div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-x-button" onClick={closeModal}>×</button>
            <h2 className="modal-title">
              {labels[modal] || 'Formulario desconocido'}
            </h2>
            {renderForm()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVehicles;