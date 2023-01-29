import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const ResultScreen = props => {
  const imageData = props.route.params;

  const renderImage = () => (
    <Image
      style={styles.imageStyle}
      resizeMode='contain'
      source={{
        uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
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
