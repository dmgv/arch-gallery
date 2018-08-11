import { database } from "./firebase";
import renderSelected from "./C-SelectedAlbum";

const elGallery = document.querySelector("main");

export default function removePhoto(photoId) {
  const uid = document.appState.get("uid");
  const albumId = document.appState.get("albumId");
  const albumPhotos = document.appState.get("albumPhotos");

  // console.log("Vai apagar a foto", photoId);

  const newArr = albumPhotos.filter(id => {
    if (id !== photoId) {
      return true;
    }
    return false;
  });

  // ! Altera Estado: Identificador do album
  document.appState.set("albumPhotos", newArr);
  database
    .ref(`users/${uid}/albums/${albumId}/fotos`)
    .set(newArr)
    // .then(() => divitem.classList.add("removed"))
    .then(renderSelected(elGallery));
}
