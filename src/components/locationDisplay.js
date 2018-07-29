import React, { Component } from 'react';

export class LocationDisplay extends Component {
    constructor(props) {
        super(props);
    }
    render() {
       return  <h3> Current Location: <strong> {this.props.vehicleLocation} </strong></h3>
    }
}