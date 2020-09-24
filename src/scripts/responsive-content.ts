type ElementEntry = {
	element: Element,
	regularContent: string,
	shortContent: string
}

const responsiveEntries = Array<ElementEntry>();
let wasWideLayout = true;

document.querySelectorAll("[data-short-text]").forEach(element => {
	const shortContent = element.getAttribute("data-short-text");
	const regularContent = element.innerHTML;
	const entry: ElementEntry = {
		element: element,
		regularContent: regularContent,
		shortContent: shortContent,
	};
	responsiveEntries.push(entry);
});

function updateResponsiveContent() {
	const docWidth = document.body.scrollWidth;
	const isWideLayout = docWidth > 600;
	if (wasWideLayout === isWideLayout) return;

	wasWideLayout = isWideLayout;
	responsiveEntries.forEach(entry => {
		entry.element.innerHTML = isWideLayout ?
			entry.regularContent :
			entry.shortContent;
	})
}
window.addEventListener("resize", updateResponsiveContent);
updateResponsiveContent();