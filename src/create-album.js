import uuid from "uuid";
import { database } from "./firebase";
import renderNav from "./C-Nav";

const elNav = document.querySelector("nav");

export default function createAlbum(uid, albumName) {
  const albumId = uuid();
  const emptyAlbum = {
    Name: albumName,
    Fotos: [],
  };
  database
    .ref(`users/${uid}/albums/${albumId}/`)
    .set(emptyAlbum)
    .then(() => renderNav(uid, elNav));
}
