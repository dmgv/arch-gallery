import { database } from "./firebase";
import sprite from "../img/sprite.svg";

export default function renderNav(element) {
  const el = element;
  // * Lê Estado: Identidicador de usuário
  const uid = document.appState.get("uid");
  const returnArr = [];

  const albums = database.ref(`users/${uid}/albums/`);
  // TODO: Trocar on por once talvez resolva o problema do menu
  albums.once("value", snap => {
    snap.forEach(childSnap => {
      const item = childSnap.val();
      item.key = childSnap.key;
      returnArr.push(item);
    });

    // console.log("Array do menu", returnArr);

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
          it =>
            `<li data-key=${it.key}>${
              it.name
            } <button class="deleteAlbum">ⅹ</button></li>`,
        )}
      </ul>
      <button class="novoAlbum" data-user=${uid}>Novo Album</button>
    </div>
  `;
    el.innerHTML = markup;
  });
}
