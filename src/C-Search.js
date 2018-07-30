import { toJson } from "unsplash-js";
import unsplash from "./unsplash";

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

export default function renderSearch(searchTerm, element) {
  const el = element;
  const newArr = [];

  unsplash.search
    .photos(searchTerm, 1, 12)
    .then(toJson)
    .then(json => {
      json.results.map(photos => newArr.push(photos.id));
    })
    .then(() => {
      const markup = newArr.map(generateHTML).join("");
      el.innerHTML = markup;
    });
}
