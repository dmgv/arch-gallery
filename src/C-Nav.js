import sprite from "../img/sprite.svg";

export default function renderNav(user, element) {
  const el = element;
  const markup = `
  <label for="menuCheckbox" class="checkbox-label side-menu-label">
  <svg class="svg-icon" viewBox="0 0 20 20">
    <use xlink:href="${sprite}#close"></use>
  </svg>
</label>
<div class="menu-content">
  <h3 class="list-header">Albums</h3>
  <ul class="options-list">
    <li>Beach</li>
    <li>Europe</li>
    <li>North America</li>
    <li>Brazil</li>
    <li>Cars</li>
  </ul>
  <!-- <h3 class="list-header">Explore</h3>
  <ul class="options-list">
    <li>Popular</li>
    <li>New comers</li>
  </ul> -->
  <button class="novoAlbum">Novo Album</button>
</div>
  `;
  el.innerHTML = markup;
}
