import {StyleSheet, Text, View, TextInput, FlatList} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Product} from '../../utils/types';
import {RootStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import ProductListItem from '../../components/ProductListItem';
import {debounce} from 'lodash';
import {PageStatus} from '../../utils/constants';
import searchProducts from '../../api/searchProducts';
import Button from '../../components/Button';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Search'
>;

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.LOADING);

  useEffect(() => {
    getData('');
  }, []);

  const getData = async (query: string) => {
    setPageStatus(PageStatus.LOADING);
    const productsList = await searchProducts({query: query});
    if (productsList.success) {
      if (productsList.data?.products) {
        setFilteredProducts(productsList.data.products);
        setPageStatus(PageStatus.CONTENT);
      } else {
        setFilteredProducts([]);
        setPageStatus(PageStatus.NO_CONTENT);
      }
    } else {
      setPageStatus(PageStatus.ERROR);
    }
  };

  const debouncedGetData = useMemo(
    () =>
      debounce((query: string) => {
        getData(query);
      }, 500),
    [],
  );

  const handleOnChange = (text: string) => {
    setSearchQuery(text);
    debouncedGetData(text);
  };

  const renderProduct = ({item}: {item: Product}) => (
    <ProductListItem
      onPress={() => navigation.navigate('Details', {product: item})}
      product={item}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Buscador de productos</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={handleOnChange}
      />
      {pageStatus === PageStatus.LOADING && (
        <View style={styles.emptysContainers}>
          <Text style={styles.emptysContainersText}>
            Obtniendo productos...
          </Text>
        </View>
      )}
      {pageStatus === PageStatus.ERROR && (
        <View style={styles.emptysContainers}>
          <Text style={styles.emptysContainersText}>Ocurió un errro...</Text>
          <Button
            onPress={() => {
              debouncedGetData(searchQuery);
            }}
            size="sm"
            text="Reintentar"
          />
        </View>
      )}

      {pageStatus === PageStatus.NO_CONTENT && (
        <View style={styles.emptysContainers}>
          <Text style={styles.emptysContainersText}>N hay contenido</Text>
        </View>
      )}

      {pageStatus === PageStatus.CONTENT && (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={renderProduct}
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptysContainers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptysContainersText: {
    textAlign: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
