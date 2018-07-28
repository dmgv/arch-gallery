import sprite from "../img/sprite.svg";

export default function renderHeader(user, element) {
  const el = element;
  const markup = `
  <div class="top-bar">
  <a href="/" class="link">Arch Gallery</a>
  <button class="deslogar">Deslogar</button>
  </div>

  <div class="box">
  <label for="menuCheckbox" class="checkbox-label menu-label">
    <svg class="svg-icon" viewBox="0 0 20 20">
        <use xlink:href="${sprite}#photoalbum"></use>
      </svg>
  </label>

  <div class="box__slider">
    <div class="slider__01">
      <h2>Album Name</h2>
      <p>Album description</p>
      <button class="white-text">Slide Show</button>
    </div>
    <div class="slider__02">
      <p class="search-text">Search Unsplash</p>
      <input type="text" placeholder="Digite alguma coisa" class="top-search" />
    </div>
  </div>

  <label for="searchCheckbox" class="checkbox-label search-label">
    <svg class="svg-icon" viewBox="0 0 20 20">
      <use xlink:href="${sprite}#search"></use>
    </svg>
  </label>
  </div>
  <div class="view-options">
  <button class="white-text">Rows</button>
  <button class="black-text">Columns</button>
  </div>
  `;
  el.innerHTML = markup;
}
