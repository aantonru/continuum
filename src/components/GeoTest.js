import React from 'react'
import GoogleMapGeoPicker from 'react-geo-picker/lib/google-map';

const shanghai = {
    latitude: 31.1094,
    longitude: 121.4114,
};

export const googleMapApiKey = 'AIzaSyAfcp4NLIW115eDyTYeEMpPIEQBI4RXrgs';

class BasicDemo extends React.Component {
    state = {
      location: shanghai,
    };
  
    onLocationChange = (location) => this.setState({
      location: {
        ...this.state.location,
        ...location,
      }
    });
  
    handleLatitudeChange = (event) => this.onLocationChange({
      latitude: Number(event.target.value),
    });
  
    handleLongitudeChange = (event) => this.onLocationChange({
      longitude: Number(event.target.value),
    });
  
    render() {
      const { location } = this.state;
  
      return (
        <div>
          <h2>Basic Demo</h2>
          <div className="input-control">
            <label>Latitude:</label>
            <input
              className="input"
              type="number"
              step="0.0000001"
              min={-90}
              max={90}
              value={location.latitude}
              onChange={this.handleLatitudeChange}
            />
          </div>
          <div className="input-control">
            <label>Latitude:</label>
            <input
              className="input"
              type="number"
              step={0.0000001}
              min={-180}
              max={180}
              value={location.longitude}
              onChange={this.handleLongitudeChange}
            />
          </div>
          <GoogleMapGeoPicker apiKey={googleMapApiKey} value={location} onChange={this.onLocationChange} />
        </div>
      )
    }
  }
  
  export default BasicDemo;