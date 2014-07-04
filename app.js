'use strict';

var http    = require( 'http' );
var express = require( 'express' );
var app     = express();

var exphbs    = require( 'express3-handlebars' );

// getting main controller for routes
var mainController = require( './controllers/main' );

// configure express
express.static.mime.define( { 'application/x-font-woff': [ 'woff' ] } );
express.static.mime.define( { 'application/x-font-ttf': [ 'ttf' ] } );
express.static.mime.define( { 'application/vnd.ms-fontobject': [ 'eot' ] } );
express.static.mime.define( { 'font/opentype': [ 'otf' ] } );
express.static.mime.define( { 'image/svg+xml': [ 'svg' ] } );
app.use( express.compress() ); // gzipping
app.set( 'port', process.env.PORT || 3000 ); //setting port

//put in CAS middleware here

// Configuring view engine
app.engine('hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs',
	helpers: {}//,
	//partialsDir: __dirname +'/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname +'/views');

// serving static content
app.use( express.static( __dirname + '/public' ) );

// Emulating RESTful app
app.use( express.methodOverride() );
app.use( express.cookieParser() );

// use express session middleware
// user authentication and secrets can be stored in a session.
if( false  ){
	var vcap = JSON.parse(process.env.VCAP_SERVICES);

	//Production session storage.
	//This session storage can also be used locally if you have redis(or session storage db) running locally.
	app.use(express.session({
		store: new RedisStore({
			host: vcap.redis[0].credentials.host,
			port: vcap.redis[0].credentials.port,
			db: vcap.redis[0].name,
			pass: vcap.redis[0].credentials.password
		}),
		secret: 'boilerplateSessionSecret',
		key: 'boilerplate'
	}));
} else {
	//This is session storage for developement.
	//This can not be used in production code because express uses browser cookie storage by default.
	app.use(express.session({
		store: new express.session.MemoryStore(),//Browser cookie storage
		secret: 'mysecret!',
		key: 'mykey!'
	}));
}

// routing for application
mainController( app );

// start server
var server = app.listen(app.get('port'), function() {
	console.log( 'Application listening to port:', app.get( 'port' ));
});