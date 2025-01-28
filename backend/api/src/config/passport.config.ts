import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import User from "../users/users.model";
import dotenv from "dotenv";

dotenv.config();
const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => req.cookies.token || null,
  ]),
  secretOrKey: process.env.JWT_SECRET!,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload._id);

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
