type ElementEntry = {
	element: Element,
	regularContent: string,
	shortContent: string
}

const responsiveEntries = Array<ElementEntry>();
let wasWideLayout = true;

const responsiveElements = document.querySelectorAll("[data-short-text]");
for (let i = 0; i < responsiveElements.length; i++) {
	const element = responsiveElements[i];
	const shortContent = element.getAttribute("data-short-text");
	const regularContent = element.innerHTML;
	const entry: ElementEntry = {
		element: element,
		regularContent: regularContent,
		shortContent: shortContent,
	};
	responsiveEntries.push(entry);
}

function updateResponsiveContent() {
	const docWidth = document.body.scrollWidth;
	const isWideLayout = docWidth > 600;
	if (wasWideLayout === isWideLayout) return;

	wasWideLayout = isWideLayout;
	for (let i = 0; i < responsiveEntries.length; i++) {
		const entry = responsiveEntries[i];
		entry.element.innerHTML = isWideLayout ?
			entry.regularContent :
			entry.shortContent;
	}
}
window.addEventListener("resize", updateResponsiveContent);
updateResponsiveContent();