import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import '../../styles/Vehicles.css';
import { FaCarSide } from 'react-icons/fa';
import {
  getDriverCars,
  getDriverCarsID,
  deleteIncome,
  deleteExpense,
  deleteFixedCost,
  deleteReminder,
} from '../../services/ServicesGeneral';
import AdminVehicles from './adminVehicles';
import Modal from './Modal';

function Vehicles() {
  const { plate } = useParams();
  const [vehicles, setVehicles] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recordatoriosVencidos, setRecordatoriosVencidos] = useState([]);
  const [recordatoriosProximos, setRecordatoriosProximos] = useState([]);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getDriverCars();
        setVehicles(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error al cargar vehículos');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const vehicle = vehicles.find(v => v.placa === plate);

  const fetchVehicleData = useCallback(async () => {
    if (!vehicle?._id) return;
    try {
      const response = await getDriverCarsID(vehicle._id);
      const hoy = new Date();
      const recordatorios = response.data.recordatorios || [];

      setRecordatoriosVencidos(recordatorios.filter(r => new Date(r.dateEnd) < hoy).slice(0, 2));
      setRecordatoriosProximos(recordatorios.filter(r => new Date(r.dateEnd) >= hoy).slice(0, 3));
      setVehicleDetails(response.data);
    } catch (err) {
      console.error('Error al obtener el vehículo por ID:', err.response?.data || err.message);
    }
  }, [vehicle?._id]);

  useEffect(() => {
    fetchVehicleData();
  }, [fetchVehicleData]);

  const closeModal = () => setModal(null);

  const handleDelete = async (_id, type) => {
    try {
      switch (type) {
        case 'income':
          await deleteIncome(_id);
          break;
        case 'expense':
          await deleteExpense(_id);
          break;
        case 'fixedcost':
          await deleteFixedCost(_id);
          break;
        case 'reminder':
          await deleteReminder(_id);
          break;
        default:
          return;
      }
      await fetchVehicleData();
      closeModal(); // ✅ Cierra el modal después de eliminar
    } catch (error) {
      console.error(`Error eliminando ${type}:`, error);
    }
  };

  const handleTableData = (data, fields, type) =>
    data.map(entry => {
      const visible = {};
      for (const key of fields) {
        visible[key] = entry[key] instanceof Date || key.includes('date')
          ? new Date(entry[key]).toISOString().split('T')[0]
          : entry[key];
      }
      visible.actions = (
        <>
          <button onClick={() => handleDelete(entry._id, type)}>Eliminar</button>
        </>
      );
      return visible;
    });

  if (loading) return <p>Cargando vehículos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!vehicle) return <h2>Vehículo con placa "{plate}" no encontrado.</h2>;

  return (
    <div className="vehicles-container">
      <div className="vehicle-card prus">
        <div className="vehicle-header2">
          <div className="vehicle-header">
            <div className="vehicle-info">
              <div className="license-plate" style={{ marginBottom: 10 }}>
                {vehicle.placa} - {vehicle.marca}
              </div>
              <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="cost-per-km">
                  <p style={{ fontSize: '2rem', fontWeight: '600' }}>
                    Costo / Kml
                    <button
                      className="btn-details"
                      onClick={() =>
                        setModal({
                          title: 'Costos por Km',
                          data: handleTableData(vehicleDetails?.costos || [], ['concepto', 'valor', 'klm', 'fecha'], 'fixedcost'),
                        })
                      }
                      style={{ marginLeft: 10 }}
                    >
                      Ver más
                    </button>
                  </p>
                  <strong style={{ fontSize: '3rem' }}>
                    ${vehicleDetails?.resumenTotales?.totalCostos?.toLocaleString('es-CO') || '0'}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reminders-section" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <FaCarSide className="car-icon" style={{ fontSize: '5rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="costo-operativo">
              <p>Costo Operativo</p>
              <strong style={{ fontSize: '2rem' }}>
                ${vehicleDetails?.resumenTotales?.costoOperativo?.toLocaleString('es-CO') || '0'}
              </strong>
            </div>
            <div className="Klm-operativo">
              <p>Klm Ganancias</p>
              <strong style={{ fontSize: '2rem' }}>
                ${vehicleDetails?.resumenTotales?.totalKmIngresos?.toLocaleString('es-CO') || '0'}
              </strong>
            </div>
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card">
            <p>
              Total de ingresos
              <button
                className="btn-details"
                onClick={() =>
                  setModal({
                    title: 'Ingresos',
                    data: handleTableData(vehicleDetails?.ingresos || [], ['dateStart', 'dateEnd', 'ingresoTotal', 'klm'], 'income'),
                  })
                }
                style={{ marginLeft: 10 }}
              >
                Ver más
              </button>
            </p>
            <h3>${vehicleDetails?.resumenTotales?.totalIngresos?.toLocaleString('es-CO') || '0'}</h3>
          </div>

          <div className="summary-card">
            <p>
              Total de gastos
              <button
                className="btn-details"
                onClick={() =>
                  setModal({
                    title: 'Gastos',
                    data: handleTableData(vehicleDetails?.gastos || [], ['dateStart', 'dateEnd', 'concepto', 'gastoTotal'], 'expense'),
                  })
                }
                style={{ marginLeft: 10 }}
              >
                Ver más
              </button>
            </p>
            <h3 className="danger">
              ${vehicleDetails?.resumenTotales?.totalGastos?.toLocaleString('es-CO') || '0'}
            </h3>
          </div>

          <div className="summary-card recordatorios">
            <h4>Últimos recordatorios</h4>
            <ul>
              {recordatoriosVencidos.length > 0 ? recordatoriosVencidos.map((rec, idx) => (
                <li key={idx}>
                  {rec.item}<br />
                  <small className="date">{new Date(rec.dateEnd).toLocaleDateString()}</small>
                </li>
              )) : <li>No hay recordatorios vencidos</li>}
            </ul>
          </div>
        </div>

        <div className="reminders-section">
          <h4>
            Próximos recordatorios
            <button
              className="btn-details"
              onClick={() =>
                setModal({
                  title: 'Recordatorios',
                  data: handleTableData(vehicleDetails?.recordatorios || [], ['dateStart', 'dateEnd', 'item', 'detalle'], 'reminder'),
                })
              }
              style={{ marginLeft: 10 }}
            >
              Ver más
            </button>
          </h4>
          <ul>
            {recordatoriosProximos.length > 0 ? recordatoriosProximos.map((rec, idx) => (
              <li key={idx}>
                {rec.item}<br />
                <small className="date">{new Date(rec.dateEnd).toLocaleDateString()}</small>
              </li>
            )) : <li>No hay próximos recordatorios</li>}
          </ul>
        </div>
      </div>

      <div className="vehicle-card1">
        <AdminVehicles iddelvehiculo={vehicle._id} onDataChange={fetchVehicleData} />
      </div>

      {modal && (
        <Modal isOpen={true} onClose={closeModal} title={modal.title} data={modal.data} />
      )}
    </div>
  );
}

export default Vehicles;