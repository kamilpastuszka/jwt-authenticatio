export const resolvers = {
  Query: {
    user: () => {}
  },
  Mutation: {
    signUp: (_, { email, password }) => {},
    login: (_, { email, password }) => {
      return { id: 1, email };
    }
  }
};
