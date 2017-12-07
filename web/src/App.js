import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import Product from './components/Product'
import CreateProduct from './components/CreateProduct'
import { signUp, signIn, signOutNow } from './api/auth'
import { listProducts, createProduct } from './api/products'
import { getDecodedToken } from './api/token'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(),
    products: []
  }

  onSignUp = ({ firstName, lastName, email, password}) => {
    signUp({ firstName, lastName, email, password})
      .then(() => {
        this.onSignIn({email, password})
      })
  }

  onSignIn = ({ email, password}) => {
    signIn({ email, password })
      .then((decodedToken) => {    
        this.setState({ decodedToken })
        this.load()
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  createNewProduct = ({brandName, name}) => {
    createProduct({brandName, name})
      .then(() => {
        this.load()
      })
  }

  render() {
    const { decodedToken, products } = this.state
    const signedIn = !!decodedToken

    return (
      <div className="App">
        <h1>Yarra</h1>
        <h2 className='mb-3'>Now delivering all your Nisal merchandise to your door!</h2>
        {
          signedIn ? (
            <div>
              <p>Email: { decodedToken.email }</p>
              <p>Signed in at: { new Date(decodedToken.iat * 1000).toISOString() }</p>
              <p>Expire at: { new Date(decodedToken.exp * 1000).toISOString() }</p>
              <button onClick={ this.onSignOut }>
                Sign Out
              </button>

              <h2>Products</h2>
              {
                products.map((product) => (
                  <Product brandName={product.brandName} name={product.name} />
                ))
              }
              <h1>New Product</h1>
              <CreateProduct createNewProduct={ this.createNewProduct }/>
            </div>
          ) : (
            <div>
              <SignInForm onSignIn={ this.onSignIn }/>
              <p>Or Sign Up</p>
              <SignUpForm onSignUp={ this.onSignUp }/>
            </div>
          )
        }
      </div>
    );
  }

  load() {
    listProducts()
      .then((products) => {
        this.setState({ products: products})
      })
      .catch((error) => {
        console.log('error loading products', error)
      })
  }

  componentDidMount() {
    this.load()
  }
}

export default App;
