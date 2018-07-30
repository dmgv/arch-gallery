import Unsplash, { toJson } from "unsplash-js";
import { firebase, googleAuthProvider } from "./firebase";
import renderAuth from "./C-Auth";
import renderHeader from "./C-Header";
// import renderGallery from "./C-Gallery";
import renderNav from "./C-Nav";
import renderSearch from "./C-Search";
import renderSelected from "./C-SelectedAlbum";
import createAlbum from "./create-album";
import fire from "./fire";

// Unsplash
const unsplash = new Unsplash({
  applicationId:
    "efd484b440b57d735fc2c58372fe8171d557b0f5181b961b7ac7a9615cf13930",
  secret: "152302794c0a8fff6f9f70e4087edfd5801aef22f01721d59995841e0c3fc561",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob",
});

// Get page elements
const elAuth = document.querySelector("#auth");
const elHeader = document.querySelector("header");
const elNav = document.querySelector("nav");
const elGallery = document.querySelector("main");
const overlay = document.querySelector(".overlay");
const overlayImage = overlay.querySelector("img");
const overlayClose = overlay.querySelector(".close");
const btnCreateAlbum = document.querySelector(".btnCreateAlbum");
const inpCreateAlbum = document.querySelector(".create-album input");
const btnCloseCreateAlbum = document.querySelector(".btnCloseCreateAlbum");
const createAlbumPop = document.querySelector(".create-album");
const menuCheck = document.getElementById("menuCheckbox");

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

/*eslint-disable */
elHeader.addEventListener("keypress", ev => {
  if (!ev) ev = window.event;
  const keyCode = ev.keyCode || ev.which;

  if (ev.target.value.length > 2) {
    if (keyCode == "13") {
      unsplash.search
        .photos(ev.target.value, 1, 12)
        .then(toJson)
        .then(json => {
          renderSearch(json, elGallery);
        });
    }
  }
  return false;
});
/* eslint-enable */

elHeader.addEventListener("focusout", event => {
  const ev = event;
  if (event.target && event.target.tagName === "INPUT") {
    ev.target.value = "";
  }
  return false;
});

elGallery.addEventListener("click", event => {
  if (event.target && event.target.tagName === "BUTTON") {
    const { src } = event.target.parentNode.parentNode.querySelector("img");
    overlayImage.src = src;
    overlay.classList.add("open");
  }
});

elNav.addEventListener("click", event => {
  if (event.target && event.target.tagName === "LI") {
    const albumId = event.target.getAttribute("data-key");
    const user = event.target.getAttribute("data-user");
    renderSelected(user, albumId, elGallery);
  }
  if (event.target && event.target.classList.contains("novoAlbum")) {
    createAlbumPop.classList.add("open");
    menuCheck.checked = false;
  }
});

btnCreateAlbum.addEventListener("click", () => {
  if (inpCreateAlbum.value) {
    const { uid } = firebase.auth().currentUser;

    createAlbum(uid, inpCreateAlbum.value);
    createAlbumPop.classList.remove("open");
    renderNav(uid, elNav);
    // TODO Gerar a busca no C-Search
    // renderSearch(inpCreateAlbum.value, elGallery)
  }
});

btnCloseCreateAlbum.addEventListener("click", () => {
  menuCheck.checked = true;
  createAlbumPop.classList.remove("open");
});

//
function renderApp(user) {
  renderHeader(user, elHeader);
  renderNav(user, elNav);
  // renderGallery(user, elGallery);
  // renderSelected(user, elGallery);
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    elAuth.innerHTML = "";
    elAuth.classList.add("hidden");
    renderApp(user.uid);
    fire(user.uid);
  } else {
    renderAuth(null, elAuth);
    elAuth.classList.remove("hidden");
    elHeader.innerHTML = "";
    elGallery.innerHTML = "";
    elNav.innerHTML = "";
  }
});
