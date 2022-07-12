import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@app/hooks'
import { setAuthData } from '@app/features/auth/authSlice';
import { authorize } from '@app/features/auth/authRequests';
import SignInForm from './SignInForm'


export interface ISignInFormFields {
  username?: string
  password?: string,
}

export default function SignIn() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const [ errors, setErrors ] = React.useState({})

  const formValidation = (form: FormData): ISignInFormFields => {
    const errors: ISignInFormFields = {}
    const password = form.get('password')?.toString()
    const username = form.get('username')?.toString()

    if (!password || password.length < 6) {
      errors['password'] = 'The minimum length of a password is 6 characters'
    }
    if (!username || username.length < 0) {
      errors['username'] = "Username can't be empty"
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
    const username = data.get('username')!.toString()
    const password = data.get('password')!.toString()
    const { response, error } = await authorize(username, password)
    if (response) {
      dispatch(setAuthData(response))
      navigate('/')
      return
    }
    if (error) {
      setErrors({
        'username': error,
        'password': error
      })
    }
  };

  return (
    <SignInForm handleSubmit={handleSubmit} errors={errors} />
  );
}
