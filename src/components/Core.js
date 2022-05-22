import React, { Component } from 'react';
import { connect } from 'react-redux';
import { photosSearch, photosClear } from './actions/photos';
import { store } from '../index';
import './Core.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; 
import GoogleMapGeoPicker from 'react-geo-picker/lib/google-map';
import InfiniteScroll from "react-infinite-scroll-component";
import MyAuth from './MyAuth';
import { waitForElement } from '@testing-library/react';

//import * as nsfwjs from 'nsfwjs'
//import VK, { Auth } from "react-vk";
//import { reduxForm, Field } from 'redux-form';
//import LocationPicker from 'react-location-picker';
//import MapboxGeoPicker from 'react-geo-picker/lib/mapbox';
//import createGoogleMapGeoPicker from 'react-geo-picker/lib/forms/redux-form/createGoogleMapGeoPicker';
//import MapboxGeoPicker from 'react-geo-picker/lib/mapbox';



//const GoogleMapGeoPicker = createGoogleMapGeoPicker({ formName });
const googleMapApiKey = 'AIzaSyAfcp4NLIW115eDyTYeEMpPIEQBI4RXrgs';

const defaultPosition = {
    latitude: 51.625712,
    longitude: 39.080306
};

class GetPhotos extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            showForm: true,
            photoIndex: 0,
            photos:[],
            offset:0,
            isOpen: false,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date(),
            location: defaultPosition,
            radius:800,
            advancedOptions:false,
            searchPanel:true,
            photosFound: 0,
            predictions:[],
            model:null,
            busy:false
        }    
        this.handleRadiusChange = this.handleRadiusChange.bind(this);
    }

    componentDidMount() {
      //  this._loadModel()
    }
    
    _loadModel = () => {
        // Load model from public folder
     //   nsfwjs.load('/model/', {size:299}).then(model => {
       //   this.setState({
         //   model,
        //  })
       // })
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    getPredictions = async (id,url, width, height) => {
 //       let r='img_'+id;
 //       let myImg=this.refs.r;
        const img = new Image();
        img.width=width;
        img.height=height;
        img.crossOrigin = 'anonymous';
        img.src =url;
        
        await this.sleep(100);
        const predictions = await this.state.model.classify(img);
        console.log('^^^^pred^^^^^');
        console.log('id: ',id,'  url',img.src);
        console.log(predictions);
        let newone=this.state.predictions;
        newone[id]=predictions;
        this.setState({
            predictions:newone,
            busy:false
        });

    }

    checkContent() {
        return
        let i=0;
        let item=this.props.photos[i];
        while (item && this.state.predictions[item.id] && !this.state.busy) {
            i++;
            item=this.props.photos[i];
        }

        console.log(i);
        console.log(item);
        if (item) console.log(this.state.predictions[item.id]);
        
        console.log(this.state.busy);
        console.log(this.props.photos);

        if (item && !this.state.predictions[item.id] && !this.state.busy) {
            this.setState({
                busy:true
            });
            console.log('got busy');
            let size=3;

            this.getPredictions(item.id,item.sizes[size].url,item.sizes[size].width,item.sizes[size].height);
        }
        
    }

    componentDidUpdate() {
        if (!this.state.busy) {
            this.checkContent();
        }
    }

    handleChangeStartDate(date) {
        this.setState({
          startDate: date
        });
    };

    handleChangeEndDate(date) {
        this.setState({
          endDate: date
        });
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

    handleRadiusChange(event) {
        this.setState({radius: Number(event.target.value)})
    };

    setRadius(r) {
        this.setState({
            radius:r
        })
    }

    setDate(date) {
        this.setState({
            startDate: date
          });
        let now=new Date();
        this.setState({
            endDate: now
          });
    }

    
    combineParams() {
        let params={};
        if (document.querySelector('#radius') && document.querySelector('#radius').value ) { params.radius=document.querySelector('#radius').value}
        params.start_time=Math.floor(this.state.startDate.getTime()/1000);
        params.end_time=Math.floor(this.state.endDate.getTime()/1000);
        params.lat=this.state.location.latitude;
        params.long=this.state.location.longitude;
        params.radius=this.state.radius;
        params.sort=1;
        params.count=100;
        params.offset=0;
        params.v=5.103;

        return params;
    }
    
    getData() {
        this.setState({offset:0});

        if (this.props.photos && this.props.photos.length>0) {
            console.log('*****clear*****');
            store.dispatch(photosClear);
        }

        let params=this.combineParams();
        store.dispatch(photosSearch(params));
    }

    getMoreData() {
        let params=this.combineParams();

        this.setState({offset:this.state.offset+100});
        params.offset=this.state.offset;
        store.dispatch(photosSearch(params));
    }

    toggleOptions() {
        if (!this.state.searchPanel) {
            this.toggleSearchPanel()
        }
        this.setState({
            advancedOptions: !this.state.advancedOptions
        })
    }

    toggleSearchPanel() {
        this.setState({
            searchPanel: !this.state.searchPanel
        })
    }

    render () {
        if (window.Vk===null && window.Vk==='undefined' && !window.Vk.Api) {
            return (
                {MyAuth}
            )
        }
        if (this.props.isLoading && !this.props.hasError) {
//            return (<p className="labelBig">Loading</p>)
        }
        if (this.props.hasError) {
            return (<p className="labelBig">Error</p>)
        }

        let imagesList='';
        if (this.props.photos && this.props.photos.length>0) {
                imagesList=(<div className="imgContainer">
                <p className="labelBig">Found {this.props.photosFound} images</p>
                {this.props.photos.map((item, index) => (
                    <div className="center-cropped" key={index}>
                        { item.owner_id>0 &&
                            <a className="vkLink" href={'https://vk.com/id'+item.owner_id} target='blank'>VK</a>
                        }

                        { this.state.predictions[item.id] &&
                                <div className="predContainer">
                                { this.state.predictions[item.id].map((pred) => (                                        
                                        <div className="pred" key={item.id+'_'+pred.className} style={{width: pred.probability*100+'%'}}><p>{pred.className}</p></div>
                                ))}
                                </div>
                        }
                        <img ref={'img_'+item.id} src={item.sizes[1].url} onClick={() => this.setState({ isOpen: true, photoIndex:index})} width={item.sizes[1].width} height={item.sizes[1].height} className="imgTile" alt="" />
                    </div>
                ))}
                </div>)
        }

        const { isOpen } = this.state;
        const { location } = this.state;
        const day = new Date(new Date().setHours(0, 0, 0, 0));
        const week = new Date();
        week.setDate(week.getDate() - 7)
        week.setHours(0,0,0,0);
        const month = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const year = new Date(new Date().getFullYear(), 0, 1);

        return (    
            <div className="coreApp">
                <div className="formInputToggle" onClick={()=>this.toggleSearchPanel()}><span role="img">&#128269;</span><p>Search<br/>panel</p></div>
                <div className="formInputToggle" onClick={()=>this.toggleOptions()}><span role="img">&#9881;</span><p>Advanced<br/>options</p></div>

                <div className={"inputPanel "+(this.state.searchPanel ? '':'hidden')}>
                    <div className={"formInput "+(this.state.advancedOptions ? '':'hidden')}>
                        <div className="input-control">
                            <p className='label'>Latitude:</p>
                            <input
                                className="input1"
                                type="number"
                                step="0.0000001"
                                min={-90}
                                max={90}
                                value={location.latitude}
                                onChange={this.handleLatitudeChange}
                            />
                        </div>
                        <div className="input-control">
                            <p className='label'>Latitude:</p>
                            <input
                                className="input1"
                                type="number"
                                step={0.0000001}
                                min={-180}
                                max={180}
                                value={location.longitude}
                                onChange={this.handleLongitudeChange}
                            />
                        </div>
                        <div className="input-control">
                            <p className="label">Distance (m)</p>
                            <input id="radius" className="input1" type="number" disabled placeholder="radius" onChange={this.handleRadiusChange} value={this.state.radius}></input>
                        </div>
                        <hr />
                        <p className="label">From date</p>
                        <DatePicker
                            className="input1"
                            selected={this.state.startDate}
                            onChange={date => this.handleChangeStartDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            timeCaption="time"
                            dateFormat="MMM d, yyyy HH:mm"
                        />
                        <p className="label">To date</p>
                        <DatePicker
                            className="input1"
                            selected={this.state.endDate}
                            onChange={date => this.handleChangeEndDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            timeCaption="time"
                            dateFormat="MMM d, yyyy HH:mm"
                        />
                    </div>
                    <div className="formMap">
                        <GoogleMapGeoPicker apiKey={googleMapApiKey} value={location} width='100%' onChange={this.onLocationChange} />
                    </div>
                    <div className="formSelect">
                        <hr />
                        <p className="label">Period</p>
                        <button className={"select1 "+(this.state.startDate.getTime()===day.getTime() ? 'selected':'')} onClick={()=>this.setDate(day)}>Day</button>
                        <button className={"select1 "+(this.state.startDate.getTime()==week.getTime() ? 'selected':'')} onClick={()=>this.setDate(week)}>Week</button>
                        <button className={"select1 "+(this.state.startDate.getTime()===month.getTime() ? 'selected':'')} onClick={()=>this.setDate(month)}>Month</button>
                        <button className={"select1 "+(this.state.startDate.getTime()===year.getTime() ? 'selected':'')} onClick={()=>this.setDate(year)}>Year</button>
                        <hr />
                        <p className="label">Distance</p>
                        <button className={"select1 "+(this.state.radius===100 ? 'selected':'')} onClick={()=>this.setRadius(100)}>100 m</button>
                        <button className={"select1 "+(this.state.radius===800 ? 'selected':'')} onClick={()=>this.setRadius(800)}>800 m</button>
                        <button className={"select1 "+(this.state.radius===6000 ? 'selected':'')} onClick={()=>this.setRadius(6000)}>6 km</button>
                        <button className={"select1 "+(this.state.radius===50000 ? 'selected':'')} onClick={()=>this.setRadius(50000)}>50 km</button>
                    </div>
                    <div className="formSelect">
                        <button className="input1" onClick={()=>this.getData()}>Find</button>
                    </div>
                </div>
                <div className="imagesList">
                    <InfiniteScroll
                    dataLength={this.props.photos.length}
                    next={()=>this.getMoreData()}
                    hasMore={this.state.offset<=900}
//                    loader={<p className="labelBig">Loading...</p>}
                    >
                        {imagesList}
                    </InfiniteScroll>

                    {isOpen && (
                        <Lightbox
                            imageTitle={ this.props.photos[this.state.photoIndex].owner_id>0 ? (<a className="vkLink vkLinkLightbox" href={'https://vk.com/id'+this.props.photos[this.state.photoIndex].owner_id} target='blank'>VK</a>):''}
                            mainSrc={this.props.photos[this.state.photoIndex].sizes[this.props.photos[this.state.photoIndex].sizes.length-1].url}
                            nextSrc={this.props.photos[(this.state.photoIndex + 1) % this.props.photos.length].sizes[this.props.photos[(this.state.photoIndex + 1) % this.props.photos.length].sizes.length-1].url}
                            prevSrc={this.props.photos[(this.state.photoIndex + this.props.photos.length - 1) % this.props.photos.length].sizes[this.props.photos[(this.state.photoIndex + this.props.photos.length - 1) % this.props.photos.length].sizes.length-1].url}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                            onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (this.state.photoIndex + this.props.photos.length - 1) % this.props.photos.length,
                            })
                            }
                            onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (this.state.photoIndex + 1) % this.props.photos.length,
                            })
                            }
                        />
                    )}
            </div>
        </div>
        )
    }
}

//export default reduxForm({ form: formName })(GetPhotos);


const mapStateToProps = (state) => {
    return {
        photos: state.photos,
      //  predictions: state.predictions,
        photosFound: state.photosFound,
        hasError: state.PhotosHasError,
        isLoading: state.PhotosIsLoading
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(photosSearch(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetPhotos);
//export default GetPhotos;