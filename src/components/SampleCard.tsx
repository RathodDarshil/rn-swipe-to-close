import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {screen} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import FastImage from 'react-native-fast-image';

const SampleCard = ({number = 1}: {number: number}) => {
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
      <View>
        <SharedElement id={`item.${number}.photo`}>
          <FastImage
            source={{
              uri: IMAGE_URL,
            }}
            style={{
              height: 200,
              width: '100%',
              borderRadius: 8,
            }}
          />
        </SharedElement>
      </View>
    </Pressable>
  );
};

export default React.memo(SampleCard);
