import React from 'react'

function CreateProduct({
  createNewProduct
}) {
  return (
    <form 
      onSubmit={ (event) => {
        // Prevent old-school form submission
        event.preventDefault()
        const elements = event.target.elements // get form attributes
        const brandName = elements.brandName.value
        const name = elements.name.value
        createNewProduct({ brandName, name})
      }}
    >
      <label className='mb-2'>
        {'Brand Name: '}
        <input
          type='text-field'
          name='brandName'
        />
      </label>
      <label className='mb-2'>
        {'Product Name: '}
        <input
          type='text-field'
          name='name'
        />
      </label>
      <button>
        List a new Product
      </button>
    </form>
  )
}

export default CreateProduct