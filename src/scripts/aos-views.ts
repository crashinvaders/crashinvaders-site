// Make all the feature items to appear on scroll.
document.querySelectorAll("div.feature-item")
    .forEach(element => element.setAttribute("data-aos", "fade-up"));
document.querySelectorAll("img.thumb-icon")
    .forEach(element => {
        element.setAttribute("data-aos", "fade-up");
        element.setAttribute("data-aos-delay", "150");
    });

// Initialize AOS library.
//@ts-ignore
AOS.init();
