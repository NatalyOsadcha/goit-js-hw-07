import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener("click", onImgClick);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

let instance;

function onImgClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  instance = basicLightbox.create(
    `
    <img width='1280' height='900' src='${event.target.dataset.source}'>
`,
    { onShow, onClose }
  );
  instance.show();
}

function onShow(instance) {
  window.addEventListener("keydown", onEscKeyPress);
}

function onClose() {
  window.removeEventListener("keydown", onEscKeyPress);
}

function onEscKeyPress(event) {
  // console.log(event);
  if (event.code === "Escape") {
    instance.close();
  }
}
