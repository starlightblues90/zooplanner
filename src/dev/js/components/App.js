import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import DatePage from './datepage.js'
import Main from './main.js'
import Document from './document.js'
import 'regenerator-runtime/runtime';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setPage} from '../actions/AppActions';
import {importAnimals, importExhibits, importRestrooms, importDailyPrograms, importAttractions} from '../actions/tripActions';


class App extends Component {
	constructor(props) {
		super();
		this.closeOverlay = this.closeOverlay.bind(this);
	}

	closeOverlay() {
		this.props.setPage("main")
	}

	renderOverlay() { //later change this so it passes in a parameter ie: date, searchbyanimal, preplan... then use it for the switch statement
		switch(this.props.page) {
			case 'date': return <DatePage onClick={this.closeOverlay} />
			case 'main': return <Main />
			case 'document': return <Document/>
			default: return <div></div>
		}
	}

	componentWillMount() {
		if (this.props.tripHash !== "") {
			this.props.importAnimals();
			this.props.importExhibits();
			this.props.importRestrooms(this.props.restrooms);
			this.props.importDailyPrograms();
			this.props.importAttractions();
		}
	}


	render () {
		return (
			<div className='App'>
			    <div id='overlay'>
					{this.renderOverlay()}
			    </div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		page: state.App.page,
		tripHash: state.trip.tripHash,
		restrooms: state.restrooms.restrooms
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		setPage: setPage,
		importAnimals: importAnimals,
		importExhibits: importExhibits,
		importRestrooms: importRestrooms,
		importDailyPrograms: importDailyPrograms,
		importAttractions: importAttractions,
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);