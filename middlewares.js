import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });
// file을 Upload해서 middleware에서 받아 URL을 복사해서 DataBase에 저장하는 것
export const localMiddleWare = (req, res, next) => {
  res.locals.siteName = "ふにふにTube";
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  // user가 존재하거나 아니면 존재하지 않다면 비어있는 object를 주고록
  // passport가 사용자를 로그인 시킬 때, passport는 쿠키나 serialize, deserialize 등의 기능을 다 지원해줌은 물론이고,
  // user가 담긴 object를 요청(request)에도 올려줄 것{
  next();
};
// 전역적으로 사용할 수 있는 변수를 추가하는 방법, 템플릿, 뷰 모든곳에서 사용가능
export const onlyPublic = (req, res, next) => {
  if (req.use) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
export const uploadVideo = multerVideo.single("videoFile");
