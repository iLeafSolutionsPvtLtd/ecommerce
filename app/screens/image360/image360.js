import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  PanResponder,
} from "react-native";
import React, { Component } from "react";
import Constants from "../../config/constants";

var SCREEN_WIDTH = Dimensions.get("window").width;
var SCREEN_HEIGHT = Dimensions.get("window").height;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  responder: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "#FFFFFF",
  },

  btnPrev: {
    position: "absolute",
    top: SCREEN_HEIGHT / 2,
    left: 10,
    width: 50,
    height: 50,
  },
  btnNext: {
    position: "absolute",
    top: SCREEN_HEIGHT / 2,
    right: 10,
    width: 50,
    height: 50,
  },
  btnClose: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
  },
  btnZoom: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 32,
    height: 32,
  },
  caption: {
    flex: 1,
    alignSelf: "center",
    position: "absolute",
    width: 50,
    textAlign: "center",
    bottom: 10,
    left: SCREEN_WIDTH / 2,
    marginLeft: -25,
    color: "black",
    fontSize: 10,
  },
});
let elasticTimer = null;
let touchX = null;
let k = 50; // distance panned
let timer = null;

class Voodoo360 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      imagesLoaded: [],
      mode: "360",
      ready: false,
    };
    // this.touchX = null;
    // this.k = null // distance panned
    // this.elasticTimer =  null
    // this.timer =  null
  }

  componentDidMount() {}

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onResponderTerminationRequest: this._handleResponderTerminationRequest,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
  }

  _preloader() {
    timer = setTimeout(() => {
      if (this.state.index < this.props.images.length - 1) {
        this.setState({
          index: this.state.index + 1,
        });
        this._preloader();
      } else {
        clearTimeout(timer);
        this.setState({
          index: 0,
          ready: true,
        });
      }
    }, 500);
  }

  // Ask to be the responder:
  _handleStartShouldSetPanResponder = (evt, gestureState) => {
    return true;
  };

  _handleMoveShouldSetPanResponder = (evt, gestureState) => {
    return true;
  };

  _handleResponderTerminationRequest = (evt, gestureState) => {
    return true;
  };

  _handlePanResponderGrant = (evt, gestureState) => {
    clearInterval(elasticTimer);
  };

  _handlePanResponderMove = (evt, gestureState) => {
    let x = gestureState.moveX;
    let dx = Math.abs(gestureState.dx);
    let dy = Math.abs(gestureState.dy);
    let vx = gestureState.vx;
    vx = vx > 0 ? Math.ceil(vx) : Math.floor(vx);
    if (dx > k) {
      this.step(-1 * vx);
    }
  };

  _handlePanResponderEnd = (evt, gestureState) => {
    let vx = gestureState.vx;
    let total = Math.abs(Math.ceil((vx * 10) / 2));
    vx = vx > 0 ? Math.ceil(vx) : Math.floor(vx);

    clearInterval(elasticTimer);
    elasticTimer = setInterval(() => {
      if (total > 0) {
        this.step(-1 * vx);
        total--;
      } else {
        clearInterval(elasticTimer);
      }
    }, 25);
  };

  step = (step) => {
    console.log("test step", step);
    let index = this._getNextStep(step);
    this.setState({
      index: index,
    });
  };

  zoom() {
    let newMode = this.state.mode === "zoom" ? "360" : "zoom";
    this.setState({
      mode: newMode,
    });
  }

  close() {
    this.props.close();
  }

  animate() {
    let x = event.touches[0].clientX;
    if (Math.abs(x - touchX) > k) {
      this.step(touchX > x ? 1 : -1);
      touchX = x;
    }
  }

  _getNextStep = (step) => {
    let currentStep = this.state.index;
    let total = (this.props.images && this.props.images.length) || 0;
    let nextStep =
      step > 0
        ? currentStep < total - 1
          ? currentStep + step
          : 0
        : currentStep > 0
        ? currentStep + step
        : total - 1 + step;
    return nextStep;
  };

  _getNextImage(step) {
    return this.props.images[this._getNextStep(step)];
  }

  _generateCssBackgroundImageUrls(images) {
    let str = "";
    let activeImage = images[this.state.index];
    str = `url("${activeImage}")`;
    return str;
  }

  _generateCssBackgroundImageProp(images) {
    let value = this._generateCssBackgroundImageUrls(images);
    return value ? { backgroundImage: value } : {};
  }

  _handleImageLoaded(data) {
    if (this.state.ready) return;

    let imagesLoaded = this.state.imagesLoaded;
    if (imagesLoaded.indexOf(data.url) === -1) {
      imagesLoaded.push(data.url);
    }
    let state = { imagesLoaded: imagesLoaded };
    if (this.state.imagesLoaded.length >= this.props.images.length) {
      Object.assign(state, { ready: true });
    }
    this.setState(state);
  }

  render() {
    let voodoo360VisibleStyle = {
      flex: 1,
      opacity: 1,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    };

    let voodoo360ImageStyles = [voodoo360VisibleStyle];

    let caption = `${this.state.index + 1} / ${this.props.images.length}`;

    return (
      <View style={styles.container} ref="container">
        <View style={styles.responder} {...this._panResponder.panHandlers}>
          <NetworkImage
            image={this.props.images[this.state.index]}
            index={this.state.index}
            active={true}
          />
        </View>
        {this.state.ready ? (
          <View>
            <Text style={styles.caption}>{caption}</Text>
          </View>
        ) : (
          <View>
            {/* <Text className="loading-message">{`Loading ${this.state.imagesLoaded.length} / ${this.props.images.length}`}</Text> */}
          </View>
        )}
      </View>
    );
  }
}

class NetworkImage extends React.Component {
  _loadEventFired(e, eventName) {
    eventName === "onLoad" &&
      this.props.onReady &&
      this.props.onReady({ index: this.props.index, url: this.props.image });
  }

  render() {
    let imageStyles = {
      width: SCREEN_WIDTH,
      height: SCREEN_WIDTH,
      opacity: this.props.active ? 1 : 0,
      backgroundColor: "rgba(0,0,0,0.0)",
    };

    let uri =
      Constants.APP_S3_BASE_URL +
      (this.props.image ? this.props.image.file : "");
    return <Image source={{ uri }} style={imageStyles} resizeMode="contain" />;
  }
}

export default Voodoo360;
