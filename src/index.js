const rows = document.querySelector(".rows");
const columns = document.querySelector(".columns");

rows.addEventListener("click", () => {
  rows.classList.toggle("active");
});

columns.addEventListener("click", () => {
  columns.classList.toggle("active");
});

// const janela = () => {
//   console.log("clicou");
// };

function janela() {
  console.log("clicou");
}
