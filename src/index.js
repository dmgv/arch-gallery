import { firebase, googleAuthProvider } from "./firebase";
import renderAuth from "./C-Auth";
import renderHeader from "./C-Header";
import renderGallery from "./C-Gallery";
import renderNav from "./C-Nav";

// Get page elements
const elAuth = document.querySelector("#auth");
const elHeader = document.querySelector("header");
const elNav = document.querySelector("nav");
const elGallery = document.querySelector("main");
const overlay = document.querySelector(".overlay");
const overlayImage = overlay.querySelector("img");
const overlayClose = overlay.querySelector(".close");

overlayClose.addEventListener("click", () => overlay.classList.remove("open"));

elAuth.addEventListener("click", event => {
  if (event.target && event.target.classList.contains("signInWithGoogle")) {
    firebase.auth().signInWithPopup(googleAuthProvider);
  }
});

elHeader.addEventListener("click", event => {
  if (event.target && event.target.classList.contains("deslogar")) {
    firebase.auth().signOut();
  }
});

elGallery.addEventListener("click", event => {
  if (event.target && event.target.tagName === "BUTTON") {
    const { src } = event.target.parentNode.parentNode.querySelector("img");
    overlayImage.src = src;
    overlay.classList.add("open");
  }
});

function renderApp(user) {
  renderHeader(user, elHeader);
  renderNav(null, elNav);
  renderGallery(null, elGallery);
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    elAuth.innerHTML = "";
    elAuth.classList.add("hidden");
    renderApp(user.uid);
  } else {
    renderAuth(null, elAuth);
    elAuth.classList.remove("hidden");
    elHeader.innerHTML = "";
    elGallery.innerHTML = "";
    elNav.innerHTML = "";
  }
});
