/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import { createLogger }  from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';
import {Provider} from 'react-redux';


const reducer = function(state, action) {
  if (action.type === "INC") {
    return state+action.payload;
  }
  if (action.type === "DEC") {
    return state-action.payload;
  }
  return state;
}

const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: null,
}

const userReducer = (state=initialState, action) => {
  switch (action.type) {
      case "CHANGE_NAME":{
        state = {...state, name: action.payload};
        state.name = action.payload;
          break;
      }
      case "CHANGE_AGE":{
          state = {...state, age: action.payload};
          break;
      }
      case "FETCH_USERS_START":
          return {...state, fetching:true}
          break;
      case "FETCH_USERS_ERROR":
          return {...state, fetching:false, error: action.payload}
          break;
      case "RECEIVE_USERS":
          return {...state,
              fetching:false,
              fetched: true,
              users: action.payload}
          break;
  }
  return state;
};

const tweetReducer = (state=[], action) => {
  return state;
};

const reducers = combineReducers({
    user:userReducer,
    tweets:tweetReducer,
})

/*
const logger = (store) => (next) => (action) => {
  console.log("action fired", action);
  next(action);
}
*/

const logger = createLogger();

const middleware = applyMiddleware(thunk, logger);

const store = createStore(reducers, middleware);

store.subscribe( () => {
  console.log("store changde ", store.getState())
} )

/*
store.dispatch({type:"CHANGE_NAME", payload:"Will"});
store.dispatch({type:"CHANGE_AGE", payload:35});
*/
/*

store.dispatch((dispatch) => {
    dispatch({type:"FETCH_USERS_START"})
    axios.get("http://rest.learncode.academy/api/wstern/users")
        .then( (response) => {
            dispatch({type:"RECEIVE_USERS", payload:response.data})
        })
        .catch((err) => {
            dispatch({type:"FETCH_USERS_ERROR", payload:err})
        })
});
*/

export default class Appy extends Component {

  componentDidMount() {
    console.log("componentDidMount")



  }

  render() {
    var divan = require('./divan.json');
    console.log(divan);
    return (
        <Provider store={store} >
          <View>
            <Text>Hello World </Text>
          </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Appy', () => Appy);
