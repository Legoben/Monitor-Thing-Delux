var React = window.React = require('react'),
	ReactDOM = require("react-dom");

// node in ui where the communism is cadsgfakl;k;
var theThingHolderMajig = $("#app-container")[0];

// import various paginas
var IndexPagina = require("./pagina/index");

var SelectLocation = require("./pagina/selectLocation");
var SelectLocationOnMap = require("./pagina/selectLocationOnMap");

var ListATMs = require("./pagina/listATMs");
var ATMDestinationMap = require("./pagina/ATMDestinationMap");

var RouteMap = require("./pagina/routeMap");

// set up the route
var Router = require('react-router').Router
var Route = require('react-router').Route
var browserHistory = require('react-router').browserHistory

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={IndexPagina} />

		<Route path="/select-location" component={SelectLocation} />
		<Route path="/select-location-map" component={SelectLocationOnMap} />

		<Route path="/atm-list" component={ListATMs} />
		<Route path="/atm-map" component={ATMDestinationMap} />
	</Router>
), theThingHolderMajig)
