import React, {memo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Product} from '../utils/types';

export type ProductListItemProps = {
  product: Product;
  onPress: () => void;
};

const ProductListItem = ({product, onPress}: ProductListItemProps) => {
  const {thumbnail, title, price} = product;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FastImage
        style={styles.image}
        source={{uri: thumbnail, priority: FastImage.priority.low}}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default memo(ProductListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#2A9D8F',
    marginTop: 4,
  },
});
