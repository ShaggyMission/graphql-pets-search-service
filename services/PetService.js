const PetRepository = require('../repositories/PetRepository');

class PetService {
  async getPetsByBreed(breed) {
    if (!breed) throw new Error('Breed is required');
    return await PetRepository.findByBreed(breed);
  }

  async getPetsByLocation(location) {
    if (!location) throw new Error('Location is required');
    return await PetRepository.findByLocation(location);
  }
}

module.exports = new PetService();
