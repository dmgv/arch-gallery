import { database } from "./firebase";

export default function addPhoto(photoId, divitem) {
  const uid = document.appState.get("uid");
  const albumId = document.appState.get("albumId");
  const albumPhotos = document.appState.get("albumPhotos");
  const addedPhotoArr = [...albumPhotos, photoId];
  // ! Altera Estado: Identificador do album

  database
    .ref(`users/${uid}/albums/${albumId}/fotos`)
    .set(addedPhotoArr)
    .then(() => document.appState.set("albumPhotos", addedPhotoArr))
    .then(() => divitem.classList.add("added"));
}

// database
//     .ref(`users/${uid}/albums/${albumId}/fotos`)
//     .set(albumPhotos)
//     .then(() => renderSelected(elGallery))
//     .then(() => {
//       divitem.classList.add("added");
//     });
