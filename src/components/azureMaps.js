// Copyright (c) Microsoft. All rights reserved.

import React, {
  Component
} from 'react';

const insideCameraBounds = require('point-in-polygon');

const AzureMaps = window.atlas;

export class AzureMap extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!this.map && this.props.azureMapsKey) {
      this.initializeMap(this.props.azureMapsKey);
    }

    if (this.map) {
      this.updateMap('Shuttle', this.props.vehicleLocation);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.map && nextProps.azureMapsKey) {
      this.initializeMap(nextProps.azureMapsKey);
    }
  }

  componentWillUnmount() {
    // Clean up the azure map resources on unmount
    if (this.map) this.map.remove();
  }

  shouldComponentUpdate(nextProps) {
    this.updateMap('Shuttle', nextProps.vehicleLocation);
    return false;
  }

  initializeMap(azureMapsKey) {

    this.map = new AzureMaps.Map('map', {
      'subscription-key': azureMapsKey,
      zoom: 11,
      center:  [ -122.3320708, 47.606 ]
    });
    console.log("map created!");
    //this.map.addIcon('bus-image', this.refs.testImage);

    // this.map.addEventListener('load', () => {
    //   if (isFunc(this.props.onMapReady)) {
    //     this.props.onMapReady(this.map);
    //   }
    // });
  }

  updateMap() {
    if (this.map) {
      let vehicles = this.props.vehicles;
      var pins = [];
      vehicles.forEach(vehicle => {
        var mapPoint = new AzureMaps.data.Point([
          vehicle.location.longitude,
          vehicle.location.latitude
        ]);

        var mapPin = new AzureMaps.data.Feature(mapPoint, {
          icon: 'pin-red',
          title: vehicle.id
        });
        pins.push(mapPin);
      });
      this.map.addPins(pins, {
        textFont: "SegoeUi-Bold",
        textOffset: [0, -20],
        fontColor: "#000",
        fontSize: 14,
        iconSize: 1,
        name: "shuttles-layer",
        overwrite: true
      });
    }
  }

  setMapCamera(location) {
    var cameraBounds = this.map.getCamera().bounds;
    const point1 = [cameraBounds[1], cameraBounds[0]];
    var point2 = [cameraBounds[1], cameraBounds[2]];
    var point3 = [cameraBounds[3], cameraBounds[0]];
    var point4 = [cameraBounds[3], cameraBounds[2]];
    const cameraBoundsPolygon = [point1, point2, point3, point4];
    const isVehicleInside = insideCameraBounds([location.latitude, location.longitude], cameraBoundsPolygon);
    if (!isVehicleInside) {
      let c = this.map.getCamera();
      c.center = [
        location.longitude,
        location.latitude
      ];
      this.map.setCamera(c);
    }
  }

  render() {
    return <div id = "map" > </div>;
  }
}