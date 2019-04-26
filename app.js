import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localMiddleWare } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import "./passport";

const app = express();
const CokieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
// 디렉토리에서 file을 보내주는 middleware 어떤 종류의 controller나 view같은건 확인하지 않음
// uploads라는 directory안으로 들어간다는 뜻
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection })
  })
);
// secret이란 무작위 문자열로서 쿠키에 들어있는 session ID를
// 암호화하기 위한 것
app.use(passport.initialize());
app.use(passport.session());
// passport는 초기화되고 다음엔 passport가 제 스스로 쿠키를 들여다봐서
// 그 쿠키 정보에 해당하는 사용자를 찾아줄 것 
// 그리고 passport는 자기가 찾은 그 사용자를 요청(request)의 object, 즉 req.user로 만들어준다.
app.use(localMiddleWare);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
export default app;
