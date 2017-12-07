import React from 'react'

function SignUpForm({
  onSignUp
}) {
  return (
    <form 
      onSubmit={ (event) => {
        // Prevent old-school form submission
        event.preventDefault()
        const elements = event.target.elements // get form attributes
        const email = elements.email.value
        const password = elements.password.value
        const firstName = elements.firstName.value
        const lastName = elements.lastName.value
        onSignUp({ email, password, firstName, lastName})
      }}
    >
      <label className='mb-2'>
        {'First Name: '}
        <input
          type='text-field'
          name='firstName'
        />
      </label>
      <label className='mb-2'>
        {'Last Name: '}
        <input
          type='text-field'
          name='lastName'
        />
      </label>
      <label className='mb-2'>
        {'Email: '}
        <input
          type='email'
          name='email'
        />
      </label>
      <label className='mb-2'>
        {'Password: '}
        <input
          type='password'
          name='password'
        />
      </label>
      <button>
        Create Acount
      </button>
    </form>
  )
}

export default SignUpForm