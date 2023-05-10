import React from 'react';
import {ScrollView, View} from 'react-native';
import SampleCard from '../components/SampleCard';

const list = [1, 2, 3, 4, 5, 6, 7];

const BaseScreen = () => {
  return (
    <ScrollView>
      {list.map(item => (
        <View
          style={{
            margin: 16,
          }}>
          <SampleCard key={item.toString()} number={item} />
        </View>
      ))}
    </ScrollView>
  );
};

export default BaseScreen;
