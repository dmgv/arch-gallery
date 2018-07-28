export default function renderAuth(user, element) {
  const el = element;
  const markup = `
    <h2>Arch Gallery</h2>
    <button class="signInWithGoogle">Sign in with Google</button>
  `;
  el.innerHTML = markup;
}
