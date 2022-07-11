import * as React from 'react';
import { useAppDispatch } from '@app/hooks'
import { setAuthUser } from '@app/features/app/appSlice';
import SignInForm from './SignInForm'


export interface ISignInFormFields {
  username?: string
  password?: string,
}

export default function SignIn() {
  const dispatch = useAppDispatch()
  const [ errors, setErrors ] = React.useState({})

  const formValidation = (form: FormData): ISignInFormFields => {
    const errors: ISignInFormFields = {}
    const password = form.get('password')?.toString()
    if (!password || password.length < 6) {
      errors['password'] = 'The minimum length of a password is 6 characters'
    }
    return errors
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const errors = formValidation(data)
    setErrors(errors)

    if (Object.keys(errors).length !== 0) {
      return
    }
    const response = await fetch('http://localhost:1337/api/v1/user/token', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.get('username'),
        password: data.get('password'),
      })
    })
    if (response.ok) {
      const json = await response.json()
      dispatch(setAuthUser(json.data))
    } else {
      const errorList: any = {}
      const json = await response.json()
      errorList['username'] = ''
      errorList['password'] = json['status_message']
      setErrors(errorList)
    }
  };

  return (
    <SignInForm handleSubmit={handleSubmit} errors={errors} />
  );
}
