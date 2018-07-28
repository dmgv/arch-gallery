export default function renderAuth(user, element) {
  const el = element;
  const markup = `
    <h1>Arch Gallery <small><button class="signInWithGoogle">Sign in with Google</button></small></h1>

    <div class="slideshow">
      <div class="slideshow-image" style="background-image: url('https://source.unsplash.com/category/nature/1600x1400')"></div>
      <div class="slideshow-image" style="background-image: url('https://source.unsplash.com/category/buildings/1600x1400')"></div>
      <div class="slideshow-image" style="background-image: url('https://source.unsplash.com/category/food/1600x1400')"></div>
      <div class="slideshow-image" style="background-image: url('https://source.unsplash.com/category/technology/1600x1400')"></div>
    </div>
  `;
  el.innerHTML = markup;
}
