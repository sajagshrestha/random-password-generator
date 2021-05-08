const range = document.getElementById("length-range");
const number = document.getElementById("length-number");
const generateButton = document.querySelector(".generate-button");
const passwordContainer = document.querySelector(".generated-password");

//character code array
const UPPERCASE = genrateNumbersArray(65, 90);
const LOWERCASE = genrateNumbersArray(97, 122);
const NUMBERS = genrateNumbersArray(48, 57);
const SYMBOLS = genrateNumbersArray(34, 47).concat(genrateNumbersArray(58, 64));

//default password lenght
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
	includeSymbol,
	includeNumber
) {
	let characterCodes = [];
	if (includeLowerCase) characterCodes = characterCodes.concat(LOWERCASE);
	if (includeUppercase) characterCodes = characterCodes.concat(UPPERCASE);
	if (includeNumber) characterCodes = characterCodes.concat(NUMBERS);
	if (includeSymbol) characterCodes = characterCodes.concat(SYMBOLS);

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
	const includeNumber = document.getElementById("number").checked;
	const includeSymbol = document.getElementById("symbols").checked;
	passwordContainer.innerHTML = generatePassword(
		passwordLength,
		includeLowerCase,
		includeUppercase,
		includeNumber,
		includeSymbol
	);
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

//password generate on button button
generateButton.addEventListener("click", updatePassword);

//password generate on range slider
range.addEventListener("input", updatePassword);
