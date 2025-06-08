import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import { IoCarSportOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css';
import {
  getDriverCars,
  createDriverCar,
  updateDriverCar,
  deleteDriverCar
} from '../../services/ServicesGeneral';

ReactModal.setAppElement('#root');

function Dashboard() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({ marca: '', placa: '' });
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await getDriverCars();
        setVehicles(res.data);
      } catch (err) {
        console.error('Error cargando vehículos', err);
      }
    };
    fetchVehicles();
  }, []);

  const openModal = () => {
    setNewVehicle({ marca: '', placa: '' });
    setEditingVehicle(null);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVehicle) {
        const res = await updateDriverCar(editingVehicle._id, newVehicle);
        setVehicles((prev) =>
          prev.map((v) => (v._id === res.data._id ? res.data : v))
        );
      } else {
        const res = await createDriverCar(newVehicle);
        setVehicles((prev) => [...prev, res.data]);
      }
      closeModal();
    } catch (err) {
      console.error('Error guardando vehículo', err);
    }
  };

  const handleEdit = (veh) => {
    setEditingVehicle(veh);
    setNewVehicle({ marca: veh.marca, placa: veh.placa });
    setModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDriverCar(id);
      setVehicles((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error('Error eliminando vehículo', err);
    }
  };

  return (
    <div className="dashboard-container" id="vehicles">
      <div className="dashboard-header">
        <h1>Mis Vehículos</h1>
        <button className="btn-add" onClick={openModal}>
          <FaPlus /> Agregar vehículo
        </button>
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={editingVehicle ? "Editar vehículo" : "Agregar vehículo"}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button className="modal-close-btn" onClick={closeModal} aria-label="Cerrar modal">
          &times;
        </button>
        <form className="vehicle-form" onSubmit={handleSubmit}>
          <input type="text" name="marca" placeholder="Marca" value={newVehicle.marca} onChange={handleInputChange} required autoFocus />
          <input type="text" name="placa" placeholder="Placa" value={newVehicle.placa} onChange={handleInputChange} required />
          <button type="submit" className="btn-add">
            <FaPlus style={{ marginRight: 8 }} />
            {editingVehicle ? 'Actualizar' : 'Agregar'}
          </button>
        </form>
      </ReactModal>

      <div className="cards-container">
        {vehicles.map(({ _id, placa, marca }) => (
          <div key={_id} className="dashboard-card vehicle-card">
            <div className="vehicle-info" onClick={() => navigate(`/vehicles/${placa}`)} style={{ cursor: 'pointer' }}>
              <IoCarSportOutline className="icon-car"/>
              <div className='placa'><p>{placa}</p></div>
            </div>

            <div className="vehicle-info2">
              <h3>{placa}<p>{marca}</p></h3>
              <div className="vehicle-actions">
                <button className="btn btn-edit" onClick={() => handleEdit({ _id, marca, placa })}>Editar</button>
                <button className="btn btn-delete" onClick={() => handleDelete(_id)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;