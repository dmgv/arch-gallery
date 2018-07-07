document.addEventListener("DOMContentLoaded", () => {
  const viewRows = document.querySelector("#view-mode-row");
  viewRows.addEventListener("click", () => {
    const gallery = document.querySelector("main");
    gallery.classList.toggle("rows");
  });
  const darkMode = document.querySelector("#mode-select");

  darkMode.addEventListener("click", () => {
    const appBody = document.body;
    // const appBody = document.getElementsByTagName("BODY")[0];
    // const appBody = document.querySelectorAll("BODY");
    appBody.classList.toggle("dark-mode");
  });
});

// const numItemsToGenerate = 8; // how many gallery items you want on the screen
// const imageWidth = 480; // your desired image width in pixels
// const imageHeight = 480; // desired image height in pixels
// const collectionID = 1163637; // the collection ID from the original url

// function renderGalleryItem() {
//   fetch(
//     `https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/`,
//   ).then(response => {
//     const galleryItem = document.createElement("div");
//     galleryItem.classList.add("gallery-item");
//     galleryItem.innerHTML = `
//       <img class="gallery-image" src="${response.url}" alt="gallery image"/>
//     `;
//     document.body.appendChild(galleryItem);
//   });
// }
// for (let i = 0; i < numItemsToGenerate; i++) {
//   renderGalleryItem();
// }
