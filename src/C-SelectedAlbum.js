import { database } from "./firebase";

function generateHTML(id) {
  const photoId = id;
  return `
  <div class="item">
    <img src="https://source.unsplash.com/${photoId}/1600x900" alt=""/>
    <div class="item__overlay">
    <button class="openPreview">View →</button>
    </div>
  </div>
  `;
}

export default function renderSelected(element) {
  const el = element;
  const uid = document.appState.get("uid");
  const albumId = document.appState.get("albumId");

  const albums = database.ref(`users/${uid}/albums/${albumId}`);
  albums.once("value", snap => {
    const albumInfo = snap.val();
    // TODO: Se não tiver fotos setar albumPhotos para zero
    if (albumInfo.fotos) {
      // ! Altera Estado: Array com as fotos;
      document.appState.set("albumPhotos", albumInfo.fotos);
      const markup = albumInfo.fotos.map(generateHTML).join("");
      el.innerHTML = markup;
    } else {
      // ! Altera Estado: Array com as fotos;
      document.appState.set("albumPhotos", []);
      const markup = "<h2>Não tem foto da uma pesquisada</h2>";
      el.innerHTML = markup;
    }
  });
}
