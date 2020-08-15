import * as preloader from "./preloader"
import * as aos from "./aos-views"
import "./responsive-content"
import "./image-cycler"

preloader.startPreloading(() => {
    aos.initialize();
});