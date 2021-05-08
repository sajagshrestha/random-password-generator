const range = document.getElementById("length-range");
const number = document.getElementById("length-number");
const generateButton = document.querySelector(".generate-button");
const passwordContainer = document.querySelector(".generated-password");
const clipboard = document.querySelector(".clipboard");
//character code array
const UPPERCASE = genrateNumbersArray(65, 90);
const LOWERCASE = genrateNumbersArray(97, 122);
const NUMBERS = genrateNumbersArray(48, 57);
const SYMBOLS = genrateNumbersArray(34, 47).concat(genrateNumbersArray(58, 64));

//default password length
let passwordLength = 8;

//generate ASCII code array
function genrateNumbersArray(lowNumber, HighNumber) {
	let CharacterCodeArray = [];
	for (let i = lowNumber; i <= HighNumber; i++) {
		CharacterCodeArray.push(i);
	}

	return CharacterCodeArray;
}

//password generator function
function generatePassword(
	passwordLength,
	includeLowerCase,
	includeUppercase,
	includeNumbers,
	includeSymbols
) {
	let characterCodes = [];
	if (includeLowerCase) characterCodes = characterCodes.concat(LOWERCASE);
	if (includeUppercase) characterCodes = characterCodes.concat(UPPERCASE);
	if (includeNumbers) characterCodes = characterCodes.concat(NUMBERS);
	if (includeSymbols) characterCodes = characterCodes.concat(SYMBOLS);

	let password = "";
	for (let i = 0; i < passwordLength; i++) {
		let characterCode =
			characterCodes[Math.floor(Math.random() * characterCodes.length)];
		password += String.fromCharCode(characterCode);
	}

	return password;
}

//update password on dom
function updatePassword() {
	passwordLength = number.value;
	const includeUppercase = document.getElementById("uppercase").checked;
	const includeLowerCase = document.getElementById("lowercase").checked;
	const includeNumbers = document.getElementById("numbers").checked;
	const includeSymbols = document.getElementById("symbols").checked;
	passwordContainer.innerText = generatePassword(
		passwordLength,
		includeLowerCase,
		includeUppercase,
		includeNumbers,
		includeSymbols
	);
}
//copy password to clipboard
function copyToClipboard(string) {
	const element = document.createElement("textarea");
	element.value = string;
	document.body.appendChild(element);
	element.select();
	document.execCommand("copy");
	document.body.removeChild(element);
	alert("Password copied to clipboard!");
}

//bind range and number
range.value = number.value = passwordLength;

range.addEventListener("input", (e) => {
	number.value = e.target.value;
});

number.addEventListener("input", (e) => {
	let value = e.target.value;
	if (value > 20) {
		value = 20;
	}
	e.target.value = value;
	range.value = value;
});

//password generate on button click
generateButton.addEventListener("click", updatePassword);

//password generate on range slider
range.addEventListener("input", updatePassword);

//clipboard
clipboard.addEventListener("click", () =>
	copyToClipboard(passwordContainer.innerText)
);
