import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ProductInCart} from '../utils/types';
import {MainColors, TextColors} from '../utils/theme';

type CartItemProps = {
  item: ProductInCart;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, newQuantity: number) => void;
};

const ProductCartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onQuantityChange,
}) => {
  const {product, quantityInCart} = item;

  const handleIncrease = () => {
    if (quantityInCart < product.stock) {
      onQuantityChange(product.id.toString(), quantityInCart + 1);
    }
  };

  const handleDecrease = () => {
    if (quantityInCart > 1) {
      onQuantityChange(product.id.toString(), quantityInCart - 1);
    } else {
      onRemove(product.id.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: product.images[0]}} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.stock}>Stock: {product.stock}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleDecrease} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantityInCart}</Text>

          <TouchableOpacity onPress={handleIncrease} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => onRemove(product.id.toString())}
        style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 12,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TextColors.primary,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: MainColors.primary,
    marginBottom: 4,
  },
  stock: {
    fontSize: 12,
    color: TextColors.secondary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: MainColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  removeButtonText: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProductCartItem;
