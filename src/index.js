const getRandomNum = () => Math.floor(Math.random() * 447);

function generateHTML() {
  return `
  <a href="">
    <img src="https://source.unsplash.com/collection/762960/${getRandomNum()}" alt=""/>
  </a>
  `;
}

const gallery = document.querySelector("main");
const digits = Array.from({ length: 16 });
const html = digits.map(generateHTML).join("");
gallery.innerHTML = html;
