var React = window.React = require('react'),
	ReactDOM = require("react-dom");

// node in ui where the communism is cadsgfakl;k;
var theThingHolderMajig = $("#app")[0];

// import various paginas
var IndexPagina = require("./pagina/index");

// set up the route
var Router = require('react-router').Router
var Route = require('react-router').Route
var browserHistory = require('react-router').browserHistory

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={IndexPagina}>

		</Route>
	</Router>
), theThingHolderMajig)
