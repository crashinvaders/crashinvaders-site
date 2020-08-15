import * as resourceListRaw from "../generated/image-index.json"
//@ts-ignore
const resourceList = resourceListRaw as string[];

export function startPreloading(onFinishedCallback: () => void) {
    const progressBarElem = document.querySelector(".preloader-bar-fill") as HTMLElement;

    const preload = Preload();
    preload.onprogress = (event) => {
        progressBarElem.style.width = event.progress + "%";
    }
    preload.fetch(resourceList).then(() => {
        finishLoading();
    }).catch(error => {
        console.log("PRELOADER ERROR: " + error);
        finishLoading();
    });

    function finishLoading() {
        const siteContentElem = document.querySelector(".site-content") as HTMLElement;
        siteContentElem.style.display = "block";

        const preloaderElem = document.querySelector(".preloader-overlay");
        preloaderElem.classList.add("gone");
        setTimeout(() => {
            preloaderElem.remove();
        }, 500);

        onFinishedCallback();
    }
}