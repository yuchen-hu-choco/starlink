import React, {Component} from 'react';
import { List, Avatar, Button, Checkbox, Spin, InputNumber } from 'antd';
import Satellite from "../assets/images/Satellite.svg";

class SatelliteList extends Component {
    constructor(){
        super();
        this.state = {
            duration: 0,
        }
    }


    onChange = e => {
        const { dataInfo, checked } = e.target;
        this.props.onSelectionChange(dataInfo, checked);
    }

    onChangeDuration = (value) => {
        this.setState({
            duration: value
        })
    }

    render() {
        const satList = this.props.satInfo ? this.props.satInfo.above : [];
        
        return (
            <div className="sat-list-box">
                <Button 
                    className="sat-list-btn"
                    size="large"
                    disabled={this.props.disableTrack}
                    onClick={() => this.props.trackOnclick(this.state.duration)}
                >
                            Track on the map
                </Button>
                <div className="list-item">
                    <label>Track Duration </label>
                    <InputNumber
                        min={0}
                        max={90}
                        defaultValue={0}
                        style={{margin: "0 2px"}}
                        onChange={this.onChangeDuration}
                    />
                </div>
                <hr/>
                {
                    this.props.loading ?
                    <Spin tip="Loading Satellites..." /> :
                    <List
                        className="sat-list"
                        itemLayout="horizontal"
                        size="small"
                        dataSource={satList}
                        renderItem={item => (
                            <List.Item
                                actions={[<Checkbox dataInfo={item} onChange={this.onChange}/>]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar size={50} src={Satellite} />}
                                    title={<p>{item.satname}</p>}
                                    description={`Launch Date: ${item.launchDate}`}
                                />
    
                            </List.Item>
                        )}
                    />
                }
            </div>
        );
    }
}

export default SatelliteList;