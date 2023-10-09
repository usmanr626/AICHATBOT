import React, {useState, useEffect} from 'react';
import {View, Text, Platform, Alert, Button} from 'react-native';
import * as IAP from 'react-native-iap';

const items = Platform.select({
  ios: [],
  android: ['chatbot_ai'],
});
const ProductsScreen = () => {
  const [purchased, setPurchased] = useState(false);
  const [products, setProducts] = useState(false);

  let purchaseUpdateSubscription;
  let purchaseErrorSubscription;

  useEffect(() => {
    IAP.initConnection()
      .catch(() => {
        console.log('Error connecting to the store...');
      })
      .then(() => {
        IAP.getProducts({skus: items})
          .catch(e => {
            console.log('Error finding items', e);
          })
          .then(res => {
            setProducts(res), console.log('RES', res);
          });
      });

    purchaseErrorSubscription = IAP.purchaseErrorListener(error => {
      if (!(error['responseCode'] === '2')) {
        Alert.alert(
          'Error',
          'There has been an error with your purchase, error code' +
            error['code'],
        );
      } else {
      }
    });
    purchaseUpdateSubscription = IAP.purchaseUpdatedListener(purchase => {
      setPurchased(true);
    });

    return () => {
      try {
        purchaseUpdateSubscription.remove();
      } catch (error) {}
      try {
        purchaseErrorSubscription.remove();
      } catch (error) {}
      try {
        IAP.endConnection();
      } catch (error) {}
    };
  }, []);

  if (purchased) {
    console.log('YOU ARE NOW A PREMIUM MEMBER');
  }

  if (products?.length > 0) {
    return (
      <View>
        {products.map(p => (
          <Button
            key={p['productId']}
            title={`Purchase ${p['price']}`}
            onPress={async () => {
              await IAP.requestPurchase({skus: ['chatbot_ai']});
            }}
          />
        ))}
      </View>
    );
  } else {
    return (
      <View>
        <Text>ProductssssScreen</Text>
      </View>
    );
  }
};
export default ProductsScreen;
