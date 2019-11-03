import * as Facebook from 'expo-facebook';
import React, { Component } from 'react';
import { StyleSheet, View, Button, Image, ImageBackground, TouchableWithoutFeedback, Text } from 'react-native';
import AuthConfig from '../../amplify/backend/auth/clean53d9d694/parameters.json'
import Amplify, { Auth } from 'aws-amplify';
import config from "../../aws-exports";

Amplify.configure({
  ...config,
  Auth: AuthConfig
});
  

export default class FBLogin extends Component {
  async signIn() {
    const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync('519393402250793', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
        console.log({type, token, expires})
      // sign in with federated identity
      Auth.federatedSignIn('facebook', { token, expires_at: expires})
        .then(credentials => {
          // console.log('get aws credentials', credentials);
          
          // Auth.currentAuthenticatedUser({
          //   bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
          // })
          //   .then(user => console.log(user))
          //   .catch(err => console.log(err));

        }).catch(e => {
          console.log(e);
        });
    
    }
  }

  // ...

  render() {
    return (
      <View style={{margin:40}} >
        <Button title="FBSignIn" onPress={this.signIn.bind(this)} />
      </View>
    );
  }
}