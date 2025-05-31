import React from 'react'

function login() {
  return (
    <div>
      <p>welcome back </p>
      <p>Please enter your details to log in</p>
      <form action="">
        <label htmlFor="">Email Address</label>
        <input type="email" placeholder='john@exemple.com' />

        <label htmlFor="">Password</label>
        <input type="password" placeholder='Min 8 charachters' />
      </form>



    </div>
  )
}

export default login
