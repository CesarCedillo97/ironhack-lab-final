import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Alert} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';
import {MainColors, TextColors} from '../../utils/theme';
import Button from '../../components/Button';
import SaveToLocalStorage from '../../storage/SaveToLocalStorage';
import {StorageKeys} from '../../storage/StorageKeys';
import {Picker} from '@react-native-picker/picker';
import {ProductInCart} from '../../utils/types';
import GetLocalStorageData from '../../storage/GetLocalStorageData';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type ProductDetailsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Details'>;
};

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const {product} = route.params;
  const {title, price, description, stock} = product;

  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = async () => {
    try {
      const productsInCart = await GetLocalStorageData<ProductInCart[]>(
        StorageKeys.CART,
      );

      const productToAdd: ProductInCart = {
        product: product,
        quantityInCart: quantity,
      };

      if (productsInCart.success && productsInCart.data) {
        const existingProductIndex = productsInCart.data.findIndex(
          item => item.product.id === product.id,
        );

        if (existingProductIndex >= 0) {
          productsInCart.data[existingProductIndex].quantityInCart += quantity;
        } else {
          productsInCart.data.push(productToAdd);
        }

        await SaveToLocalStorage(StorageKeys.CART, productsInCart.data);
      }

      Alert.alert('¡Listo!', `${quantity} productos agregados al carrito.`);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      Alert.alert('Error', 'No se pudo agregar el producto al carrito.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FastImage
        style={styles.image}
        source={{
          uri: product.images[0],
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.selectorContainer}>
          <Picker
            selectedValue={quantity}
            style={styles.picker}
            onValueChange={(itemValue: number) => setQuantity(itemValue)}>
            {[...Array(stock)].map((_, index) => (
              <Picker.Item
                key={index}
                label={`${index + 1}`}
                value={index + 1}
                style={styles.pickerItem}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <Button text="Agregar al carrito" size="md" onPress={addToCart} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: TextColors.primary,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: MainColors.primary,
  },
  description: {
    fontSize: 16,
    color: TextColors.secondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  selectorContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  picker: {
    width: '90%',
    height: 45,
    borderWidth: 1,
    backgroundColor: '#edf3f5',
    borderRadius: 8,
  },
  pickerItem: {
    fontSize: 14,
    height: '100%',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default ProductDetailsScreen;
