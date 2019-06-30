export const typeDefs = `
   type User {
       id: ID!
       email: String! 
    }

   type Query {
       user: User
    }
    
   type Mutation {
        signUp(email: String!, password: String!): Boolean 
        login(email: String!, password: String!): User
    }
 `;
