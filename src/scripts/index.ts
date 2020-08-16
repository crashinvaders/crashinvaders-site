import * as preloader from "./preloader"
import "./responsive-content"
import "./image-cycler"
import * as aos from "./aos-views"

preloader.initPreloader(() => {
    aos.initialize();
});
