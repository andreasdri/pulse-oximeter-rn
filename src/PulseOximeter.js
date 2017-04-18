import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import connectToPulseOximeter from './connectToPulseOximeter';


const Heart = (props) => {
  let Wrapper = View;
  if(props.connected && props.counter > -1) {
    Wrapper = Animatable.View;
  }
  return (
    <Wrapper
      animation="bounceIn" style={[styles.heart, props.style]} easing="ease-in-out"
      iterationCount={"infinite"} direction="normal" duration={1000}
    >
      <View style={[styles.leftHeart, styles.heartShape]} />
      <View style={[styles.rightHeart, styles.heartShape]} />
    </Wrapper>
  );
}

const Pulse = (props) => (
  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
    <Text style={{ fontSize: 50 }}>{props.pulseRate || '--'}</Text>
    <Heart {...props} style={{alignSelf: 'center'}} />
  </View>
);

const OxygenSaturation = ({ oxygenSaturation }) => (
  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
    <Text style={{ fontSize: 50 }}>{oxygenSaturation || '--'}</Text>
    <Text style={{ fontSize: 15, alignSelf: 'center'}}>% {'\n'}SpO2</Text>
  </View>
);

const ConnectionStatus = ({ connected }) => {
  const backgroundColor = connected ? 'green' : 'red';
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 15}}>
      <Text style={{fontSize: 20}} >
        Status: {connected ? 'Tilkoblet' : 'Frakoblet'}
      </Text>
      <View style={{height: 20, width: 20, borderRadius: 10, backgroundColor,
        marginLeft: 5}} />
    </View>
  );
};

class PulseOximeter extends Component {
  render() {
    const { pulseRate, oxygenSaturation, connected, counter } = this.props;

    return (
      <View style={styles.container}>
        <ConnectionStatus connected={connected} />
        <View style={{flexDirection: 'row'}}>
          <OxygenSaturation oxygenSaturation={oxygenSaturation} />
          <Pulse {...this.props} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 44,
    paddingHorizontal: 15,
  },
  heart: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent'
  },
  heartShape: {
    width: 24,
    height: 36,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'red',
  },
  leftHeart: {
    transform: [
        {rotate: '-45deg'}
    ],
    left: 4
  },
  rightHeart: {
    transform: [
        {rotate: '45deg'}
    ],
    right: 4
  }
});

export default connectToPulseOximeter(PulseOximeter);

