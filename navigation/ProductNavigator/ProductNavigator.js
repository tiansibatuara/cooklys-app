import CartScreen from '../../screens/CartScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';
import HomeScreen from '../../screens/HomeScreen';
import ProductDetailScreen from '../../screens/ProductDetailScreen';
import SearchResultsScreen from '../../screens/SearchResultsScreen';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const ProductNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{
        headerStyle: { elevation: 0 },
        cardStyle: { backgroundColor: '#FFFFFF' }
    }}>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SearchResults" component={SearchResultsScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Cart" component={CartScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
  );
};

export default ProductNavigator;


