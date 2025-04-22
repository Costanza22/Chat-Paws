import React, { useState } from 'react';
import { veterinarians } from '../data/veterinarians';
import { findNearestVets } from '../utils/distanceCalculator';
import './AppointmentScheduler.css';

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [petName, setPetName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [userLocation, setUserLocation] = useState('');
  const [nearestVets, setNearestVets] = useState([]);
  const [showVets, setShowVets] = useState(false);

  const availableTimes = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    // Simulação de geocodificação - em um caso real, usaríamos uma API de geocodificação
    const mockCoordinates = {
      lat: -23.5505, // São Paulo
      lng: -46.6333
    };
    
    const vets = findNearestVets(
      mockCoordinates.lat,
      mockCoordinates.lng,
      veterinarians
    );
    
    setNearestVets(vets);
    setShowVets(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: Date.now(),
      date: selectedDate,
      time: selectedTime,
      petName,
      ownerName,
      phone,
      reason
    };
    setAppointments([...appointments, newAppointment]);
    // Limpar formulário
    setSelectedDate('');
    setSelectedTime('');
    setPetName('');
    setOwnerName('');
    setPhone('');
    setReason('');
  };

  return (
    <div className="appointment-scheduler">
      <h2>Agendar Consulta</h2>
      
      <div className="location-section">
        <h3>Encontrar Veterinários Próximos</h3>
        <form onSubmit={handleLocationSubmit} className="location-form">
          <div className="form-group">
            <label>Digite seu endereço:</label>
            <input
              type="text"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              placeholder="Ex: Rua das Flores, 123 - São Paulo"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Buscar Veterinários
          </button>
        </form>

        {showVets && (
          <div className="vets-list">
            <h3>Veterinários Próximos</h3>
            {nearestVets.map(vet => (
              <div key={vet.id} className="vet-card">
                <h4>{vet.name}</h4>
                <p><strong>Endereço:</strong> {vet.address}</p>
                <p><strong>Telefone:</strong> {vet.phone}</p>
                <p><strong>Distância:</strong> {vet.distance.toFixed(1)} km</p>
                <p><strong>Especialidades:</strong> {vet.specialties.join(', ')}</p>
                <p><strong>Avaliação:</strong> {vet.rating} ⭐</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label>Data:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Horário:</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
          >
            <option value="">Selecione um horário</option>
            {availableTimes.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Nome do Pet:</label>
          <input
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Nome do Tutor:</label>
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Telefone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Motivo da Consulta:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Agendar Consulta
        </button>
      </form>

      <div className="appointments-list">
        <h3>Consultas Agendadas</h3>
        {appointments.map(appointment => (
          <div key={appointment.id} className="appointment-card">
            <p><strong>Data:</strong> {appointment.date}</p>
            <p><strong>Horário:</strong> {appointment.time}</p>
            <p><strong>Pet:</strong> {appointment.petName}</p>
            <p><strong>Tutor:</strong> {appointment.ownerName}</p>
            <p><strong>Telefone:</strong> {appointment.phone}</p>
            <p><strong>Motivo:</strong> {appointment.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentScheduler; 