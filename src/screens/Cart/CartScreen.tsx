/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import GetLocalStorageData from '../../storage/GetLocalStorageData';
import {StorageKeys} from '../../storage/StorageKeys';
import {PageStatus} from '../../utils/constants';
import {ProductInCart} from '../../utils/types';
import Button from '../../components/Button';
import SaveToLocalStorage from '../../storage/SaveToLocalStorage';
import {FlatList} from 'react-native-gesture-handler';
import ProductCartItem from '../../components/ProductCartItem';
import {useFocusEffect} from '@react-navigation/native';
import {MainColors, TextColors} from '../../utils/theme';

const CartScreen = () => {
  const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.LOADING);
  const [productsInCart, setproductsInCart] = useState<ProductInCart[]>([]);
  const [total, setTotal] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  useEffect(() => {
    updateTotal();
    if (!productsInCart.length) {
      setPageStatus(PageStatus.NO_CONTENT);
    }
  }, [productsInCart]);

  const updateTotal = () => {
    let newTotal = 0;
    productsInCart.forEach(
      product => (newTotal += product.quantityInCart * product.product.price),
    );
    setTotal(parseFloat(newTotal.toFixed(2)));
  };

  const getData = async () => {
    setPageStatus(PageStatus.LOADING);
    const storedProducts = await GetLocalStorageData<ProductInCart[]>(
      StorageKeys.CART,
    );
    if (storedProducts.success && storedProducts.data?.length) {
      setproductsInCart(storedProducts.data);
      setPageStatus(PageStatus.CONTENT);
    } else {
      setPageStatus(PageStatus.NO_CONTENT);
    }
  };

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    const updatedCart = productsInCart.map(item =>
      item.product.id.toString() === id
        ? {...item, quantityInCart: newQuantity}
        : item,
    );
    setproductsInCart(updatedCart);
    await SaveToLocalStorage(StorageKeys.CART, updatedCart);
  };

  const handleRemoveProductFromCart = async (idToRemove: string) => {
    const updatedCart = productsInCart.filter(
      item => item.product.id.toString() !== idToRemove,
    );
    setproductsInCart(updatedCart);
    await SaveToLocalStorage(StorageKeys.CART, updatedCart);
  };

  return (
    <View style={styles.container}>
      {pageStatus === PageStatus.LOADING && (
        <View style={styles.emptysContainers}>
          <Text style={styles.emptysContainersText}>cargando...</Text>
        </View>
      )}
      {pageStatus === PageStatus.ERROR && (
        <View style={styles.emptysContainers}>
          <Text style={styles.emptysContainersText}>Ocurió un errro...</Text>
          <Button onPress={getData} size="sm" text="Reintentar" />
        </View>
      )}

      {pageStatus === PageStatus.NO_CONTENT && (
        <View style={styles.emptysContainers}>
          <Text style={styles.emptysContainersText}>No hay contenido</Text>
        </View>
      )}

      {pageStatus === PageStatus.CONTENT && (
        <>
          <View style={styles.emptysContainers}>
            <FlatList
              data={productsInCart}
              renderItem={({item}) => (
                <ProductCartItem
                  item={item}
                  key={item.product.id}
                  onQuantityChange={handleUpdateQuantity}
                  onRemove={handleRemoveProductFromCart}
                />
              )}
            />
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalQuantityText}>${total}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptysContainers: {
    width: '100%',
    height: '90%',
  },
  emptysContainersText: {
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
  },
  totalContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  totalLabel: {
    fontSize: 18,
    color: TextColors.primary,
  },
  totalQuantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: MainColors.primary,
  },
});
