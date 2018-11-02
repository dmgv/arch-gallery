import { database } from "./firebase";
import renderSelected from "./C-SelectedAlbum";

const elGallery = document.querySelector("main");

export default function removePhoto(photoId) {
  const uid = document.appState.get("uid");
  const albumId = document.appState.get("albumId");
  const albumPhotos = document.appState.get("albumPhotos");

  const newArr = albumPhotos.filter(id => id !== photoId);

  // ! Altera Estado: Identificador do album
  document.appState.set("albumPhotos", newArr);
  database
    .ref(`users/${uid}/albums/${albumId}/fotos`)
    .set(newArr)
    .then(renderSelected(elGallery));
}
