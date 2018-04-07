import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {removeFromTrip, updateTrip, addToTrip} from '../actions/tripActions'
import Reorder, { reorder } from 'react-reorder';

class Trip extends Component {

    convertToArray(object) {
		var result = Object.keys(object).map(function(key) {
			return [Number(key), object[key]];
		});
		return result;
    }
    removeFromTrip(item) {
        this.props.removeFromTrip(item);
    }

    onReorder (event, previousIndex, nextIndex, fromId, toId) {
        const newTrip = reorder(this.props.trip, previousIndex, nextIndex);
        this.props.updateTrip(newTrip);
    }

    dragAlert() {
        alert("you can now drag to move around")
    }

    // componentWillMount() {
    //     console.log("add animals to glossary")
    // }

    // componentDidMount() {
    //     var hash = window.location.hash.substring(23);
    //     if (hash !== "") {

    //     }
    // }
    
    render() {
        var listItem = <p></p>
        console.log(this.props.trip ,this.props.trip.length, "MY TRIP")
        
        if (this.props.importAnimalsPending == true) {
            listItem= (
                <div className='row' id='emptyTripContainer'>
                    <p id='emptyTripText'>loading...</p>
                </div>
            );   
        }
        else {
            if (this.props.trip.length === 0) {
                listItem= (
                    <div className='row' id='emptyTripContainer'>
                        <p id='emptyTripText'>You have not added anything yet <br/><br/><br/> Need help planning?<br/> See pre-planned trips</p>
                    </div>
                );   
            } else if (this.props.trip.length < 2) {
                let passedList = this.convertToArray(this.props.trip);
                listItem = passedList.map((item) => {
                    item = item[1];
                    return (
                        <div className='simpleItem' key={item.title}>
                            <div className="row">
                                <div className="col-3" id="itemImage">
                                    <a href="#" alt={item.title}><img alt={item.title} src={item.image}/></a>
                                </div>
                                <div className='col-8' id="itemInfo">
                                    <button type="button" title='REMOVE' className="btn btn-remove" onClick={() => this.removeFromTrip(item)}><i className="glyphicon glyphicon-remove"></i></button>
                                    <a id='itemName' alt={item.title} href="#" title={item.title}>{item.title.replace(/&#039;/g, "'")}</a>
                                    <br/>
                                    <p id="itemLocation">{item.exhibit_name.replace(/&#039;/g, "'")}</p>
                                </div>
                            </div>
                        </div>
                    )
                });
            } else {
                // if (this.props.trip.length == 2) {
                //     this.dragAlert();
                // }
                let passedList = this.convertToArray(this.props.trip);

                listItem = <Reorder
                                reorderId="my-list" 
                                placeholderClassName="placeholder"
                                draggedClassName="dragged"
                                lock="horizontal"
                                onReorder={this.onReorder.bind(this)} // Callback when an item is dropped (you will need this to update your state)
                                autoScroll={true}
                                placeholder={
                                    <div className="simpleItemShadow" /> // Custom placeholder element (optional), defaults to clone of dragged element
                                }
                            >
                                
                                {passedList.map((item) => {
                                    item = item[1];
                                    var itemLocation;
                                    if (item.exhibit_name === null) {
                                        itemLocation = <p id="itemLocation"></p>
                                    } else {
                                        itemLocation = <p id="itemLocation">{item.exhibit_name.replace(/&#039;/g, "'")}</p>
                                    }
                                    return (
                                        <div className='simpleItemTrip' key={item.title}>
                                            <div className="row">
                                                <div className="col-3" id="itemImage">
                                                    <a href="#" alt={item.title}><img alt={item.title} src={item.image}/></a>
                                                </div>
                                                <div className='col-8' id="itemInfo">
                                                    <button type="button" title='REMOVE' className="btn btn-remove" onClick={() => this.removeFromTrip(item)}><i className="glyphicon glyphicon-remove"></i></button>
                                                    <a id='itemName' alt={item.title} href="#" title={item.title}>{item.title.replace(/&#039;/g, "'")}</a>
                                                    <br/>
                                                    {itemLocation}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </Reorder>
            }
        }
        return (
            <div id="tripList">
                {listItem}
            </div>   
        )
    }
}

function mapStateToProps(state) {
    return {
        trip: state.trip.trip,
        importAnimalsPending: state.trip.importAnimalsPending,
    }
}
function matchDispatchToProps(dispatch) {
	return bindActionCreators({
        // expandAnimal: expandAnimal,
        removeFromTrip: removeFromTrip,
        updateTrip: updateTrip,
        addToTrip: addToTrip,
	}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Trip);