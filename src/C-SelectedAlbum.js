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
  albums.on("value", snap => {
    const albumInfo = snap.val();
    // TODO: Se não tiver fotos setar albumPhotos para zero
    // console.log(albumInfo);
    // console.log("Valor de albumInfo:", albumInfo.fotos);
    // console.log("verdade:", !Array.isArray(albumInfo.fotos));
    // if (!Array.isArray(albumInfo.fotos)) {
    //   const markup = generateHTML(albumInfo.foto);
    //   el.innerHTML = markup;
    // }
    if (albumInfo.fotos) {
      // ! Altera Estado: Array com as fotos;
      document.appState.set("albumPhotos", albumInfo.fotos);
      const markup = albumInfo.fotos.map(generateHTML).join("");
      el.innerHTML = markup;
    } else {
      const markup = "<h2>Não tem foto da uma pesquisada</h2>";
      el.innerHTML = markup;
    }
  });

  // const imgList = data;
  // const newArr = [];
  // imgList.results.map(photos => newArr.push(photos.id));
  // const markup = newArr.map(generateHTML).join("");
}

// const albums = database.ref(
//   `users/${uid}/albums/6ddec37d-c449-48c7-a296-1911059f5fca/`,
// );
// albums.on("value", snap => {
//   const albumInfo = snap.val();
//   console.log("O album é ", albumInfo);
//   console.log(albumInfo.Name);
// });
