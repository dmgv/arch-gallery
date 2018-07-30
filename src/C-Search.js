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

export default function renderSearch(data, element) {
  const el = element;
  const imgList = data;
  const newArr = [];

  imgList.results.map(photos => newArr.push(photos.id));
  const markup = newArr.map(generateHTML).join("");
  el.innerHTML = markup;
}
