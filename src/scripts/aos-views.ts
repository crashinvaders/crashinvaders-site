import * as AOS from "aos"
import "aos/dist/aos.css"

export function initialize() {
    // Make all the feature items to appear on scroll.
    document.querySelectorAll("div.feature-item")
        .forEach(element => {
            element.setAttribute("data-aos", "fade-up");
            element.setAttribute("data-aos-offset", "-100");
            element.setAttribute("data-aos-delay", "200");
        });
    document.querySelectorAll("img.thumb-icon")
        .forEach(element => {
            element.setAttribute("data-aos", "fade-up");
            element.setAttribute("data-aos-delay", "150");
        });

    // Initialize AOS library.
    AOS.init();
};
