const passwordResults = document.getElementById('Password_Generator_Results');
const rangeWindowResults = (<HTMLInputElement>document.querySelector('.Results_Window'));
const config_charactersLength = (<HTMLInputElement>document.getElementById('Config_Characters'));
const config_useNumbers = (<HTMLInputElement>document.getElementById('Config_Numbers'));
const config_useSymbols = (<HTMLInputElement>document.getElementById('Config_Symbols'));
const config_useLowercase = (<HTMLInputElement>document.getElementById('Config_Lowercase'));
const config_useUppercase = (<HTMLInputElement>document.getElementById('Config_Uppercase'));
const generateButton = (<HTMLButtonElement>document.querySelector('.Password_Generate_Button'));

const symbols : string = '~!@#$%^&*()_+{}":?><;.,';
const lowercase_letters : string = 'abcdefghijklmnopqrstuvxyz';
const uppercase_letters : string = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
const numbers : string = "123456789";

// CHECK AND ADD VALUE TO RANGE WINDOW RESULTS
config_charactersLength?.addEventListener('change', function(e) {
    if (rangeWindowResults)
        rangeWindowResults.value = (<HTMLInputElement>e.target).value;
});

function getRandomNumber() : string {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getRandomUppercase() : string {
    return uppercase_letters[Math.floor(Math.random() * uppercase_letters.length)];
}

function getRandomLowercase() : string {
    return lowercase_letters[Math.floor(Math.random() * lowercase_letters.length)];
}

function getRandomSymbol() : string {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() : void {
    const passwordLength = (<HTMLInputElement>document.getElementById('Config_Characters')).value;
    let generatedPassword : string = "";
    let usedFunctions = [];

    if (config_useNumbers.checked) {
        usedFunctions.push(getRandomNumber);
    } if (config_useSymbols.checked) {
        usedFunctions.push(getRandomSymbol);
    } if (config_useLowercase.checked) {
        usedFunctions.push(getRandomLowercase);
    } if (config_useUppercase.checked) {
        usedFunctions.push(getRandomUppercase);
    }

    for (let i = 0; i < parseInt(passwordLength); i++) {
        generatedPassword = generatedPassword + usedFunctions[Math.floor(Math.random() * usedFunctions.length)]();
    }

    if (passwordResults)
        passwordResults.innerHTML = generatedPassword;
}

generateButton.addEventListener('click', function() : void {
    generatePassword();
});

generatePassword();