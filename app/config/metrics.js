/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * Metrics - platform/application wide metrics for proper styling
 */

import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

// Used via Metrics.baseMargin
const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 54 : 66,
};

export default metrics;
