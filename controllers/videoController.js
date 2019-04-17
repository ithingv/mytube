import { videos } from "../db";
import routes from "../routes"

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};

export const search = (req, res) => {
  const {
    query : {term : searchingBy} 
    }= req; 
    res.render("search", {pageTitle : "Search",searchingBy,videos});
}
// req.query.term
//    console.log(req.query.term);   // 검색단어가져오기 
//    const searchingBy = req.query.term   , searchingBy : searchingBy
export const getUpload = (req, res) => {
    res.render("upload", {pageTitle : "Upload"});
};
export const postUpload = (req, res) => {
    const{
        body : { file, title, description}        
        } = req;
    // To do : Upload and save video
    // 사용자가 비디오를 업로드하고나면 새로운 아이디를 반환받고
    // 업로드 후에 사용자를 업로드한 비디오의 videoDetail 페이지로 이동시켜준다.
        res.redirect(routes.videoDetail(324393));
};

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle : "Video Detail"});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle : "Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle : "Delete Video"});