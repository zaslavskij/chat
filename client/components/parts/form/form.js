import React from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ButtonDefault from '../buttons'
import FormInput from './form-input'
import { login, register } from '../../../redux/reducers/user'

const Form = ({ parent }) => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Required!'),
      password: Yup.string().min(8, 'Minimum 8 characters').required('Required!')
      // ,
      // confirm_password: Yup.string()
      //   .oneOf([Yup.ref('password')], "Password's not match")
      //   .required('Required!')
    }),
    onSubmit: (values) => {
      if (parent === 'login') {
        dispatch(login(values.email, values.password))
      }
      if (parent === 'register') {
        dispatch(register(values.email, values.password))
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white px-8 pt-2 pb-4 mb-4">
      {Object.keys(formik.values).map((k) => (
        <FormInput key={k} formik={formik} field={k} />
      ))}
      <div className="flex items-center justify-between">
        <ButtonDefault
          title={parent === 'login' ? 'Sign In' : 'Sign Up'}
          type="submit"
          iconTitle={parent === 'login' ? 'FaSignInAlt' : 'FaUserPlus'}
          color={parent === 'login' ? 'green' : 'blue'}
        />
      </div>
    </form>
  )
}

export default Form
