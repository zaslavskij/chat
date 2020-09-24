import React from 'react'
import SubmitButton from '../buttons/submit-button'
import FormInput from './form-input'

const Form = () => {
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <FormInput />
      <FormInput />
      <div className="flex items-center justify-between">
        <SubmitButton cb={alert} title="Sign In" />
      </div>
    </form>
  )
}

export default Form
