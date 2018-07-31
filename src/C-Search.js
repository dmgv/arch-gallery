import { toJson } from "unsplash-js";
import unsplash from "./unsplash";

function generateHTML(id) {
  const photoId = id;
  return `
  <div class="item">
    <img data-photoId="${photoId}" src="https://source.unsplash.com/${photoId}/1600x900" alt=""/>
    <div class="item__overlay">
      <button class="openPreview">View →</button>
      <button class="addToAlbum">Add →</button>
    </div>
  </div>
  `;
}

export default function renderSearch(searchTerm, albumID, element) {
  const el = element;
  const newArr = [];

  unsplash.search
    .photos(searchTerm, 1, 24)
    .then(toJson)
    .then(json => {
      json.results.map(photos => newArr.push(photos.id));
    })
    .then(() => {
      // TODO se não achar nada voltar h2
      const markup = newArr.map(generateHTML).join("");
      el.innerHTML = markup;
    });
}
