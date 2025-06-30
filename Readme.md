# 🐾 Pet Search GraphQL Service - Shaggy Mission

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white" alt="GraphQL" />
  <img src="https://img.shields.io/badge/Apollo%20Server-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white" alt="Apollo Server" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
</div>

<div align="center">
  <h3>🔍 Pet Search and Discovery GraphQL Microservice for Street Animal Rescue</h3>
  <p><em>Part of the Shaggy Mission ecosystem - Advanced pet search with flexible GraphQL queries! 🐕🐱</em></p>
</div>

---

## 🌟 Overview

The **Pet Search GraphQL Service** is an advanced microservice in the Shaggy Mission platform that provides powerful search and discovery capabilities for pet records. Built with GraphQL and Apollo Server, this service enables users to perform flexible queries to find pets by breed, location, and other criteria with precise data fetching and optimal performance.

## 🎯 What This Service Does

- **Advanced Pet Search**: Find pets by breed with case-insensitive matching
- **Location-Based Discovery**: Search pets by geographical location
- **Flexible GraphQL Queries**: Request exactly the data you need, nothing more
- **Case-Insensitive Search**: Smart search that works regardless of input case
- **Optimized Data Fetching**: GraphQL resolver pattern for efficient database queries
- **Structured Response**: Clean, predictable data structure for frontend integration
- **Real-time Search**: Fast query execution for instant search results

## 🛠️ Tech Stack

- **Runtime**: Node.js with Express.js framework
- **GraphQL Server**: Apollo Server Express for GraphQL API
- **Database**: MongoDB Atlas with Mongoose ODM
- **Search Implementation**: MongoDB regex-based case-insensitive search
- **Architecture**: Clean separation with Repository and Service patterns
- **Data Modeling**: Comprehensive pet schema with validation
- **Performance**: Optimized GraphQL resolvers and database queries

## 🔍 GraphQL Schema & Queries

### Pet Type Definition
```graphql
type Pet {
  id: ID!
  name: String!
  breed: String
  age: Int
  healthStatus: String
  description: String
  location: String
  images: [String]
}
```

### Available Queries

#### Search Pets by Breed
```graphql
query GetPetsByBreed($breed: String!) {
  getPetsByBreed(breed: $breed) {
    id
    name
    breed
    age
    healthStatus
    description
    location
    images
  }
}
```

**Variables:**
```json
{
  "breed": "Golden Retriever"
}
```

#### Search Pets by Location
```graphql
query GetPetsByLocation($location: String!) {
  getPetsByLocation(location: $location) {
    id
    name
    breed
    age
    healthStatus
    description
    location
    images
  }
}
```

**Variables:**
```json
{
  "location": "New York"
}
```

### Flexible Data Fetching Examples

**Minimal Query (Name and Breed Only):**
```graphql
query {
  getPetsByBreed(breed: "labrador") {
    name
    breed
  }
}
```

**Complete Pet Information:**
```graphql
query {
  getPetsByLocation(location: "california") {
    id
    name
    breed
    age
    healthStatus
    description
    location
    images
  }
}
```

## 📡 API Access

### GraphQL Playground
**`GET http://localhost:3011/graphql`**
- Interactive GraphQL playground for testing queries
- Schema exploration and documentation
- Real-time query execution and results
- Variable input and query validation

### Example Responses

**Successful Breed Search:**
```json
{
  "data": {
    "getPetsByBreed": [
      {
        "id": "64f8b2a1c3d4e5f6a7b8c9d0",
        "name": "Buddy",
        "breed": "Golden Retriever",
        "age": 3,
        "healthStatus": "Good",
        "description": "A friendly and energetic dog",
        "location": "New York, NY",
        "images": ["https://example.com/buddy.jpg"]
      }
    ]
  }
}
```

**Successful Location Search:**
```json
{
  "data": {
    "getPetsByLocation": [
      {
        "id": "64f8b2a1c3d4e5f6a7b8c9d1",
        "name": "Luna",
        "breed": "Mixed Breed",
        "age": 2,
        "healthStatus": "Good",
        "description": "Sweet and gentle cat",
        "location": "Los Angeles, CA",
        "images": ["https://example.com/luna.jpg"]
      }
    ]
  }
}
```

## 🔧 Core Functionality

### Search Implementation
The service implements intelligent search using MongoDB regex patterns for case-insensitive matching, GraphQL resolvers that validate input parameters, repository pattern for clean data access separation, and service layer for business logic and validation.

### Case-Insensitive Matching
Both breed and location searches use MongoDB's `$regex` operator with the `$options: 'i'` flag, enabling users to search with any case combination (e.g., "golden retriever", "Golden Retriever", "GOLDEN RETRIEVER").

### GraphQL Benefits
- **Precise Data Fetching**: Request only the fields you need
- **Single Endpoint**: One URL for all pet search operations
- **Type Safety**: Strong typing with GraphQL schema validation
- **Introspection**: Self-documenting API with schema exploration
- **Efficient Queries**: Optimized database queries based on requested fields

## 🌐 Service Integration

This microservice integrates seamlessly with other Shaggy Mission platform components, providing advanced search capabilities for frontend applications, supporting mobile apps with flexible data requirements, enabling integration with recommendation systems, and complementing the Pet List Service with targeted search functionality.

## 🏗️ Architecture Pattern

### Repository Pattern
```javascript
class PetRepository {
  async findByBreed(breed) {
    return Pet.find({ breed: { $regex: breed, $options: 'i' } });
  }
  
  async findByLocation(location) {
    return Pet.find({ location: { $regex: location, $options: 'i' } });
  }
}
```

