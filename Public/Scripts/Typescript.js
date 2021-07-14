"use strict";
const passwordResults = document.getElementById('Password_Generator_Results');
const rangeWindowResults = document.querySelector('.Results_Window');
const config_charactersLength = document.getElementById('Config_Characters');
const config_useNumbers = document.getElementById('Config_Numbers');
const config_useSymbols = document.getElementById('Config_Symbols');
const config_useLowercase = document.getElementById('Config_Lowercase');
const config_useUppercase = document.getElementById('Config_Uppercase');
const generateButton = document.querySelector('.Password_Generate_Button');
const symbols = '~!@#$%^&*()_+{}":?><;.,';
const lowercase_letters = 'abcdefghijklmnopqrstuvxyz';
const uppercase_letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
const numbers = "123456789";
config_charactersLength === null || config_charactersLength === void 0 ? void 0 : config_charactersLength.addEventListener('change', function (e) {
    if (rangeWindowResults)
        rangeWindowResults.value = e.target.value;
});
function getRandomNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}
function getRandomUppercase() {
    return uppercase_letters[Math.floor(Math.random() * uppercase_letters.length)];
}
function getRandomLowercase() {
    return lowercase_letters[Math.floor(Math.random() * lowercase_letters.length)];
}
function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}
function generatePassword() {
    const passwordLength = document.getElementById('Config_Characters').value;
    let generatedPassword = "";
    let usedFunctions = [];
    if (config_useNumbers.checked) {
        usedFunctions.push(getRandomNumber);
    }
    if (config_useSymbols.checked) {
        usedFunctions.push(getRandomSymbol);
    }
    if (config_useLowercase.checked) {
        usedFunctions.push(getRandomLowercase);
    }
    if (config_useUppercase.checked) {
        usedFunctions.push(getRandomUppercase);
    }
    for (let i = 0; i < parseInt(passwordLength); i++) {
        generatedPassword = generatedPassword + usedFunctions[Math.floor(Math.random() * usedFunctions.length)]();
    }
    if (passwordResults)
        passwordResults.innerHTML = generatedPassword;
}
generateButton.addEventListener('click', function () {
    generatePassword();
});
generatePassword();
