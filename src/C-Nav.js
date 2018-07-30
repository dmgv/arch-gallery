import { database } from "./firebase";
import sprite from "../img/sprite.svg";

export default function renderNav(user, element) {
  const el = element;
  const uid = user;
  const returnArr = [];
  const albums = database.ref(`users/${uid}/albums/`);
  albums.on("value", snap => {
    snap.forEach(childSnap => {
      const item = childSnap.val();
      item.key = childSnap.key;
      returnArr.push(item);
    });
    const markup = `
    <label for="menuCheckbox" class="checkbox-label side-menu-label">
  <svg class="svg-icon" viewBox="0 0 20 20">
    <use xlink:href="${sprite}#close"></use>
  </svg>
</label>
<div class="menu-content">
  <h3 class="list-header">Albums</h3>
  <ul class="options-list">
  ${returnArr.map(
    it => `<li data-key=${it.key} data-user=${user}>${it.Name}</li>`,
  )}
  </ul>
  <!-- <h3 class="list-header">Explore</h3>
  <ul class="options-list">
    <li>Popular</li>
    <li>New comers</li>
  </ul> -->
  <button class="novoAlbum" data-user=${user}>Novo Album</button>
</div>
  `;
    el.innerHTML = markup;
  });
}