### Service Layer
```javascript
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
```

### GraphQL Resolvers
```javascript
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
```

## 🗃️ Database Schema

### Pet Document Structure
```javascript
{
  _id: ObjectId,
  name: String (required),
  breed: String (optional, searchable),
  age: Number (min: 0, optional),
  healthStatus: String (enum: ['Good', 'Fair', 'Delicate'], default: 'Good'),
  description: String (optional),
  location: String (optional, searchable),
  images: [String] (array of URLs),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

### Search Indexes (Recommended)
```javascript
// Recommended indexes for optimal search performance
db.pets.createIndex({ "breed": "text" })
db.pets.createIndex({ "location": "text" })
db.pets.createIndex({ "breed": 1, "location": 1 })
```

## 🔧 Development

### Project Structure
```
├── config/
│   └── db.js                    # MongoDB connection setup
├── models/
│   └── Pet.js                   # Mongoose Pet schema
├── repositories/
│   └── PetRepository.js         # Database access layer
├── services/
│   └── PetService.js            # Business logic layer
├── graphql/
│   ├── schema.js                # GraphQL type definitions
│   └── resolvers.js             # GraphQL query resolvers
└── app.js                       # Apollo Server setup
```

### Running the Service
```bash
# Start the GraphQL server
npm start

# The service will be available at:
# http://localhost:3011/graphql (GraphQL Playground)
```

### Testing Queries

**Using GraphQL Playground:**
1. Navigate to `http://localhost:3011/graphql`
2. Use the interactive editor to write queries
3. Access schema documentation in the sidebar
4. Test with different breeds and locations

**Using curl:**
```bash
# Search by breed
curl -X POST http://localhost:3011/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { getPetsByBreed(breed: \"labrador\") { name breed location } }"
  }'

# Search by location
curl -X POST http://localhost:3011/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { getPetsByLocation(location: \"new york\") { name breed age healthStatus } }"
  }'
```

## 🔄 Search Workflows

### Adoption Discovery Process
Potential adopters can search for specific breeds they're interested in, find pets in their local area, customize data fetching to get relevant information, and combine results with other services for complete adoption workflows.

### Rescue Organization Management
Staff can search pets by location for transport planning, find specific breeds for specialized care programs, generate reports with targeted data queries, and integrate with administrative dashboards.

### Mobile App Integration
Mobile applications can request minimal data for list views, fetch complete profiles for detail screens, implement progressive data loading, and optimize network usage with precise queries.

## ⚡ Performance Considerations

### Database Optimization
- **Index Strategy**: Text indexes on breed and location fields for fast searches
- **Regex Performance**: Case-insensitive regex queries optimized for MongoDB
- **Connection Pooling**: Efficient MongoDB connection management
- **Query Optimization**: Minimal data fetching based on GraphQL field selection

### GraphQL Benefits
- **Reduced Over-fetching**: Only requested data is retrieved and transmitted
- **Single Request**: Multiple data requirements in one query
- **Caching Opportunities**: GraphQL query caching and memoization
- **Network Efficiency**: Optimized payload sizes for mobile applications

## 🔒 Data Security & Validation

- **Input Validation**: GraphQL schema validation for all query parameters
- **Required Fields**: Breed and location parameters are mandatory
- **Error Handling**: Comprehensive error management with clear messages
- **Data Sanitization**: MongoDB injection protection through Mongoose
- **Type Safety**: GraphQL type system prevents invalid data requests
- **Connection Security**: Secure MongoDB connection with credentials

## 🚀 Future Enhancements

- **Advanced Filters**: Add age range, health status, and multiple criteria filtering
- **Full-Text Search**: Implement comprehensive text search across all pet fields
- **Geo-Location Search**: GPS-based proximity search for nearby pets
- **Fuzzy Matching**: Intelligent search that handles typos and similar terms
- **Search Analytics**: Track popular search terms and optimize accordingly
- **Real-time Subscriptions**: GraphQL subscriptions for live pet availability updates
- **Search Suggestions**: Auto-complete and search suggestions for better UX
- **Image Search**: AI-powered image similarity search for visual pet discovery
- **Advanced Sorting**: Multiple sorting criteria (distance, age, date added)
- **Saved Searches**: Allow users to save and reuse favorite search queries

## 📋 Usage Examples

### Frontend Integration
```javascript
// React component example
const { data, loading, error } = useQuery(GET_PETS_BY_BREED, {
  variables: { breed: 'Golden Retriever' }
});

if (loading) return <Loading />;
if (error) return <Error message={error.message} />;

return (
  <div>
    {data.getPetsByBreed.map(pet => (
      <PetCard key={pet.id} pet={pet} />
    ))}
  </div>
);
```

### Mobile App Usage
```javascript
// Minimal data for list view
const LIST_QUERY = gql`
  query GetPetsByLocation($location: String!) {
    getPetsByLocation(location: $location) {
      id
      name
      breed
      images
    }
  }
`;

// Full data for detail view
const DETAIL_QUERY = gql`
  query GetPetDetails($breed: String!) {
    getPetsByBreed(breed: $breed) {
      id
      name
      breed
      age
      healthStatus
      description
      location
      images
    }
  }
`;
```

---

<div align="center">
  <p><strong>Built with ❤️ for street dogs and cats everywhere 🐕🐱</strong></p>
  <p><em>Helping every pet find their perfect match through intelligent search!</em></p>
  <p>🚀 <a href="http://localhost:3011/graphql">Explore GraphQL Playground</a></p>
</div>