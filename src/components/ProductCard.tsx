import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {Product} from '../utils/types';
import FastImage from 'react-native-fast-image';
import {TextColors} from '../utils/theme';

export type ProductCardProps = {
  item: Product;
  onPress: () => void;
};

const ProductCard = ({item, onPress}: ProductCardProps) => {
  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress}>
      <FastImage source={{uri: item.images[0]}} style={styles.productImage} />
      <View style={styles.textContainer}>
        <Text style={styles.productTitle}>$ {item.price}</Text>
        <Text style={styles.productSecondary}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ProductCard);

const styles = StyleSheet.create({
  productCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#ebebeb',
    margin: 4,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    marginBottom: 8,
    borderRadius: 8,
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TextColors.primary,
  },
  productSecondary: {
    fontSize: 16,
    color: TextColors.secondary,
  },
});
