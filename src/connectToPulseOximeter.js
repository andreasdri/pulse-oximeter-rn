import React, { Component } from 'react';
import { BleManager } from 'react-native-ble-plx';
import base64 from 'base-64';
import { Buffer } from 'buffer/';

const SERVICE_UUID = '46A970E0-0D5F-11E2-8B5E-0002A5D5C51B';
const CHAR_UUID  = '0AAD7EA0-0D60-11E2-8E3C-0002A5D5C51B';

const connectToPulseOximeter = (WrappedComponent) => {
  return class BluetoothManager extends Component {
    constructor() {
      super();
      this.state = {
        pulseRate: null,
        oxygenSaturation: null,
        counter: -1,
        connected: false,
        poweredOn: false,
      };

      this.manager = new BleManager();
    }

    componentWillMount() {
      if (!this.manager) {
        this.manager = new BleManager();
      }
    }

    componentDidMount() {
      const subscription = this.manager.onStateChange((state) => {
        if (state === 'PoweredOn') {
          this.setState({ poweredOn: true });
          this.scanAndConnect();
          subscription.remove();
        }
        else if (state === 'PoweredOff') {
          this.setState({ poweredOn: false });
        }
      }, true);
    }

    componentWillUnmount() {
      if (this.subscription) {
        this.subscription.remove();
        delete this.subscription;
      }
      this.manager.destroy();
      delete this.manager;
    }

    scanAndConnect() {
      this.manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          return;
        }

        if (device.name && device.name.indexOf('Nonin3230_') > -1) {
          this.manager.stopDeviceScan();
          device.connect()
            .then(() => {
              this.setState({ connected: true });
              return device.discoverAllServicesAndCharacteristics();
            })
            .then((device) => this.monitor(device));
          
          device.onDisconnected(() => {
            if (this.subscription) {
              this.subscription.remove();
            }
            this.setState({ counter: -1, connected: false, pulseRate: null,
              oxygenSaturation: null });
            this.scanAndConnect();
          });
        }
      });
    }
    
    monitor(device) {
      this.subscription = device.monitorCharacteristicForService(
        SERVICE_UUID,
        CHAR_UUID,
        (error, characteristic) => {
          if (error || !characteristic) return;
          const raw = base64.decode(characteristic.value);
          const buffer = new Buffer(raw); 
          const counter = buffer.readInt16BE(5);
          const oxygenSaturation = buffer.readInt8(7);
          const pulseRate = buffer.readInt16BE(8);
          this.setState({
            oxygenSaturation,
            pulseRate,
            counter,
          });
        }  
      );
    }
    
    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
};

export default connectToPulseOximeter;

