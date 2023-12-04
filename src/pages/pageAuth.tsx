import { FC, useEffect, useState } from 'react';
import './pageAuth.scss'
import { Input, Login } from '../components/auth';
import { facebook, google } from '../constant'
import authService from '../service/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess, signUpFailure, signUpStart, signUpSuccess } from '../slice/auth';
import CircularProgress from '@mui/material/CircularProgress';
import { RootState } from '../store';

interface Event {
  preventDefault: () => void;
}
// interface InputProps {
//   setState: (value: React.SetStateAction<string|number>) => void,
//   setCheck: (value: React.SetStateAction<boolean>) => void
//  }
// interface InputProps {
//   setCheck: React.Dispatch<React.SetStateAction<boolean>> | React.Dispatch<React.SetStateAction<string>>;
// }

// interface IsetState {
//   setState: (value: string | number) => string | number
// }

// interface setState {
//   InputProps.setState: (value: string | number) => string | number
//   setState: (value: string) => string
// }

// interface InputProps {
//   label: string;
//   type: string;
//   placeholder: string;
//   state: string;
//   setState: React.Dispatch<React.SetStateAction<string>>;
//   check: boolean;
//   setCheck: React.Dispatch<React.SetStateAction<boolean>>;
// }

const PageAuth: FC = () => {

  const [auth, setAuth] = useState<string>('signin');

  const dispatch = useDispatch()
  const { isLoading, loggedIn, error } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [key, setKey] = useState<string>('')
  const [secret, setSecret] = useState<string>('')

  const [nameCheck, setNameCheck] = useState<boolean>(false)
  const [emailCheck, setEmailCheck] = useState<boolean>(false)
  const [keyCheck, setKeyCheck] = useState<boolean>(false)
  const [secretCheck, setSecretCheck] = useState<boolean>(false)

  const clear = () => {
    setName('')
    setEmail('')
    setSecret('')
    setKey('')
    setNameCheck(false)
    setEmailCheck(false)
    setKeyCheck(false)
    setSecretCheck(false)
  }

  const toggleAuth = () => {
    setAuth(prevAuth => prevAuth === 'signup' ? 'signin' : 'signup');
    clear();
  }


  const signup = async (e: Event) => {
    e.preventDefault()
    if (email != '' && secret != '') {
      dispatch(signUpStart())
      const body = { name, email, key, secret }
      try {
        const response = await authService.userSignUp(body)
        dispatch(signUpSuccess(response))
        clear()
        navigate('/')
      } catch (error: string | any) {
        dispatch(signUpFailure(error.response.data.message))
        clear()
      }
    } else {
      if (email == '') {
        setEmailCheck(true)
      }
      if (secret == '') {
        setSecretCheck(true)
      }
      if (name == '') {
        setNameCheck(true)
      }
      if (key == '') {
        setKeyCheck(true)
      }
    }
  }

  const signin = async (e: Event) => {
    e.preventDefault()

    if (email != '' && secret != '') {
      dispatch(signInStart())
      const body = { email, secret }
      try {
        const response = await authService.userSignIn(body)
        dispatch(signInSuccess(response))
        clear()
        navigate('/')
      } catch (error: string | any) {
        dispatch(signInFailure(error.response.data.message))
        clear()
      }
    } else {
      if (email == '') {
        setEmailCheck(true)
      }
      if (secret == '') {
        setSecretCheck(true)
      }
    }
  }

  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn])

  return (
    <div className='auth'>
      <h3 className='title'>{auth === 'signup' ? 'Sing up' : 'Sing in'}</h3>
      <div className='frame1'>
        <Login img={google} text={'Continue with Google'} />
        <Login img={facebook} text={'Continue with Google'} />
      </div>
      <div className='auth-line'>
        <div className='line'></div>
        <div className='box-p'><p className='line-p'>OR</p></div>
      </div>
      <form
        action=''
        className='form'>
        <div className='div-input'>
          <p className='errorp'>{error === null ? '' : `${error}`}</p>
          {auth === 'signup' ?
            <Input label={'name'} type={'text'} placeholder={'Enter your name'} state={name} setState={setName} check={nameCheck} setCheck={setNameCheck} /> :
            <></>
          }
          <Input label={'email'} type={'email'} placeholder={'Enter your email'} state={email} setState={setEmail} check={emailCheck} setCheck={setEmailCheck} />
          <Input label={'password'} type={'text'} placeholder={'Enter your password'} state={secret} setState={setSecret} check={secretCheck} setCheck={setSecretCheck} />
          {auth === 'signup' ?
            <Input label={'password'} type={'text'} placeholder={'Enter your password'} state={key} setState={setKey} check={keyCheck} setCheck={setKeyCheck} /> :
            // <Input label={'secret'} type={'text'} placeholder={'Enter your secret'} state={secret} setState={setSecret} />
            <></>
          }
        </div>
        <div className='div-button'>
          <button className='form-submet' disabled={isLoading} onClick={auth == 'signup' ? signup : signin} type='submit' >
            {!isLoading == true ? 'Button' : < CircularProgress size={20} sx={{ color: '#ede7f6' }} />}
          </button>
          <p>
            {auth === 'signup' ?
              'Already signed up? ' :
              'Need an account? '}{' '}
            {auth === 'signup' ?
              (<span onClick={() => toggleAuth()}>Go to sign in.</span>) :
              (<span onClick={() => toggleAuth()}>Go to sign up.</span>)}
          </p>
        </div>
      </form>
    </div>
  )
}

export default PageAuth;
