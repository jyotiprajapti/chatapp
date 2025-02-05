import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {colors} from '../config/constants';
const backImage = require('../assets/background.jpeg');
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import styles from '../utilities/StyleSheet';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { doc,setDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase';

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const getFcmToken = async () => {
    const token = await messaging().getToken();
    return token;
  };
  const onHandleSignup =async () => {
    if (email !== '' && password !== '') {
      const token = await getFcmToken()
        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                updateProfile(cred.user, { displayName: username }).then(() => {
                    setDoc(doc(database, 'users', cred.user.email), {
                        id: cred.user.uid,
                        email: cred.user.email,
                        name: cred.user.displayName,
                        about: 'Available',
                        fcmToken:token
                    })
                })
                console.log('Signup success: ' + cred.user.email)
            })
            .catch((err) => Alert.alert("Signup error", err.message));
    }
};
  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          autoCapitalize="none"
          keyboardType="name-phone-pad"
          textContentType="name"
          autoFocus={true}
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
          <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>
            {' '}
            Sign Up
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: colors.pink, fontWeight: '600', fontSize: 14}}>
              {' '}
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
};

export default SignUp;
