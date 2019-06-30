import User from "./models/user";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./constants";

export const resolvers = {
  Mutation: {
    signUp: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedPassword
      });
      const data = await user.save();

      return true;
    },
    login: async (_, { email, password }, { res }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        return null;
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return null;
      }

      const accessToken = sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
        expiresIn: "20min"
      });

      const refreshToken = sign({ userId: user._id }, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
      });

      res.cookie("access-token", accessToken);
      res.cookie("refresh-token", refreshToken);

      return user;
    }
  }
};
