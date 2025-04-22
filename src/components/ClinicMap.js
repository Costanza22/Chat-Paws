import React, { useState } from 'react';
import './ClinicMap.css';

const ClinicMap = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const locationTypes = {
    veterinarios: {
      name: 'Veterinários',
      icon: '🏥',
      color: '#FF69B4'
    },
    clinicas24h: {
      name: 'Clínicas 24h',
      icon: '⏰',
      color: '#FF4444'
    },
    farmacias: {
      name: 'Farmácias Veterinárias',
      icon: '💊',
      color: '#4CAF50'
    },
    petshops: {
      name: 'Pet Shops',
      icon: '🛍️',
      color: '#2196F3'
    }
  };

  const locations = [
    {
      id: 1,
      name: 'Clínica VetCare',
      type: 'veterinarios',
      address: 'Rua das Flores, 123',
      phone: '(11) 1234-5678',
      rating: 4.8,
      is24h: false,
      distance: '1.2km'
    },
    {
      id: 2,
      name: 'Pet Hospital 24h',
      type: 'clinicas24h',
      address: 'Av. Principal, 456',
      phone: '(11) 9876-5432',
      rating: 4.9,
      is24h: true,
      distance: '2.5km'
    },
    {
      id: 3,
      name: 'Farmácia Pet',
      type: 'farmacias',
      address: 'Rua dos Animais, 789',
      phone: '(11) 5555-1234',
      rating: 4.7,
      is24h: false,
      distance: '1.8km'
    },
    {
      id: 4,
      name: 'Pet Shop Amigo',
      type: 'petshops',
      address: 'Av. Comercial, 321',
      phone: '(11) 3333-4444',
      rating: 4.6,
      is24h: false,
      distance: '3.1km'
    }
  ];

  const filteredLocations = locations.filter(location => {
    const matchesFilter = activeFilter === 'all' || location.type === activeFilter;
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="clinic-map">
      <div className="map-header">
        <h2>Mapa de Clínicas</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por nome ou endereço..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="filters">
        <button 
          className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          Todos
        </button>
        {Object.entries(locationTypes).map(([key, { name, icon, color }]) => (
          <button
            key={key}
            className={`filter-button ${activeFilter === key ? 'active' : ''}`}
            onClick={() => setActiveFilter(key)}
            style={{ '--filter-color': color }}
          >
            {icon} {name}
          </button>
        ))}
      </div>

      <div className="locations-grid">
        {filteredLocations.map(location => {
          const typeInfo = locationTypes[location.type];
          return (
            <div key={location.id} className="location-card">
              <div className="location-header" style={{ '--type-color': typeInfo.color }}>
                <span className="location-icon">{typeInfo.icon}</span>
                <h3>{location.name}</h3>
                {location.is24h && <span className="badge-24h">24h</span>}
              </div>
              <div className="location-info">
                <p className="address">📍 {location.address}</p>
                <p className="phone">📞 {location.phone}</p>
                <div className="location-footer">
                  <div className="rating">
                    ⭐ {location.rating}
                  </div>
                  <div className="distance">
                    🚗 {location.distance}
                  </div>
                </div>
              </div>
              <button className="view-on-map">
                Ver no Mapa
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClinicMap; 