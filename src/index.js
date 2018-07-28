// import renderAuth from "./C-Auth";
import renderHeader from "./C-Header";
import renderGallery from "./C-Gallery";
import renderNav from "./C-Nav";
//
//
// const elAuth = document.querySelector("#auth");
const elHeader = document.querySelector("header");
const elNav = document.querySelector("nav");
const elGallery = document.querySelector("main");
//
//

// renderAuth(null, elAuth);
renderNav(null, elNav);
renderHeader(null, elHeader);
renderGallery(null, elGallery);
