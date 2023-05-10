import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming,
} from 'react-native-reanimated';
import {screen} from '../utils';
import {PanGestureHandler} from 'react-native-gesture-handler';

/**
 * States
 * - Set translateX and translateY - onActive - DONE
 * - Snapping conditions
 *    - if height is less than h/2 - onEnd - set value to 1 - DONE
 *    - if height is greater than h/2 - onEnd - backNavigation - DONE
 * - Add interpolate to tranlateY to scale the page - DONE
 */

type props = {
  children: React.ReactNode;
  navigator: any;
};

const SwipeToClose = ({children, navigator}: props) => {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const closePage = () => {
    navigator.goBack();
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: event => {
      translationX.value = event.translationX;
      translationY.value = event.translationY;
    },
    onActive: event => {
      //   translateX.value = withDecay({
      //     velocity: event.translationX,
      //     velocityFactor: 0.9,
      //   });

      //   translateY.value = withDecay({
      //     velocity: event.translationY,
      //     velocityFactor: 0.9,
      //   });
      translateX.value = event.translationX;
      translateY.value = event.translationY;

      scale.value = interpolate(
        translateY.value,
        [0, screen.height / 2],
        [1, 0.8],
        Extrapolate.CLAMP,
      );
    },
    onEnd: () => {
      if (translateY.value < screen.height * 0.1) {
        translateX.value = withTiming(0, {
          easing: Easing.out(Easing.exp),
        });
        translateY.value = withTiming(0, {
          easing: Easing.out(Easing.exp),
        });

        scale.value = withTiming(1);
      } else {
        runOnJS(closePage)();
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          {
            flex: 1,
            backgroundColor: '#fff',
          },
          rStyle,
        ]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SwipeToClose;
