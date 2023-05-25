import HomeScreen from '../../screens/HomeScreen';
import ProductDetailScreen from '../../screens/ProductDetailScreen';
import SearchResultsScreen from '../../screens/SearchResultsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../../screens/LandingScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';


const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{
        headerStyle: { elevation: 0 },
        cardStyle: { backgroundColor: '#FFFFFF' }
    }}>
        <Stack.Screen options={{ headerShown: false }} name="Landing" component={LandingScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
      </Stack.Navigator>
  );
};

export default AuthNavigator;


