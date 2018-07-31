import uuid from "uuid";
import { database } from "./firebase";
import renderNav from "./C-Nav";
import renderSearch from "./C-Search";

const elGallery = document.querySelector("main");

const elNav = document.querySelector("nav");

export default function createAlbum(albumName) {
  const albumId = uuid();
  const uid = document.appState.get("uid");
  // ! Altera Estado: Identificador do album
  document.appState.set("albumId", albumId);
  // ! Altera Estado: Array com as fotos;
  document.appState.set("albumPhotos", []);
  // ! Altera Estado: Nome do album
  document.appState.set("albumName", albumName);
  const emptyAlbum = {
    name: albumName,
    fotos: [],
  };
  database
    .ref(`users/${uid}/albums/${albumId}/`)
    .set(emptyAlbum)
    .then(() => renderNav(elNav))
    .then(() => {
      renderSearch(albumName, albumId, elGallery);
    });
}
