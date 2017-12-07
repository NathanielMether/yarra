import React from 'react'

function Product({
  brandName,
  productName
}) {
  return (
    <div>
      <h2>{productName}</h2>
      <p>{brandName}</p>
    </div>
  )
}

export default Product