import HomeScreen from '../../screens/HomeScreen';
import ProductDetailScreen from '../../screens/ProductDetailScreen';
import SearchResultsScreen from '../../screens/SearchResultsScreen';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const ProductNavigator = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SearchResults" component={SearchResultsScreen} />
      </Stack.Navigator>
  );
};

export default ProductNavigator;

