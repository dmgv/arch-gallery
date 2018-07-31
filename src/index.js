import { firebase, googleAuthProvider } from "./firebase";
import createStore from "./simple.store";
import renderAuth from "./C-Auth";
import renderHeader from "./C-Header";
import renderNav from "./C-Nav";
import renderSearch from "./C-Search";
import renderSelected from "./C-SelectedAlbum";
import createAlbum from "./create-album";
// import albumAtivo from "./album-ativo";
import addPhoto from "./add-photo";
// import unsplash from "./unsplash";
// import fire from "./fire";
// import { toJson } from "unsplash-js";
// import renderGallery from "./C-Gallery";
//

/**
|--------------------------------------------------
| State Maneger
|--------------------------------------------------
*/

const myState = createStore();
// * Can be access thoroughout the entire aplication
document.appState = myState;

/**
|--------------------------------------------------
| Get DOM nodes
|--------------------------------------------------
*/

// * Main components
const elAuth = document.querySelector("#auth");
const elHeader = document.querySelector("header");
const elNav = document.querySelector("nav");
const elGallery = document.querySelector("main");
// * Gallery and lightbox
const overlay = document.querySelector(".overlay");
const overlayImage = overlay.querySelector("img");
const overlayClose = overlay.querySelector(".close");
// * App actions
const btnCreateAlbum = document.querySelector(".btnCreateAlbum");
const inpCreateAlbum = document.querySelector(".create-album input");
const btnCloseCreateAlbum = document.querySelector(".btnCloseCreateAlbum");
const createAlbumPop = document.querySelector(".create-album");
// * Miscellaneous
const menuCheck = document.getElementById("menuCheckbox");
overlayClose.addEventListener("click", () => overlay.classList.remove("open"));

/**
|--------------------------------------------------
| Event Delegators
|--------------------------------------------------
*/

// *
// * Auth - Login and Logout
// *
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

// *
// * Search
// *
elHeader.addEventListener("keypress", event => {
  let ev = event;
  if (!ev) ev = window.event;
  const keyCode = ev.keyCode || ev.which;

  if (ev.target.value.length > 1) {
    /* eslint-disable eqeqeq */
    if (keyCode == "13") {
      if (document.appState.get("albumName")) {
        renderSearch(ev.target.value, null, elGallery);
      } else {
        document.querySelector(".top-search").value =
          "Selecione um album antes";
        document.querySelector(".top-search").style = "color:#BF373B";
        setTimeout(() => {
          document.querySelector(".top-search").value = "";
          document.querySelector(".top-search").style = "color:#2b2b2b";
        }, 900);
      }
    } /* eslint-enable eqeqeq */
  }
  return false;
});

elHeader.addEventListener("focusout", event => {
  const ev = event;
  if (event.target && event.target.tagName === "INPUT") {
    ev.target.value = "";
  }
  return false;
});

// *
// * Gallery
// *
elGallery.addEventListener("click", event => {
  // * Abre o "lightbox" da imagem
  if (event.target && event.target.classList.contains("openPreview")) {
    const { src } = event.target.parentNode.parentNode.querySelector("img");
    overlayImage.src = src;
    overlay.classList.add("open");
  }
  // * Botão de adicionar foto ao album -> chama a funcção
  if (event.target && event.target.classList.contains("addToAlbum")) {
    const divItem = event.target.parentNode.parentNode;
    const photoId = event.target.parentNode.parentNode
      .querySelector("img")
      .getAttribute("data-photoId");
    addPhoto(photoId, divItem);
  }
});

// *
// * Side Menu
// *

// * Renderiza a galeria escolhida
elNav.addEventListener("click", event => {
  if (event.target && event.target.tagName === "LI") {
    // ! Altera Estado: Identificador do album
    document.appState.set("albumId", event.target.getAttribute("data-key"));
    // ! Altera Estado: Nome do album
    document.appState.set("albumName", event.target.innerHTML);
    renderSelected(elGallery);
  }

  // * Abre modal para criar album
  if (event.target && event.target.classList.contains("novoAlbum")) {
    createAlbumPop.classList.add("open");
    menuCheck.checked = false;
  }
});

// * Cria de fato o novo album
btnCreateAlbum.addEventListener("click", () => {
  if (inpCreateAlbum.value) {
    createAlbum(inpCreateAlbum.value);
    createAlbumPop.classList.remove("open");
    inpCreateAlbum.value = "";
  }
});

// * Feacga modal para cria no album
btnCloseCreateAlbum.addEventListener("click", () => {
  menuCheck.checked = true;
  createAlbumPop.classList.remove("open");
});

// *
// * Iniciar a aplicação
// *
function renderApp() {
  renderHeader(elHeader);
  renderNav(elNav);
  // renderGallery(user, elGallery);
  // renderSelected(user, elGallery);
}

/* eslint-disable no-console */
document.appState.watch("albumName", newState => {
  document.querySelector(".slider__01 h2").innerHTML = newState;
});

document.appState.watch("uid", newState => {
  console.log("O valor do uid é:", newState);
});

document.appState.watch("albumId", newState => {
  console.log("O id do album é:", newState);
});

document.appState.watch("albumPhotos", newState => {
  console.log("O array de fotos é:", newState);
});
document.appState.watch("albumName", newState => {
  console.log("O nome do album é:", newState);
});
/* eslint-disable no-console */

/**
|--------------------------------------------------
| Autentica usuário no Firebase
|--------------------------------------------------
*/
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    elAuth.innerHTML = "";
    elAuth.classList.add("hidden");
    // ! Altera Estado: Identificador do usuário
    document.appState.set("uid", user.uid);
    renderApp();
    // fire(user.uid);
  } else {
    // * Eliminas componentes da aplicação e mostra apenas login
    renderAuth(null, elAuth);
    elAuth.classList.remove("hidden");
    elHeader.innerHTML = "";
    elGallery.innerHTML = "";
    elNav.innerHTML = "";
  }
});
