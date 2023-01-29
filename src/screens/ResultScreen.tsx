import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const ResultScreen = props => {
  const imageData = props.route.params;

  const renderImage = () => (
    <Image
      style={styles.imageStyle}
      source={{
        uri: imageData.uri,
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.myGalleryText}>My Gallery</Text>
      {renderImage()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  myGalleryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  imageStyle: {
    aspectRatio: 1,
    margin: 5,
    borderRadius: 10,
  },
});

export default ResultScreen;
