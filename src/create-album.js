import uuid from "uuid";
import { database } from "./firebase";

export default function createAlbum(uid, albumName) {
  const albumId = uuid();
  const emptyAlbum = {
    Name: albumName,
    Fotos: [],
  };
  database.ref(`users/${uid}/albums/${albumId}/`).set(emptyAlbum);
}
