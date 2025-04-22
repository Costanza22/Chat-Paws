import React, { useState, useRef } from 'react';
import './PetProfile.css';

const PetProfile = () => {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    weight: '',
    gender: '',
    medicalHistory: '',
    allergies: '',
    medications: '',
    registrationNumber: '',
    pedigreeNumber: '',
    microchipNumber: '',
    insuranceNumber: '',
    insuranceCompany: '',
    insuranceExpiry: '',
    photos: []
  });
  const [selectedPet, setSelectedPet] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      isFavorite: false,
      uploadDate: new Date().toISOString()
    }));
    
    if (selectedPet) {
      const updatedPet = {
        ...selectedPet,
        photos: [...selectedPet.photos, ...newPhotos]
      };
      setPets(pets.map(pet => pet.id === selectedPet.id ? updatedPet : pet));
      setSelectedPet(updatedPet);
    } else {
      setNewPet(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
    }
  };

  const toggleFavorite = (photoId) => {
    if (selectedPet) {
      const updatedPhotos = selectedPet.photos.map(photo => 
        photo.id === photoId ? { ...photo, isFavorite: !photo.isFavorite } : photo
      );
      const updatedPet = { ...selectedPet, photos: updatedPhotos };
      setPets(pets.map(pet => pet.id === selectedPet.id ? updatedPet : pet));
      setSelectedPet(updatedPet);
    }
  };

  const nextPhoto = () => {
    if (selectedPet && selectedPet.photos.length > 0) {
      setCurrentPhotoIndex((prevIndex) => 
        prevIndex === selectedPet.photos.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevPhoto = () => {
    if (selectedPet && selectedPet.photos.length > 0) {
      setCurrentPhotoIndex((prevIndex) => 
        prevIndex === 0 ? selectedPet.photos.length - 1 : prevIndex - 1
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pet = {
      ...newPet,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setPets([...pets, pet]);
    setNewPet({
      ...newPet,
      name: '',
      species: '',
      breed: '',
      age: '',
      weight: '',
      gender: '',
      medicalHistory: '',
      allergies: '',
      medications: '',
      registrationNumber: '',
      pedigreeNumber: '',
      microchipNumber: '',
      insuranceNumber: '',
      insuranceCompany: '',
      insuranceExpiry: '',
      photos: []
    });
  };

  return (
    <div className="pet-profile">
      <h2>Perfil do Pet</h2>
      
      <form onSubmit={handleSubmit} className="pet-form">
        <div className="form-group">
          <label>Nome do Pet:</label>
          <input
            type="text"
            value={newPet.name}
            onChange={(e) => setNewPet({...newPet, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Espécie:</label>
          <select
            value={newPet.species}
            onChange={(e) => setNewPet({...newPet, species: e.target.value})}
            required
          >
            <option value="">Selecione</option>
            <option value="cachorro">Cachorro</option>
            <option value="gato">Gato</option>
            <option value="pássaro">Pássaro</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div className="form-group">
          <label>Raça:</label>
          <input
            type="text"
            value={newPet.breed}
            onChange={(e) => setNewPet({...newPet, breed: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Idade:</label>
          <input
            type="text"
            value={newPet.age}
            onChange={(e) => setNewPet({...newPet, age: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Peso (kg):</label>
          <input
            type="number"
            value={newPet.weight}
            onChange={(e) => setNewPet({...newPet, weight: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Gênero:</label>
          <select
            value={newPet.gender}
            onChange={(e) => setNewPet({...newPet, gender: e.target.value})}
            required
          >
            <option value="">Selecione</option>
            <option value="macho">Macho</option>
            <option value="fêmea">Fêmea</option>
          </select>
        </div>

        <div className="form-group">
          <label>Histórico Médico:</label>
          <textarea
            value={newPet.medicalHistory}
            onChange={(e) => setNewPet({...newPet, medicalHistory: e.target.value})}
            placeholder="Doenças anteriores, cirurgias, etc."
          />
        </div>

        <div className="form-group">
          <label>Alergias:</label>
          <textarea
            value={newPet.allergies}
            onChange={(e) => setNewPet({...newPet, allergies: e.target.value})}
            placeholder="Liste as alergias conhecidas"
          />
        </div>

        <div className="form-group">
          <label>Medicações:</label>
          <textarea
            value={newPet.medications}
            onChange={(e) => setNewPet({...newPet, medications: e.target.value})}
            placeholder="Medicações em uso"
          />
        </div>

        <div className="documents-section">
          <h3>Documentos</h3>
          
          <div className="form-group">
            <label>Número de Registro Geral:</label>
            <input
              type="text"
              value={newPet.registrationNumber}
              onChange={(e) => setNewPet({...newPet, registrationNumber: e.target.value})}
              placeholder="Número do registro geral"
            />
          </div>

          <div className="form-group">
            <label>Número do Pedigree:</label>
            <input
              type="text"
              value={newPet.pedigreeNumber}
              onChange={(e) => setNewPet({...newPet, pedigreeNumber: e.target.value})}
              placeholder="Número do pedigree"
            />
          </div>

          <div className="form-group">
            <label>Número do Microchip:</label>
            <input
              type="text"
              value={newPet.microchipNumber}
              onChange={(e) => setNewPet({...newPet, microchipNumber: e.target.value})}
              placeholder="Número do microchip"
            />
          </div>

          <div className="form-group">
            <label>Seguro Pet</label>
            <input
              type="text"
              value={newPet.insuranceNumber}
              onChange={(e) => setNewPet({...newPet, insuranceNumber: e.target.value})}
              placeholder="Número do seguro"
            />
          </div>

          <div className="form-group">
            <label>Seguradora:</label>
            <input
              type="text"
              value={newPet.insuranceCompany}
              onChange={(e) => setNewPet({...newPet, insuranceCompany: e.target.value})}
              placeholder="Nome da seguradora"
            />
          </div>

          <div className="form-group">
            <label>Validade do Seguro:</label>
            <input
              type="date"
              value={newPet.insuranceExpiry}
              onChange={(e) => setNewPet({...newPet, insuranceExpiry: e.target.value})}
            />
          </div>
        </div>

        <div className="photos-section">
          <h3>Fotos do Pet</h3>
          <div className="photo-upload">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              multiple
              style={{ display: 'none' }}
            />
            <button 
              type="button" 
              className="upload-button"
              onClick={() => fileInputRef.current.click()}
            >
              Adicionar Fotos
            </button>
          </div>
          
          {newPet.photos.length > 0 && (
            <div className="photos-preview">
              {newPet.photos.map(photo => (
                <div key={photo.id} className="photo-item">
                  <img src={photo.url} alt="Pet" />
                  <button 
                    className={`favorite-button ${photo.isFavorite ? 'active' : ''}`}
                    onClick={() => toggleFavorite(photo.id)}
                    title={photo.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    {photo.isFavorite ? '⭐' : '☆'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">
          Salvar Perfil
        </button>
      </form>

      <div className="pets-list">
        <h3>Pets Cadastrados</h3>
        {pets.map(pet => (
          <div 
            key={pet.id} 
            className="pet-card"
            onClick={() => {
              setSelectedPet(pet);
              setCurrentPhotoIndex(0);
            }}
          >
            <h4>{pet.name}</h4>
            
            {pet.photos.length > 0 && (
              <div className="photo-carousel">
                <button className="carousel-button prev" onClick={prevPhoto}>❮</button>
                <div className="carousel-container">
                  <img 
                    src={pet.photos[currentPhotoIndex].url} 
                    alt={pet.name}
                    className="carousel-image"
                  />
                  <button 
                    className={`favorite-button ${pet.photos[currentPhotoIndex].isFavorite ? 'active' : ''}`}
                    onClick={() => toggleFavorite(pet.photos[currentPhotoIndex].id)}
                    title={pet.photos[currentPhotoIndex].isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    {pet.photos[currentPhotoIndex].isFavorite ? '⭐' : '☆'}
                  </button>
                </div>
                <button className="carousel-button next" onClick={nextPhoto}>❯</button>
              </div>
            )}
            
            <p><strong>Espécie:</strong> {pet.species}</p>
            <p><strong>Raça:</strong> {pet.breed}</p>
            <p><strong>Idade:</strong> {pet.age}</p>
            <p><strong>Peso:</strong> {pet.weight} kg</p>
            <p><strong>Gênero:</strong> {pet.gender}</p>
            
            <div className="documents-info">
              <h5>Documentos</h5>
              {pet.registrationNumber && (
                <p><strong>Registro Geral:</strong> {pet.registrationNumber}</p>
              )}
              {pet.pedigreeNumber && (
                <p><strong>Pedigree:</strong> {pet.pedigreeNumber}</p>
              )}
              {pet.microchipNumber && (
                <p><strong>Microchip:</strong> {pet.microchipNumber}</p>
              )}
              {pet.insuranceNumber && (
                <p><strong>Seguro:</strong> {pet.insuranceNumber}</p>
              )}
              {pet.insuranceCompany && (
                <p><strong>Seguradora:</strong> {pet.insuranceCompany}</p>
              )}
              {pet.insuranceExpiry && (
                <p><strong>Validade do Seguro:</strong> {new Date(pet.insuranceExpiry).toLocaleDateString()}</p>
              )}
            </div>

            {pet.medicalHistory && (
              <p><strong>Histórico Médico:</strong> {pet.medicalHistory}</p>
            )}
            {pet.allergies && (
              <p><strong>Alergias:</strong> {pet.allergies}</p>
            )}
            {pet.medications && (
              <p><strong>Medicações:</strong> {pet.medications}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetProfile; 