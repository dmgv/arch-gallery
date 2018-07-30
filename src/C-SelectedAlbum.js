import { database } from "./firebase";

function generateHTML(id) {
  const photoId = id;
  return `
  <div class="item">
    <img src="https://source.unsplash.com/${photoId}/1600x900" alt=""/>
    <div class="item__overlay">
      <button>View →</button>
    </div>
  </div>
  `;
}

export default function renderSelected(user, albumId, element) {
  const el = element;
  const uid = user;
  const aid = albumId;

  const albums = database.ref(`users/${uid}/albums/${aid}`);
  albums.on("value", snap => {
    const albumInfo = snap.val();
    if (albumInfo.Fotos) {
      const markup = albumInfo.Fotos.map(generateHTML).join("");
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
