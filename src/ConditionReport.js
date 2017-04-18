import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import { Button } from 'react-native-elements';


class ConditionReport extends Component {
  render() {
    const buttonBackgroundColor = '#4391d8';
    return (
      <View style={{ flex: 2 }}>
        <IndicatorViewPager style={{flex: 1}} indicator={this._renderDotIndicator()}
        >
          <View>
            <Text style={{ fontSize: 20, textAlign: 'center', paddingBottom: 15}}>
              Hvordan er pusten din?
            </Text>
            <Button
              large
              title='BRA - Pusten er som vanlig eller bedre'
              icon={{name: 'sentiment-very-satisfied'}}
              raised
              backgroundColor={buttonBackgroundColor}
              buttonStyle={{marginBottom: 10}}
            />
            <Button
              large
              title='LITT DÅRLIG - Jeg er litt tungpustet' 
              icon={{name: 'sentiment-neutral'}}
              raised
              backgroundColor={buttonBackgroundColor}
              buttonStyle={{marginBottom: 10}}
            />
            <Button
              large
              title='DÅRLIG - Jeg er svært tungpustet'
              icon={{name: 'sentiment-very-dissatisfied'}}
              raised
              buttonStyle={{marginBottom: 10}}
              backgroundColor={buttonBackgroundColor}
            />
          </View>
          <View style={{backgroundColor: 'red'}} />
        </IndicatorViewPager>
      </View>
    );
  }
	
	_renderDotIndicator() {
		return <PagerDotIndicator pageCount={2} />
  }
}

export default ConditionReport;

