import { database } from "./firebase";
import renderSelected from "./C-SelectedAlbum";

const elGallery = document.querySelector("main");

export default function addPhoto(photoId) {
  const uid = document.appState.get("uid");
  const albumId = document.appState.get("albumId");
  const albumPhotos = document.appState.get("albumPhotos");
  albumPhotos.push(photoId);
  database
    .ref(`users/${uid}/albums/${albumId}/fotos`)
    .set(albumPhotos)
    .then(() => renderSelected(elGallery));
  // const albuns = database.ref(`users/${uid}/albums/${albumId}/`);
  // albuns.once("value", snap => {
  //   let fotosExistentes = [];
  //   const teste = snap.val();
  //   fotosExistentes = teste.fotos;
  //   fotosExistentes.push(photoId);
  // });

  // document.appState.watch("fotosExistentes", (newState, oldState) => {
  //   console.log("O array de fotos é", newState);
  // });

  // console.log("Sera que retornou?", fotosExistentes);

  // .then(fotosExistentes =>
  //   database
  //     .ref(`users/${uid}/albums/${albumId}/fotos/`)
  //     .set(fotosExistentes),
  // );

  // const fotoanteriores = "";

  // const emptyAlbum = {
  //   Name: albumName,
  //   Fotos: [],
  // };
  // database.ref(`users/${uid}/albums/${albumId}/fotos/`).set({ "1": photoId });
  // ! códifo que funciona em baixo
  // database
  //   .ref(`users/${uid}/albums/${albumId}`)
  //   .child("fotos")
  //   .set(photoId);
}
