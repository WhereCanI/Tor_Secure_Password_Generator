const Koa = require('koa');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const serve = require('koa-static');
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
    await ctx.render('PasswordGenerator');
});

app.use(router.routes());

app.listen(7005, () => console.log("Password Generator server - Running."));