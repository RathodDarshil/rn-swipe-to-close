import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {screen} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import FastImage from 'react-native-fast-image';

const SampleCard2 = ({number = 1}: {number: number}) => {
  const navigation = useNavigation();

  const IMAGE_URL = `https://picsum.photos/500/300?random=${number}`;

  const navigate = () => {
    //@ts-ignore
    navigation.navigate('TopScreen', {
      number,
    });
  };

  return (
    <Pressable key={number.toString()} onPress={navigate}>
      <View style={{backgroundColor: '#e0e0e0'}}>
        <SharedElement id={`item.${number}.photo`}>
          {/* <Image source={{uri: IMAGE_URL, height: 200, width: screen.width}} /> */}
          <FastImage
            source={{
              uri: IMAGE_URL,
            }}
            style={{
              height: 200,
              width: screen.width,
            }}
          />
        </SharedElement>
      </View>
    </Pressable>
  );
};

export default React.memo(SampleCard2);
