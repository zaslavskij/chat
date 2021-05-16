import React from 'react'
import ButtonDefault from '../buttons'
import InputForm from './form-input'
import { typeEmail, typePassword, login, register } from '../../../redux/reducers/user'

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
    <form className="bg-white px-8 pt-2 pb-8 mb-4">
      {fields.map((f) => {
        return <InputForm key={f.type} inputObj={f} />
      })}

      <div className="flex items-center justify-between">
        <ButtonDefault
          cb={parent === 'login' ? login : register}
          title={`${parent.slice(0, 1).toUpperCase()}${parent
            .slice(1, parent.length)
            .toLowerCase()}`}
          type="button"
          iconTitle={parent === 'login' ? 'FaSignInAlt' : 'FaUserPlus'}
          green="blue"
        />
      </div>
    </form>
  )
}

export default Form
