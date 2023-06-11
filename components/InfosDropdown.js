import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useState, useRef } from 'react';

function InfosDropdown({ children, title }) {
  const [showContent, setShowContent] = useState(false);
  const animationController = useRef(new Animated.Value(0)).current;

  const toggleAnimation = {
    duration: 300,
    update: {
      duration: 300,
      property: LayoutAnimation.Properties.opacity,
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      duration: 200,
      property: LayoutAnimation.Properties.opacity,
      type: LayoutAnimation.Types.easeInEaseOut,
    },
  };

  const toggleContentList = () => {
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setShowContent(!showContent);
  };

  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  return (
    <View style={styles.infoContainer}>
      <TouchableOpacity
        style={styles.infoContainerHeader}
        onPress={() => toggleContentList()}
      >
        <Text style={styles.infoTitle}>{title}</Text>
        <Animated.View
          style={{
            position: 'absolute',
            right: 8,
            top: 5,
            transform: [{ rotateZ: arrowTransform }],
          }}
        >
          <Entypo name="chevron-down" size={24} color="black" />
        </Animated.View>
      </TouchableOpacity>
      {showContent && (
        <>
          <View style={styles.infoContainerBody}>{children}</View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    marginBottom: 15,
    overflow: 'hidden',
  },
  infoContainerHeader: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    backgroundColor: 'rgba(255, 255, 255, .6)',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 500,
  },
  infoContainerBody: {
    padding: 5,
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default InfosDropdown;
