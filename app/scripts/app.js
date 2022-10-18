import $ from "jquery";
import WOW from "wowjs";
import Test from "./test";

$(() => {
	const wow = new WOW.WOW({
		live: false,
		boxClass: "wow",
	});
	const test = new Test();

	wow.init();
	test.init();

	$(".banner__link").on("click", function () {
		$("html, body").animate(
			{
				scrollTop: $(".scanner").offset().top,
			},
			500
		);
	});

	$(".expert__photo")
		.add(".expert__subs")
		.on("click", function () {
			$(this).parent().find(".expert__letter").toggleClass("disable");
		});

	$(".banner__question").on("click", function () {
		const index = $(this).index();
		let $destination;

		switch (index) {
			case 0:
				$destination = $(".stories__story_1 .card");
				break;
			case 1:
				$destination = $(".stories__story_3 .card");
				break;
			case 2:
				$destination = $(".stories__story_5 .card");
				break;
			case 3:
				$destination = $(".stories__story_4 .card");
				break;
		}
		$("html, body").animate(
			{
				scrollTop: $destination.offset().top,
			},
			500
		);
	});
});
