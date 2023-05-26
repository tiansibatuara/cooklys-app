import OrderScreen from "../../screens/OrderScreen";
import OrderDetailScreen from "../../screens/OrderDetailScreen";
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const OrderNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{
        headerStyle: { elevation: 0 },
        cardStyle: { backgroundColor: '#FFFFFF' }
    }}>
        <Stack.Screen options={{ headerShown: false }} name="Order" component={OrderScreen} />
        <Stack.Screen options={{ headerShown: false }} name="OrderDetail" component={OrderDetailScreen} />
      </Stack.Navigator>
  );
};

export default OrderNavigator;


