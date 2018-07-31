import sprite from "../img/sprite.svg";

export default function renderHeader(element) {
  const el = element;
  const markup = `
  <div class="top-bar">
    <button class="night-mode">
      <svg class="svg-icon" viewBox="0 0 20 20">
        <use xlink:href="${sprite}#brightness3"></use>
      </svg>
    </button>
    <a href="/" class="link">ARCH GALLERY</a>
    <button class="deslogar">
      <svg class="svg-icon" viewBox="0 0 20 20">
        <use xlink:href="${sprite}#exit"></use>
      </svg>
    </button>
  </div>

  <div class="box">
  <label for="menuCheckbox" class="checkbox-label menu-label">
    <svg class="svg-icon" viewBox="0 0 20 20">
        <use xlink:href="${sprite}#photoalbum"></use>
      </svg>
  </label>

  <div class="box__slider">
    <div class="slider__01">
      <h2>← Nenhum Album Selecionado</h2>
      <button class="white-text testUnsplash">Slide Show</button>
    </div>
    <div class="slider__02">
      <p class="search-text">Search Unsplash</p>
      <input type="text" placeholder="Aperte enter" class="top-search" />
    </div>
  </div>

  <label for="searchCheckbox" class="checkbox-label search-label">
    <svg class="svg-icon" viewBox="0 0 20 20">
      <use xlink:href="${sprite}#search"></use>
    </svg>
  </label>
  </div>
  <!-- <div class="view-options">
  <button class="white-text">Rows</button>
  <button class="black-text">Columns</button>
  </div> -->
  `;
  el.innerHTML = markup;
}
