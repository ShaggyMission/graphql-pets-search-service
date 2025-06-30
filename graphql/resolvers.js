const PetService = require('../services/PetService');

const resolvers = {
  Query: {
    getPetsByBreed: async (_, { breed }) => {
      return await PetService.getPetsByBreed(breed);
    },
    getPetsByLocation: async (_, { location }) => {
      return await PetService.getPetsByLocation(location);
    }
  }
};

module.exports = resolvers;
