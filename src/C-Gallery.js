const getRandomNum = () => Math.floor(Math.random() * 447);

function generateHTML() {
  return `
  <a href="">
    <img src="https://source.unsplash.com/collection/762960/${getRandomNum()}" alt=""/>
  </a>
  `;
}

export default function renderAuth(user, element) {
  const el = element;
  const mockArray = Array.from({ length: 16 });

  const markup = mockArray.map(generateHTML).join("");
  el.innerHTML = markup;
}
