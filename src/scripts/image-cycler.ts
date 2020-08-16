/*
 * Applies image cycler functionality to every DIV element with "cycler" class and "data-thumb-cycle-images" attribute.
 * data-thumb-cycle-images should contain a coma separated array of image paths (at least one value).
 */

import "../styles/image-cycler.scss"

const ImageClasses = {
    BASE: "thumb-image",
    INACTIVE: "inactive",
}

document.querySelectorAll("div.cycler[data-thumb-cycle-images]").forEach((rootElem: HTMLElement, rootElemIdx: number) => {
    const rawImageArray = rootElem.dataset.thumbCycleImages;
    const imageArray = rawImageArray.split(",").map(value => value.trim());

    if (imageArray.some(value => value.length === 0)) {
        console.error("Empty image path is illegal " + rootElem);
        return;
    }
    if (imageArray.length === 0) {
        console.error("No thumb cycle image data is provided for " + rootElem);
        return;
    }
    if (imageArray.length === 1) {
        const imgElem = document.createElement("img");
        imgElem.className = ImageClasses.BASE
        imgElem.src = imageArray[0];
        rootElem.appendChild(imgElem);
        return;
    }

    let currentImageIdx = 0;

    let imgElemActive = document.createElement("img");
    imgElemActive.classList.add(ImageClasses.BASE);
    imgElemActive.src = imageArray[currentImageIdx];
    rootElem.appendChild(imgElemActive);
    let imgElemInactive = document.createElement("img");
    imgElemInactive.classList.add(ImageClasses.BASE, ImageClasses.INACTIVE);
    rootElem.appendChild(imgElemInactive);

    function swapImage() {
        currentImageIdx = (currentImageIdx + 1) % imageArray.length;

        imgElemActive.classList.add(ImageClasses.INACTIVE);
        imgElemInactive.classList.remove(ImageClasses.INACTIVE);
        imgElemInactive.src = imageArray[currentImageIdx];

        const tmp = imgElemActive;
        imgElemActive = imgElemInactive;
        imgElemInactive = tmp;
    }

    setTimeout(() => setInterval(swapImage, 3000), 250 * rootElemIdx);

    //// Preload all the images in background.
    //imageArray.forEach(imgUrl => fetch(imgUrl))
})