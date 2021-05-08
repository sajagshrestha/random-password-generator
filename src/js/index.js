const range = document.getElementById("length-range");
const number = document.getElementById("length-number");
const generateButton = document.querySelector(".generate-button");
let passwordLength = 8;

function generatePassword(length) {
	document.querySelector(".generated-password").innerHTML = length;
}

//bind range and number
range.value = number.value = passwordLength;

range.addEventListener("input", (e) => {
	number.value = e.target.value;
	passwordLength = e.target.value;
});

number.addEventListener("input", (e) => {
	let value = e.target.value;
	if (value > 20) {
		value = 20;
	}
	if (value < 8) {
		value = 8;
	}

	e.target.value = value;
	passwordLength = value;
	range.value = value;
});

generateButton.addEventListener("click", () =>
	generatePassword(passwordLength)
);
