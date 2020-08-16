import "../styles/preloader.scss"

let loadCompleted = false;

export function initPreloader(onFinishedCallback?: () => void) {
    const progressBarElem = document.querySelector(".preloader-bar-fill") as HTMLElement;

    if (document.readyState === "complete") {
        finishLoading()
    } else {
        // Remove the loader when the page is fully loaded.
        window.addEventListener("load", () => {
            finishLoading();
        });

        // Fake progress updates for two seconds and then forcefully remove the loader
        // disregards if the page is fully loaded or not.
        {
            const maxLoadTime = 2000;
            const progressSteps = 10;
            const updateInterval = maxLoadTime / progressSteps;
            let progressStepCounter = 0;
            const onProgressUpdateTick = () => {
                if (loadCompleted) return;

                progressStepCounter++;
                progressBarElem.style.width = progressStepCounter * (100 / progressSteps) + "%";

                if (progressStepCounter > progressSteps) {
                    finishLoading();
                } else {
                    window.setTimeout(onProgressUpdateTick, updateInterval);
                }
            }
            window.setTimeout(onProgressUpdateTick, updateInterval);
        }
    }

    function finishLoading() {
        if (loadCompleted) return;
        loadCompleted = true;

        progressBarElem.style.width = "100%";

        const siteContentElem = document.querySelector(".site-content") as HTMLElement;
        siteContentElem.style.display = "block";

        const preloaderElem = document.querySelector(".preloader-overlay");
        preloaderElem.classList.add("gone");
        setTimeout(() => {
            preloaderElem.remove();
        }, 500);

        onFinishedCallback?.();
    }
}