import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProductNavigator from "../ProductNavigator/ProductNavigator"
import OrderScreen from "../../screens/OrderScreen";
import FavoriteScreen from "../../screens/FavoriteScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import OrderNavigator from "../OrderNavigator/OrderNavigator"

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator 
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4169E1",
        tabBarLabelStyle: {
            display: "none",
          },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0
        },
      }}
    >
      <Tab.Screen
        name="Product"
        component={ ProductNavigator }
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderNavigator}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
