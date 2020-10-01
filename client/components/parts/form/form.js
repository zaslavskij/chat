import React from 'react'
import SubmitButton from '../buttons/submit-button'
import InputForm from './form-input'
import { typeEmail, typePassword, tryLogin, tryRegister } from '../../../redux/reducers/user'

const Form = ({ parent }) => {
  const fields = [
    {
      type: 'email',
      placeholder: 'Your email',
      inputType: 'text',
      cb: typeEmail
    },
    {
      type: 'password',
      placeholder: 'password',
      inputType: 'password',
      cb: typePassword
    }
  ]
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {fields.map((f) => {
        return <InputForm key={f.type} inputObj={f} />
      })}

      <div className="flex items-center justify-between">
        <SubmitButton cb={parent === 'login' ? tryLogin : tryRegister} title={parent} />
      </div>
    </form>
  )
}

export default Form
