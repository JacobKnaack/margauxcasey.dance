'use strict';

const images = [
  'gregoire_big_fuzz.jpg',
  'gregoire_blur.jpg',
  'gregoire_clear.jpg',
  'gregoire_hiding.jpg',
];

const currentImages = [];
let imageContainers = ['image1', 'image2'];

function generateImage() {
  const index = Math.floor(Math.random() * images.length);
  const image = images[index];
  if (!currentImages.includes(image)) {
    return image;
  } else {
    return generateImage();
  }
}

function switchImages(imageContainers) {
  imageContainers.forEach((container) => {
    const image = generateImage();
    currentImages.pop();
    currentImages.push(image);
    container.style.backgroundImage = `url(assets/images/${generateImage()})`;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  imageContainers = imageContainers.map(id => document.getElementById(id));

  setInterval(() => switchImages(imageContainers), 5000);
});
