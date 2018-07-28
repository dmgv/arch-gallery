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

//
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

//
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
