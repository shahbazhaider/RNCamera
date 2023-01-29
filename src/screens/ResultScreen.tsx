import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const ResultScreen = props => {
  const imageData = props.route.params;

  const renderImage = () => (
    <Image
      style={styles.imageStyle}
      resizeMode="contain"
      source={{
        uri: imageData.uri,
      }}
    />
  );

  return <View style={styles.container}>{renderImage()}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
});

export default ResultScreen;
