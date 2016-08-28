import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  ToastAndroid,
  BackAndroid,
  TouchableOpacity,
  Dimensions,
  TouchableNativeFeedback,
  RefreshControl,
  WebView,
} from 'react-native';

import { connect } from 'react-redux';

let WEBVIEW_REF = `WEBVIEW_REF_GAME`;
let back_image = require('image!ic_back_blue');
let imageSize = 40;

class Game extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLogIn: false,
      canGoBack: false,
    }
  }

  _pressButton = () => {
    if(this.state.canGoBack)
      this.refs[WEBVIEW_REF].goBack();
    else
      this.props.navigator.pop();
  }

  onNavigationStateChange = (navState) => {

    // if(navState.url.indexOf(this.props.URL) !== -1 ){
      this.setState({
        canGoBack: navState.canGoBack,
      });
    // }else{
    //   this.setState({
    //     canGoBack: navState.canGoBack,
    //   });
    //   this.refs[WEBVIEW_REF].stopLoading();
    // }
  }

  shouldComponentUpdate(nextProps,nextStates){
    if(nextProps.app.segmentedIndex==this.props.segmentedIndex){
      return true;
    }
    return false;
  }

  render() {
    console.log('Game.js rendered');
    return ( 
        <View style={{flex:3}}>
            <View style={{
                    position: 'absolute',
                    bottom: 40,
                    right: 20,
                    width: imageSize,
                    height: imageSize,
                    zIndex: 100,
                }}>
                <TouchableNativeFeedback
                    onPress={this._pressButton}
                >
                <View style={{width:imageSize, height:imageSize}}>
                    <Image 
                        style={{width:imageSize, height:imageSize}}
                        source={back_image}
                    />
                    </View>
                </TouchableNativeFeedback>
            </View>
            <WebView
                ref={WEBVIEW_REF}
                source={{uri: this.props.URL}} 
                style={{flex:3, zIndex: 0}}
                scalesPageToFit={true}
                domStorageEnabled={true}
                onNavigationStateChange={this.onNavigationStateChange}
                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                startInLoadingState={false}  
                injectedJavaScript={`$('.header').hide(); $('.scrollbar').removeClass('scrollbar').hide()`}
            >

            </WebView>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    backgroundColor: '#00a2ed',
    height: 56,
  },
  selectedTitle:{
    //backgroundColor: '#00ffff'
    //fontSize: 20
  },
  avatar: {
    width: 50,
    height: 50,
  }
});

function mapStateToProps(state) {
    return {
      app: {
        isLoadingMore: state.app.isLoadingMore,
        isRefreshing: state.app.isRefreshing,
      },
    };
}

export default connect(
  mapStateToProps
)(Game);
