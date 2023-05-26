import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

const OrderDetailScreen = ({ route, navigation }) => {
  const { order } = route.params;

  // Calculate the total price
  const totalPrice = Object.keys(order.orders).reduce(
    (sum, key) => sum + order.orders[key].price * order.orders[key].quantity,
    0
  );

  // Format the total price
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
  });
  const formattedTotalPrice = formatter.format(totalPrice);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={styles.topBar}>
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="arrow-back-ios"
            size={24}
            color="black"
            suppressHighlighting={true}
          />
          <View>
            <Text style={styles.titleText}>Check Out</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.contentContainer}>
        {Object.keys(order.orders).map((key) => {
          const orderData = order.orders[key];
          return (
            <View key={key} style={styles.orderCard}>
              <Image source={{ uri: orderData.image }} style={styles.orderImage} />
              <View style={styles.orderDetails}>
                <Text style={styles.orderName}>{orderData.name}</Text>
                <Text style={styles.orderQuantity}>Quantity: {orderData.quantity}</Text>
              </View>
            </View>
          );
        })}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Price:</Text>
          <Text style={styles.totalPrice}>{formattedTotalPrice}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 4,
  },
  orderImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  orderDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  orderName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderQuantity: {
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    marginHorizontal: 12,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  topBarContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8, // PENTING SAMAIN
  },
  contentContainer: {
    // paddingHorizontal: 12,
    backgroundColor: "#F5F5F5",
  },
  topBar: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "64%",
    alignItems: "center",
    paddingBottom: 12,
    flexDirection: "row",
  },
  titleText: {
    fontFamily: "psbold",
    fontSize: 20,
  },
});
