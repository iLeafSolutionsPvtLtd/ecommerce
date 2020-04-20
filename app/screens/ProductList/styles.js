/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 25, 2020
 * ProductListStyles - Product list Styles
 */
import {StyleSheet} from 'react-native';
import AppStyles from '../../config/styles';
import Constants from '../../config/constants';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#00a1f1',
  },
  containerGridLeft: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ffbbff',
  },
  containerGridRight: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#7cbb7c',
  },
});

export default styles;
