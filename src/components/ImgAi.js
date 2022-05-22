import { store } from '../index';
import React, { Component } from 'react';
//import * as nsfwjs from 'nsfwjs';
import { connect } from 'react-redux';
import { loadModel } from './actions/ai';


class ImgAi extends Component {
    state = {
        message:'AI none',
        model:null,
        AIready:false
    }

    componentDidMount() {
       store.dispatch(loadModel());
    }


    render () {
        return (
            <div onClick={()=> {console.log(store.getState())}} className="ImgAiMessage">{ this.props.message }</div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        message: state.message,
        model: state.model,
        AIready: state.AIready
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(loadModel(url))
    };
};

export default connect(mapStateToProps)(ImgAi);
