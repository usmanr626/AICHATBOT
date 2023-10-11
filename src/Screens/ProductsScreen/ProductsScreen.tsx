import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  Alert,
  Button,
  SafeAreaView,
  ImageBackground,
  Pressable,
} from 'react-native';
import * as IAP from 'react-native-iap';
import styles from './styles';
import {IMAGES} from '../../Assets/Images';
import {CustomTextButton} from '../../Components/CustomTextButton';

const items = Platform.select({
  ios: [],
  android: ['chatbot_ai'],
});
const ProductsScreen = () => {
  const [purchased, setPurchased] = useState(false);
  const [products, setProducts] = useState(false);
  const [isPremiumMember, setIsPremiumMember] = useState(false);

  let purchaseUpdateSubscription;
  let purchaseErrorSubscription;

  const savePurchaseToAsync = async () => {
    try {
      await AsyncStorage.setItem('isPremiumMember', 'true');
      console.log('Is Now A Premium Member');
      Alert.alert('You are now a Premium Member');
    } catch (error) {
      console.error('Error setting isPremiumMember:', error);
    }
  };

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

        IAP.getPurchaseHistory()
          .catch(() => {})
          .then(res => {
            try {
              const recipt = res[res.length - 1].transactionReceipt;
              console.log('Purchase history RES IS :', res[0]);
              const purchaseData = JSON.parse(res[0].dataAndroid);

              console.log('PURCHASE DATA', purchaseData);

              const packageName = 'com.aichatbot'; // Replace with the actual package name
              const productId = purchaseData.productId;
              const productToken = purchaseData.purchaseToken;
              const isSub = false; // Set this based on whether it's a subscription or not

              console.log('1', packageName);
              console.log('2', productId);
              console.log('3', productToken);
              console.log('4', isSub);

              IAP.validateReceiptAndroid({
                packageName,
                productId,
                accessToken: 'accessToken',
                productToken,
                isSub,
              })
                .then(valdationResult => {
                  console.log('VALIDATE:', valdationResult);
                })
                .catch(err => {
                  console.log('Error while validating', err.message);
                });
            } catch (error) {
              console.log('any error', error);
            }
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
      // validate(receipt);
      console.log('PURCHASE IS :', purchase);
      savePurchaseToAsync();
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
      <SafeAreaView style={styles.mainContainer}>
        <View style={{top: 20}}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '500',
            }}>
            You can get unlimited Searches for lifetime in $4.99
          </Text>
        </View>
        <View style={{top: '10%'}}>
          {products.map(p => (
            // <Button
            //   key={p['productId']}
            //   title={`Purchase ${p['price']}`}
            // onPress={async () => {
            //   await IAP.requestPurchase({skus: ['chatbot_ai']});
            // }}
            // />
            <Pressable
              onPress={async () => {
                await IAP.requestPurchase({skus: ['chatbot_ai']});
              }}
              style={styles.buttonMainContainer}>
              <Text style={styles.buttonText}>{`Purchase ${p['price']}`}</Text>
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Products Loading...</Text>
      </View>
    );
  }
};
export default ProductsScreen;
