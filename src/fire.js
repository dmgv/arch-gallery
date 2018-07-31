/*eslint-disable */
import uuid from "uuid";
import { database } from "./firebase";

const data = {
  name: "Airplnes",
  fotos: {
    "0": "IMued0tpO1s",
    "1": "oRcLA7SeyEM",
    "2": "Fk35BtkRO7g",
    "3": "kQCCKi9OI1Y",
    "4": "TWwoeGoDb84",
    "5": "h7WxFNO3MNY",
    "6": "CCFO0O_LTSY",
    "7": "25_Xh97TiqM",
    "8": "4tiL9nhRsu4",
    "9": "UOJ6vz2khrY",
    "10": "bUtzPrCMj8Q",
    "11": "bSJuLUZLUm4",
  },
};
const data2 = {
  name: "Cars",
  fotos: [
    "aTX_bRaOZnA",
    "h8UQV31X5AI",
    "m3m-lnR90uM",
    "3ZUsNJhi_Ik",
    "vw0AmpZvHZg",
    "N9Pf2J656aQ",
    "FG1h_fj9WHc",
    "yXmjBxvkoG4",
    "gts_Eh4g1lk",
    "aFxSh_l4fbY",
    "YApS6TjKJ9c",
    "dJtrvPGe4Ww",
  ],
};

export default function fire(user) {
  // ! create an album
  const uid = user;
  const albumId = uuid();
  // console.log("dentro da funcção", uid);
  database.ref(`users/${uid}/albums/${albumId}/`).set(data);

  // const createAlbum = uid => {
  //   const albumId = uuid();
  //   database.ref(`users/${uid}/albums/${albumId}/`).set(data);
  // };
  // createAlbum();
  //  ! Recurando os albums
  // const albums = database.ref(
  //   `users/${uid}/albums/6ddec37d-c449-48c7-a296-1911059f5fca/`,
  // );
  // albums.on("value", snap => {
  //   const albumInfo = snap.val();
  //   console.log("O album é ", albumInfo);
  //   console.log(albumInfo.Name);
  // });
}
