import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {getFcmToken, registerListenerWithFCM} from './src/utils/fcmHelpler';
import {getMessaging} from '@react-native-firebase/messaging';

const App = () => {
  // useEffect(() => {
  //   getFcmToken();
  // }, []);

  useEffect(() => {
    const subscribeToTopic = async () => {
      const token = await getFcmToken();
      if (token) {
        // Subscribe to the topic 'all-devices'
        getMessaging()
          .subscribeToTopic('general')
          .then(() => console.log('Subscribed to topic: all-devices'))
          .catch(error => console.log('Error subscribing to topic:', error));
      }
    };
    subscribeToTopic();
  }, []);

  useEffect(() => {
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text_bold}>Push Notification In Recat Native</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_bold: {
    fontWeight: '600',
    color: 'black',
  },
});

export default App;
