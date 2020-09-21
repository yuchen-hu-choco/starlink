import React, {Component} from 'react';
import SatSetting from './SatSetting';
import SatelliteList from './SatelliteList';
import { NEARBY_SATELLITE, STARLINK_CATEGORY, SAT_API_KEY } from '../constant';
import Axios from 'axios';

class Main extends Component {
    constructor(){
      super();
      this.state = {
      }
    }

    showNearbySatellite = (setting) => {
      this.fetchSatellite(setting);
    }

    fetchSatellite = (setting) => {
      const {observerLat, observerLong, observerAlt, radius} = setting;
      const url = `${NEARBY_SATELLITE}/${observerLat}/${observerLong}/${observerAlt}/${radius}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;

      Axios.get(url)
          .then(response => {
              this.setState({
                  satInfo: response.data,
              })
          })
          .catch(error => {
              console.log('err in fetch satellite -> ', error);
          })
    }

    render() {
        return (
          <div className='main'>
            <div className="left-side">
              <SatSetting onShow={this.showNearbySatellite} />
              <SatelliteList satInfo={this.state.satInfo}  />
            </div>
            <div className="right-side">
              right
            </div>
          </div>
        );
    }
}
export default Main;