/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';
import {PageStatus} from '../../utils/constants';
import DrawerHeader from '../../components/DrawerHeader';
import ProductCard from '../../components/ProductCard';
import {TextColors} from '../../utils/theme';
import {Product} from '../../utils/types';
import getProducts from '../../api/getProducts';
import Button from '../../components/Button';
import {useTranslation} from 'react-i18next';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const {t} = useTranslation();

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.LOADING);
  const [products, setproducts] = useState<Product[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setPageStatus(PageStatus.LOADING);
    const productsList = await getProducts();
    console.log(products);
    if (productsList.success) {
      if (productsList.data?.products) {
        setproducts(productsList.data.products);
        setPageStatus(PageStatus.CONTENT);
      } else {
        setproducts([]);
        setPageStatus(PageStatus.NO_CONTENT);
      }
    } else {
      setPageStatus(PageStatus.ERROR);
    }
  };

  const renderItem = ({item}: any) => (
    <ProductCard
      onPress={() => navigation.navigate('Details', {product: item})}
      item={item}
      key={item.id}
    />
  );

  return (
    <>
      <DrawerHeader title={t('homeScreenHeader')} />
      <View style={styles.container}>
        {pageStatus === PageStatus.LOADING && (
          <View style={styles.emptysContainers}>
            <Text style={styles.emptysContainersText}>{t('loading')}</Text>
          </View>
        )}
        {pageStatus === PageStatus.ERROR && (
          <View style={styles.emptysContainers}>
            <Text style={styles.emptysContainersText}>{t('errorText')}</Text>
            <Button onPress={getData} size="sm" text="Reintentar" />
          </View>
        )}

        {pageStatus === PageStatus.NO_CONTENT && (
          <View style={styles.emptysContainers}>
            <Text style={styles.emptysContainersText}>{t('noContent')}</Text>
          </View>
        )}

        {pageStatus === PageStatus.CONTENT && (
          <>
            <Text style={styles.header}>{t('products')}</Text>

            <FlatList
              data={products}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.productList}
            />
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  emptysContainers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptysContainersText: {
    textAlign: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: TextColors.primary,
  },
  productList: {
    justifyContent: 'space-around',
  },
  productCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 8,
    margin: 4,
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 120,
    marginBottom: 8,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default memo(HomeScreen);
