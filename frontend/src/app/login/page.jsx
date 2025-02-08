import { GradientBackground } from '@/components/GradientBackground'
import LoginComponent from '@/components/Login/LoginComponent'
import React from 'react'

function Login() {
  return (
  <>
    <div className='w-full overflow-hidden'>
   <GradientBackground/>
   <LoginComponent/>
    </div>
  </>
  )
}

export default Login