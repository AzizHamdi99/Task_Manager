import Link from 'next/link'
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
        <input type="password" placeholder='Min 8 characters' />

        <Link href={'/'}><button type='submit'>Login</button></Link>
      </form>
      <p></p>



    </div>
  )
}

export default login
