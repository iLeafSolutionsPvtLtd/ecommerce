/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * VideoPlayerView -
 */

import styles from './styles';
import {View} from 'react-native';
import React, {Component} from 'react';
import VideoPlayer from '../../components/videoControls';

class VideoPlayerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vimeoUrl: props.navigation.state.params.vimeoUrl,
      videoUrl: '',
    };
  }

  componentDidMount() {
    const {vimeoUrl} = this.state;
    if (vimeoUrl) {
      let VIMEO_ID = vimeoUrl.substring(vimeoUrl.lastIndexOf('/') + 1);
      let finalUrl = '',
        url360 = '',
        url720 = '',
        url540 = '',
        url1080 = '';
      console.log('Vimeo id >>>>>> ', VIMEO_ID);
      fetch(`https://player.vimeo.com/video/${VIMEO_ID}/config`)
        .then(res => res.json())
        .then(res => {
          res.request.files.progressive.map(item => {
            if (item.quality === '360p') {
              url360 = item.url;
            } else if (item.quality === '540p') {
              url540 = item.url;
            } else if (item.quality === '720p') {
              url720 = item.url;
            } else if (item.quality === '1080p') {
              url1080 = item.url;
            }
          });
          if (url360.length > 0) {
            finalUrl = url360;
          } else if (url540.length > 0) {
            finalUrl = url540;
          } else if (url720.length > 0) {
            finalUrl = url720;
          } else {
            finalUrl = url1080;
          }
          this.setState({
            videoUrl: finalUrl,
          });
        });
    }
  }

  videoError = err => {
    console.log('ERROR=======', err);
  };

  render() {
    const {videoUrl} = this.state;
    return (
      <View style={styles.container}>
        <VideoPlayer
          videoDict={videoUrl}
          onError={this.videoError}
          disableVolume={true}
          navigator={this.props.navigation}
        />
      </View>
    );
  }
}

export default VideoPlayerView;
