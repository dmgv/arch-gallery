import Unsplash, { toJson } from "unsplash-js";
import { firebase, googleAuthProvider } from "./firebase";
import renderAuth from "./C-Auth";
import renderHeader from "./C-Header";
import renderGallery from "./C-Gallery";
import renderNav from "./C-Nav";
import renderSearch from "./C-Search";

// Unsplash
const unsplash = new Unsplash({
  applicationId:
    "efd484b440b57d735fc2c58372fe8171d557b0f5181b961b7ac7a9615cf13930",
  secret: "152302794c0a8fff6f9f70e4087edfd5801aef22f01721d59995841e0c3fc561",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob",
});

// unsplash.photos
//   .listPhotos(2, 24, "latest")
//   .then(toJson)
//   .then(json => {
//     console.log(json);
//   });

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

  if (event.target && event.target.classList.contains("testUnsplash")) {
    unsplash.search
      .photos("dogs", 1)
      .then(toJson)
      .then(json => {
        renderSearch(json, elGallery);
      });
  }
});

/*eslint-disable */
elHeader.addEventListener("keypress", ev => {
  if (!ev) ev = window.event;
  const keyCode = ev.keyCode || ev.which;

  if (keyCode == "13") {
    unsplash.search
      .photos(ev.target.value, 1, 12)
      .then(toJson)
      .then(json => {
        renderSearch(json, elGallery);
      });
  }
});
/* eslint-enable */

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
