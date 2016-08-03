/*jslint browser: true*/
/*global $, jQuery, alert*/

function updateResponsiveContent() {
	var docWidth = $(document).width();
	if (docWidth > 600) {
		$("#section-title-our-games").html('Check out our games');
		$("#section-title-commercial").html('Commercial projects');
		$("#section-title-experiments").html('Experiments and other');
	} else {
		$("#section-title-our-games").html('Our Games');
		$("#section-title-commercial").html('Commercial');
		$("#section-title-experiments").html('Experiments');
	}
}

window.addEventListener("resize", updateResponsiveContent);
window.addEventListener("load", updateResponsiveContent);