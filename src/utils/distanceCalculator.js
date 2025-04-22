export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Raio da Terra em km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
};

const toRad = (value) => {
  return value * Math.PI / 180;
};

export const findNearestVets = (userLat, userLng, vets, limit = 3) => {
  return vets
    .map(vet => ({
      ...vet,
      distance: calculateDistance(
        userLat,
        userLng,
        vet.coordinates.lat,
        vet.coordinates.lng
      )
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}; 