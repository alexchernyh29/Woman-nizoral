import { DATA } from "./data";

class Test {
	constructor() {
		this.data = DATA;
		this.results = this.data.results;
		this.questions = this.data.questions;

		this.$questionTitle = $(".test__title");
		this.$questionNumber = $(".test__number");
		this.$questionsContainer = $(".test__questions");

		this.$nextButton = $(".test__next");

		this.activeIndex = 0;
		this.answers = {
			A: 0,
			B: 0,
			C: 0,
			D: 0,
		};
		this.currentAnswer = null;
		this.enableNextQuestion = false;
	}

	init() {
		this.bindEvents();

		this.renderQuestion();
	}

	bindEvents() {
		this.$questionsContainer.on(
			"click",
			".test__question",
			this.handleOptionClick
		);

		this.$nextButton.on("click", this.handleNextClick);

		$(".answers__button").on("click", this.handleResetButtonClick);
	}

	handleNextClick = () => {
		this.answers[this.getLetterFromIndex(this.currentAnswer)] += 1;
		this.currentAnswer = null;
		this.activeIndex += 1;
		if (this.activeIndex >= this.questions.length) {
			this.renderResults();
		} else {
			this.renderQuestion();
			this.$nextButton.removeClass("enabled");
			this.enableNextQuestion = false;
		}
	};

	handleOptionClick = (e) => {
		const $target = $(e.currentTarget);

		this.currentAnswer = $target.index();
		this.answers[this.getLetterFromIndex(this.currentAnswer)] += 1;
		this.activeIndex += 1;
		if (window.ga) {
			console.log('ga("send", "event")', `quest_${this.activeIndex}`);
			ga("send", "event", `quest_${this.activeIndex}`);
			console.log(
				'ga("send", "event", "skaner", "Click")',
				this.getLetterFromIndex(this.currentAnswer)
			);
			ga(
				"send",
				"event",
				"skaner",
				"Click",
				this.getLetterFromIndex(this.currentAnswer)
			);
		}
		if (this.activeIndex >= this.questions.length) {
			if (window.ga) {
				console.log('ga("send", "event", "skaner", "Show", "result");');
				ga("send", "event", "skaner", "Show", "result");
			}
			this.renderResults();
		} else {
			this.renderQuestion();
			this.$nextButton.removeClass("enabled");
			this.enableNextQuestion = false;
		}
		this.currentAnswer = null;
	};

	handleResetButtonClick = () => {
		this.activeIndex = 0;
		this.answers = {
			A: 0,
			B: 0,
			C: 0,
			D: 0,
		};
		this.enableNextQuestion = false;

		$(".test").removeClass("hide");
		$(".scanner").removeClass("hide");
		$(".answers").removeClass("show");
		$(".footer").removeClass("show");

		this.renderQuestion();
	};

	getLetterFromIndex(letter) {
		switch (letter) {
			case 0:
				return "A";
			case 1:
				return "B";
			case 2:
				return "C";
			case 3:
				return "D";
		}
	}

	getIndexFromLetter(index) {
		switch (index) {
			case "A":
				return 0;
			case "B":
				return 1;
			case "C":
				return 2;
			case "D":
				return 3;
		}
	}

	renderQuestion() {
		const { title, answers } = this.questions[this.activeIndex];
		this.$questionsContainer.html("");

		this.$questionTitle.html(title);

		this.$questionNumber.html(
			`${this.activeIndex + 1}/${this.questions.length}`
		);

		answers.forEach((item, i) => {
			this.$questionsContainer.append(`
				<div class="test__question">
					<span class="test__letter">${this.getLetterFromIndex(i)}</span>
					<p class="test__text">${item}</p>
				</div>
			`);
		});
	}

	renderResults() {
		let maxVal = 0;
		let index = "";
		let letter = "";
		for (let key in this.answers) {
			if (this.answers[key] > maxVal) {
				maxVal = this.answers[key];
				index = this.getIndexFromLetter(key);
				letter = key;
			}
		}

		$(".test").addClass("hide");
		$(".scanner").addClass("hide");
		$(".answers").addClass("show");
		$(".footer").addClass("show");

		$(".answers__caption").html(`Больше ответов ${letter}`);
		$(".answers__text").html(this.results[index]);
		$("html, body").animate(
			{
				scrollTop: $(".answers").offset().top,
			},
			500
		);
		$(".sharing__link").each((i, item) => {
			$(item).attr(
				"data-url",
				`https://hairclub.woman.ru/share/${index + 1}/`
			);
		});
	}
}

export default Test;
