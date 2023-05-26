import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../config";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();
  const myUserUid = auth.currentUser.uid;

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const q = query(collection(db, "orders"), where("uid", "==", myUserUid));
  //       const querySnapshot = await getDocs(q);
  //       const ordersData = querySnapshot.docs.map((doc) => doc.data());
  //       setOrders(ordersData);
  //       console.log(ordersData)
  //     } catch (error) {
  //       console.log("Error fetching orders:", error);
  //     }
  //   };

  //   fetchOrders();
  // }, []); // Remove orders as a dependency

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "orders"), where("uid", "==", myUserUid));
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map((doc) => doc.data());
        setOrders(ordersData);
        console.log(ordersData);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", fetchOrders);

    return unsubscribe;
  }, [navigation, myUserUid]);

  const handleOrderPress = (order) => {
    console.log("Passed data: ", order)
    navigation.navigate("OrderDetail", { order });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.titleText}>Orders</Text>
          </View>
        </View>
      </View>
      <ScrollView styles={styles.contentContainer}>
        {orders.map((order, index) => (
          <View key={index} style={styles.orderContainer}>
            <Pressable
              style={styles.orderCard}
              onPress={() => handleOrderPress(order)}
            >
              <Text style={styles.orderTitle}>Order {index + 1}</Text>
              <Ionicons name="ios-chevron-forward" size={24} color="black" />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    // backgroundColor: "black", 
    backgroundColor: "white",
  },
  orderContainer: {
    marginBottom: 4,
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  topBarContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    backgroundColor: "white",
  },
  contentContainer: {
    backgroundColor: "#F5F5F5",
  },
  topBar: {
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingBottom: 12,
    flexDirection: "row",
    backgroundColor: "white",
  },
  titleText: {
    fontFamily: "psbold",
    fontSize: 20,
  },
});
