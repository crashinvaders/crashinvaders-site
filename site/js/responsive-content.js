var responsiveEntries = [];
var wideLayout = undefined;

var responsiveElements = document.querySelectorAll("[data-short-text]");
for (var i = 0; i < responsiveElements.length; i++) {
	var element = responsiveElements[i];
	var shortContent = element.getAttribute("data-short-text");
	var regularContent = element.innerHTML;
	var entry = {
		element: element,
		regularContent: regularContent,
		shortContent: shortContent,
	};
	responsiveEntries.push(entry);
	// console.log("Responsive element registered: ");
	// console.log(element);
}


function updateResponsiveContent() {
	var docWidth = document.body.scrollWidth;
	var localWideLayout = docWidth > 600;
	if (wideLayout === localWideLayout) return;

	wideLayout = localWideLayout;
	for (var i = 0; i < responsiveEntries.length; i++) {
		var entry = responsiveEntries[i];
		entry.element.innerHTML = wideLayout ?
			entry.regularContent :
			entry.shortContent;
	}
}
window.addEventListener("resize", updateResponsiveContent);
updateResponsiveContent();




// if (wideLayout) {
// 	$("#section-title-our-games").html("Our Games");
// 	$("#section-title-commercial").html("Commercial Projects");
// 	$("#section-title-jams").html("Game Jams & Hackathons");
// 	$("#section-title-tools").html("Tools and Libraries");
// } else {
// 	$("#section-title-our-games").html("Our Games");
// 	$("#section-title-commercial").html("Commercial");
// 	$("#section-title-jams").html("Game Jams");
// 	$("#section-title-tools").html("Tools & Libs");
// }