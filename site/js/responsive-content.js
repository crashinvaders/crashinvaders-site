/*jslint browser: true*/
/*global $, jQuery, alert*/

function updateResponsiveContent() {
	var docWidth = $(document).width();
	if (docWidth > 600) {
		$("#section-title-our-games").html('Check out our games:');
	} else {
		$("#section-title-our-games").html('Our Games:');
	}
}

window.addEventListener("resize", updateResponsiveContent);
window.addEventListener("load", updateResponsiveContent);