const getRandomNum = () => Math.floor(Math.random() * 447 + 1);

function generateHTML() {
  return `
  <div class="item">
    <img src="https://source.unsplash.com/collection/762960/${getRandomNum()}" alt=""/>
    <div class="item__overlay">
      <button>View →</button>
    </div>
  </div>
  `;
}

export default function renderAuth(user, element) {
  const el = element;
  const mockArray = Array.from({ length: 16 });

  const markup = mockArray.map(generateHTML).join("");
  el.innerHTML = markup;
}
