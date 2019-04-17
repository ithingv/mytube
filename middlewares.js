import routes from "./routes";

export const localMiddleWare = (req,res,next) => {
    res.locals.siteName = "MyTube";
    res.locals.routes =routes; 
    res.locals.user = {
        isAuthenticated: true,
        id: 1
      };
    next();
};//전역적으로 사용할 수 있는 변수를 추가하는 방법, 템플릿, 뷰 모든곳에서 사용가능