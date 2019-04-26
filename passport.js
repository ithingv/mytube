import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// 이미 구성이 된 passport-local의 LocalStrategy를 생성합니다.
// serialization은 어떤 field가 쿠키에 포함될 것인지 알려주는 역할을 한다.
// deserialization은 어느 사용자인지 어떻게 찾는가?
