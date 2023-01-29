import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

import useReadDirectory from '@/hooks/useReadDirectory';

const ResultScreen = () => {
  //Hook to read image for Local Directory
  const {readDirectory, pics} = useReadDirectory();

  useFocusEffect(
    useCallback(() => {
      readDirectory();
    }, []),
  );

  const renderImage = (item: any) => (
    <Image
      key={String(item?.name)}
      style={styles.imageStyle}
      source={{uri: 'file://' + item.path}}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.myGalleryText}>My Gallery</Text>
      <FlatList
        data={pics}
        keyExtractor={item => item?.name}
        numColumns={2}
        renderItem={({item}) => renderImage(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  myGalleryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  imageStyle: {
    flex: 1,
    aspectRatio: 1,
    margin: 5,
    borderRadius: 10,
  },
});

export default ResultScreen;
