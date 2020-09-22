import React, {Component} from 'react';
import { feature } from 'topojson-client';
import axios from 'axios';
import { geoKavrayskiy7 } from 'd3-geo-projection';
import { geoGraticule, geoPath } from 'd3-geo';
import { select as d3Select } from 'd3-selection';
import { WORLD_MAP_URL } from "../constant";
import { Spin } from 'antd';

const width = 960;
const height = 600;

class WorldMap extends Component {
    constructor(){
        super();
        this.state = {
            map: null,
        }
        this.refMap = React.createRef();
    }

    componentDidMount() {
        axios.get(WORLD_MAP_URL)
            .then(res => {
                const { data } = res;
                const land = feature(data, data.objects.countries).features;
                this.generateMap(land);
            })
            .catch(e => console.log('err in fecth world map data ', e))
    }

    generateMap(land){
        const projection = geoKavrayskiy7()
            .scale(170)
            .translate([width / 2, height / 2])
            .precision(.1);

        const graticule = geoGraticule();
        console.log(graticule());

        const canvas = d3Select(this.refMap.current)
            .attr("width", width)
            .attr("height", height);

        let context = canvas.node().getContext("2d");

        let path = geoPath()
            .projection(projection)
            .context(context);

        land.forEach(ele => {
            // draw the countries
            context.fillStyle = '#B3DDEF';
            context.strokeStyle = '#000';
            context.globalAlpha = 0.7;
            context.beginPath();
            path(ele);
            context.fill();
            context.stroke();
        })

        for (let temp = 1; temp < 15; temp++) {
          // draw the graticule
          context.strokeStyle = 'rgba(220, 220, 220, 0.5)';
          context.beginPath();
          path(graticule());
          context.lineWidth = 0.5;
          context.stroke();


          // draw the graticule outline
          context.beginPath();
          context.lineWidth = 0.7;
          path(graticule.outline());
          context.stroke();
        }
    }

    render() {
        return (
            <div className="map-box">
                <canvas className="map" ref={this.refMap} />
                <canvas className="track" ref={this.props.refTrack}/>
                <div className="hint"></div>
                {
                    this.props.loading ?
                    <Spin tip="Loading..." /> : <></>
                }
            </div>
        );
    }
}

export default WorldMap;