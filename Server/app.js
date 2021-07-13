const Koa = require('koa');
const helmet = require('koa-helmet');
const serve = require('koa-static');
const path = require('path');
const render = require('koa-ejs');
const app = new Koa();
const KoaRouter = require('koa-router');
const router = new KoaRouter();

app.proxy = true;
app.use(helmet());
app.use(serve('.'));

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

router.get("/about", async ctx => {
    await ctx.render('AboutUsPage');
});

app.use(router.routes());

app.listen(7005, () => console.log("Password Generator server - Running."));