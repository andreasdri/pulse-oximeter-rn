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
import PulseOximeter from './src/PulseOximeter';
import ConditionReport from './src/ConditionReport';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PulseOximeter />
        <ConditionReport />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fbfd',
  }
});

AppRegistry.registerComponent('PulseOximeter', () => App);
