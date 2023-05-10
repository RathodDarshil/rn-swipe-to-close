import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StackType} from '../../App';
import SwipeToClose from '../HOCs/SwipeToClose';
import SampleCard from '../components/SampleCard';
import {useNavigation} from '@react-navigation/native';

type props = NativeStackScreenProps<StackType, 'TopScreen'>;

const TopScreen = ({
  route: {
    params: {number},
  },
}: props) => {
  const navigation = useNavigation();

  return (
    <SwipeToClose navigator={navigation}>
      <SampleCard number={number} />
    </SwipeToClose>
  );
};

export default TopScreen;
