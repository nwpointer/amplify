import React from 'react';
import Amplify from 'aws-amplify';
import { StyleSheet, View, Image, ImageBackground, TouchableWithoutFeedback, Text } from 'react-native';
import { Authenticator, SignIn, ConfirmSignIn,  SignUp, ConfirmSignUp, VerifyContact, ForgotPassword, RequireNewPassword } from 'aws-amplify-react-native'
import config from "./aws-exports";
// import AuthConfig from './amplify/backend/auth/login2e672ba7/parameters.json'
import AuthConfig from './amplify/backend/auth/clean53d9d694/parameters.json'
import Logout from './components/Auth/Logout'
import Svg, { Path, Rect } from 'react-native-svg'
import { Icon } from 'react-native-elements'
import theme from './components/Theme'
import { ProgressBar } from './components/ProgressBar';
import FBLogin from './components/Auth/FBLogin';

import { FormField }  from './components/AmplifyUI'

Amplify.configure({
  ...config,
  Auth: AuthConfig
});

function App({authState}) {
  return authState === 'signedIn' ? (
    <View>
      <ProgressBar progress="80" />
      <View style={theme.section} >
    
        <Text style={{marginBottom: 16, marginTop: 16, fontSize:32}}>Header</Text>
        <Text style={{lineHeight: 24, marginBottom:100}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut turpis ante, tempus at nibh at, varius auctor nulla. Nunc sem mauris, b</Text>

        <FormField label="What is your favorite color"  />

        <Logout/>
      </View>
    </View>
  ) : null;
}

export default ()=>(
    <Authenticator >
      <App />
      <Text>asdf</Text>
      <FBLogin />
    </Authenticator>
)