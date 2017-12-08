import React from 'react'

function Product({
  brandName,
  name,
  onEdit
}) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{brandName}</p>
    </div>
  )
}

export default Product