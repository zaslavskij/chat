import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SubmitButton from './parts/buttons/submit-button'
import FormInput from './parts/form/form-input'
import { authUser, setEmail, setPassword } from '../redux/reducers/register'

const Login = () => {
  const dispatch = useDispatch()

  const { email, password } = useSelector((s) => s.reg)

  const handleEmail = (e) => {
    dispatch(setEmail(e.target.value))
  }

  const handlePassword = (e) => {
    dispatch(setPassword(e.target.value))
  }
  return (
    <div className="flex flex-col items-center justify-around h-screen w-screen">
      <div className="w-full max-w-xs">
        <h2 className="text-2xl font-medium text-gray-500 text-center pb-4">LOGIN</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <FormInput title="Email" type="text" cb={handleEmail} value={email} />
          <FormInput title="Password" type="password" cb={handlePassword} value={password} />
          <div className="flex items-center justify-between">
            <SubmitButton cb={() => dispatch(authUser())} title="Sign In" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default React.memo(Login)
