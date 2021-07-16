const Koa = require('koa');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const serve = require('koa-static');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const render = require('koa-ejs');
const app = new Koa();
const KoaRouter = require('koa-router');
const router = new KoaRouter();

app.proxy = true;
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(serve('.'));
app.use(cors());
app.use(json());
app.use(bodyParser({ enableTypes:['json', 'form', 'text']}));

// RENDERS HTML PAGES
render(app, {
    root: path.join(__dirname, '../Website'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: false,
});

// ROUTES
router.get("/", async ctx => {
    await ctx.render('PasswordGenerator', { generatedPassword: "" });
});

router.post("/generatePassword", async ctx => {
    const { config_passwordLength, config_useNumbers, config_useSymbols, config_useLowercase, config_useUppercase } = ctx.request.body;
    const generatedPassword = await generatePassword(config_passwordLength, config_useNumbers, config_useSymbols, config_useLowercase, config_useUppercase);
    await ctx.render('PasswordGenerator', { generatedPassword: generatedPassword });
});

app.use(router.routes());

const symbols = '~!@#$%^&*()_+{}":?><;.,';
const lowercase_letters = 'abcdefghijklmnopqrstuvxyz';
const uppercase_letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
const numbers = "123456789";

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

function generatePassword(config_passwordLength, config_useNumbers, config_useSymbols, config_useLowercase, config_useUppercase) {
    let generatedPassword = "";
    let usedFunctions = [];

    if (config_useNumbers) {
        usedFunctions.push(getRandomNumber);
    } if (config_useSymbols) {
        usedFunctions.push(getRandomSymbol);
    } if (config_useLowercase) {
        usedFunctions.push(getRandomLowercase);
    } if (config_useUppercase) {
        usedFunctions.push(getRandomUppercase);
    }

    for (let i = 0; i < parseInt(config_passwordLength); i++) {
        generatedPassword = generatedPassword + usedFunctions[Math.floor(Math.random() * usedFunctions.length)]();
    }

    if (generatedPassword.length > 1)
        return generatedPassword;
}

app.listen(7005, () => console.log("Password Generator server - Running."));