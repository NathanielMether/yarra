import api from './init'

export function listProducts() {
  return api.get('/products')
    .then ((res) => res.data)
}

export function createProduct({ brandName, name}) {
  return api.post('/products', { brandName, name})
}