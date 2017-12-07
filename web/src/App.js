import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import { signIn } from './api/auth'
import { listProducts} from './api/products'
import { getDecodedToken } from './api/token'

class App extends Component {
  state = {
    decodedToken: getDecodedToken()
  }

  onSignIn = ({ email, password}) => {
    signIn({ email, password })
      .then((decodedToken) => {    
        this.setState({ decodedToken })
      })
  }

  render() {
    const { decodedToken } = this.state

    return (
      <div className="App">
        <h1>Yarra</h1>
        <h2 className='mb-3'>Now delivering all your Nisal merchandise to your door!</h2>
        {
          !!decodedToken ? (
            <div>
              <p>Email: { decodedToken.email }</p>
              <p>Signed in at: { new Date(decodedToken.iat * 1000).toISOString() }</p>
              <p>Expire at: { new Date(decodedToken.exp * 1000).toISOString() }</p>
            </div>
          ) : (
            <SignInForm
              onSignIn={ this.onSignIn }
            />
          )
        }
      </div>
    );
  }

  componentDidMount() {
    listProducts()
      .then((products) => {
        console.log(products)
      })
      .catch((error) => {
        console.log('error loading products', error)
      })
  }
}

export default App;
