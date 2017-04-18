import React, { Component } from 'react';

const connectToPulseOximeter = (WrappedComponent) => {
  return class BluetoothManager extends Component {
    constructor() {
      super();
      this.state = {
        pulseRate: null,
        oxygenSaturation: null,
        counter: -1,
        connected: false
      };
    }

    componentDidMount() {
      setTimeout(() => this.scanAndConnect(), 4000);
    }

    componentWillUnmount() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }

    scanAndConnect() {
      this.setState({ connected: true });
      this.monitor();
    }
    
    monitor() {
      this.timer = setInterval(() => {
        this.setState((prevState, props) => {
          return {
            pulseRate: 70 + Math.floor(Math.random() * 10),
            oxygenSaturation: 97 + Math.floor(Math.random() * 3),
            counter: prevState.counter + 1
          };
        });
      }, 1000);
    }
    
    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
};

export default connectToPulseOximeter;
