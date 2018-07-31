import { database } from "./firebase";
import renderSelected from "./C-SelectedAlbum";

const elGallery = document.querySelector("main");

export default function addPhoto(photoId, divitem) {
  const uid = document.appState.get("uid");
  const albumId = document.appState.get("albumId");
  const albumPhotos = document.appState.get("albumPhotos");
  albumPhotos.push(photoId);
  // ! Altera Estado: Identificador do album
  document.appState.set("albumPhotos", albumPhotos);
  database
    .ref(`users/${uid}/albums/${albumId}/fotos`)
    .set(albumPhotos)
    .then(() => divitem.classList.add("added"));
}

// database
//     .ref(`users/${uid}/albums/${albumId}/fotos`)
//     .set(albumPhotos)
//     .then(() => renderSelected(elGallery))
//     .then(() => {
//       divitem.classList.add("added");
//     });
