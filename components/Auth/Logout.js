import React from 'react';
import AuthPiece from './AuthPiece'
import { AmplifyButton } from '../AmplifyUI';
import { Auth } from 'aws-amplify';

export default class Logout extends AuthPiece{
    constructor(props) {
          super(props);
          this.signOut = this.signOut.bind(this);
    }
    
    signOut() {
          Auth.signOut().then(() => this.changeState('signedOut')).catch(err => this.error(err));
    }
    
    render(){
      return (
        <AmplifyButton text="CLICK ME" onPress={this.signOut}></AmplifyButton>
      )
    }
  }
  