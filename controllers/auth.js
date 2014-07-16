'use strict';

var _      = require( 'underscore' );
var common = require( '../lib/common' );

module.exports = function( server, passport ) {

	// process the login form
	server.route('/login')
		.get(function( req, res ){
			res.render( 'login', {layout: 'external', title: 'Login'} );
		})
		.post(passport.authenticate('local-login', {
			successRedirect : '/', // redirect to the secure profile section
			failureRedirect : '/login' // redirect back to the signup page if there is an error
		}));

	// process the signup form
	server.route('/signup')
		.get(function( req, res){
			res.render( 'signup', {layout: 'external', title: 'login'} );
		})
		.post(passport.authenticate('local-signup', {
			successRedirect : '/', // redirect to the secure profile section
			failureRedirect : '/signup' // redirect back to the signup page if there is an error
		}));

	//logout of the application
	server.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// send to facebook to do the authentication
	server.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	server.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/',
			failureRedirect : '/welcome'
		}));

};