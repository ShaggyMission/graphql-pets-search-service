const Pet = require('../models/Pet');

class PetRepository {
  async findByBreed(breed) {
    return Pet.find({ breed: { $regex: breed, $options: 'i' } });
  }

  async findByLocation(location) {
    return Pet.find({ location: { $regex: location, $options: 'i' } });
  }
}

module.exports = new PetRepository();
