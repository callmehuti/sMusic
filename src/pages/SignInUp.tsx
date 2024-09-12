import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import styles from '@styles/Authentication.module.scss'

// icons
import { FaFacebook, FaGooglePlus, FaLinkedin } from 'react-icons/fa6'
import { MdErrorOutline } from 'react-icons/md'
import { post } from '@api/index.api'

// toast
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// error
import { errorMessages } from '@constant/error.constant'

import { isAxiosError } from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, signIn } from '@redux/slides/user.slice'
import { userSelector } from '@redux/selectors'
import { getLocalStorage } from '@utils/localStorage'
import { token } from '@constant/index'
import { AppDispatch } from '@redux/store'

interface IValue {
  value: string
  isTyping: boolean
}

interface ICredential {
  username: IValue
  password: IValue
  confirmPassword: IValue
  fullName: IValue
}

interface IError {
  username: string
  password: string
  confirmPassword: string
  fullName: string
}

export default function SignInUp() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(userSelector)
  console.log('user: ', user)

  const [swapForm, setSwapForm] = useState(false)
  const [credential, setCredential] = useState<ICredential>({
    username: {
      value: '',
      isTyping: false
    },
    password: {
      value: '',
      isTyping: false
    },
    confirmPassword: {
      value: '',
      isTyping: false
    },
    fullName: {
      value: '',
      isTyping: false
    }
  })

  const [errors, setErrors] = useState<IError>({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  })

  useEffect(() => {
    const middleware = () => {
      // console.log(Object.keys(credential));
      // console.log(credential);
      const objError: IError = {
        username: '',
        password: '',
        confirmPassword: '',
        fullName: ''
      }
      Object.keys(credential).forEach((key: string) => {
        // is empty
        if (!credential[key as keyof typeof credential].value && credential[key as keyof typeof credential].isTyping) {
          // console.log(key);
          objError[key as keyof typeof objError] = key + ' is required'
        } else {
          objError[key as keyof typeof objError] = ''
        }
      })
      // is matched
      if (
        credential.password.value &&
        credential.confirmPassword.value &&
        credential.password.value !== credential.confirmPassword.value
      ) {
        // console.log(credential.password);
        // console.log(credential.confirmPassword);
        objError.confirmPassword = 'Password is not match'
      } else {
        objError.confirmPassword = ''
      }
      const pwdRegex = new RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)

      // console.log(pwdRegex.test(credential.password.value));

      if (
        credential.password.value &&
        credential.password.isTyping &&
        !pwdRegex.test(credential.password.value)
        // Tindev
      ) {
        objError.password =
          'Password must contain at least one digit or one special character, at least one uppercase letter, and at least one lowercase letter. Password must not contain newline characters.'
      } else {
        objError.password = ''
      }
      // console.log(objError);
      setErrors({ ...errors, ...objError })
    }

    // Tindev@123ne
    // Tindev

    middleware()
  }, [credential])

  // useEffect(() => {
  //   if (user.error) {
  //     console.log(user.error);
  //     toast.error(errorMessages[user.error as keyof typeof errorMessages]);
  //   }
  // }, [user.error]);

  const handleSwap = () => {
    setSwapForm(!swapForm)
  }

  const handleFormInputs = (e: React.ChangeEvent<HTMLInputElement>, inputName: string) => {
    const value = e.target.value
    setCredential((prev) => ({
      ...prev,
      [inputName]: {
        value,
        isTyping: true
      }
    }))
    // credential[inputName as keyof typeof credential ] = value;

    // update error to empty to remove error
    dispatch(clearError())
  }

  // console.log(credential);
  // console.log(errors);

  const onSignUp = async () => {
    try {
      const body = {
        username: credential.username.value,
        password: credential.password.value,
        fullName: credential.fullName.value
      }
      const endpoint = '/register'
      const data = await post(endpoint, body)
      toast.success('Register successfully')
      console.log(data, 'success')
      setTimeout(() => {
        setSwapForm(!swapForm)
      }, 2000)
    } catch (err) {
      if (isAxiosError(err)) {
        console.log(err?.response?.data?.message)
        toast.error(errorMessages[err?.response?.data?.message as keyof typeof errorMessages])
      }
    }
  }

  const onSignIn = async () => {
    try {
      const body = {
        email: credential.username.value,
        password: credential.password.value
      }
      dispatch(signIn(body))
      // const endpoint = "/user/login";
      // const data = await post(endpoint, body);
      // console.log(data.userInfo)
      // dispatch userInfo
    } catch (error) {
      console.log(error)
    }
  }

  // if it has accessToken, user get forced back to / instead of keep staying at /login
  if (getLocalStorage(token.ACT)) {
    return <Navigate to='/' />
  }

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.formLayout}>
          {/* SIGN IN */}
          <div className={`${styles.formWrap} ${styles.signIn} ${!swapForm ? styles.formActive : ''}`}>
            <p className={styles.formHeader}>Sign in</p>
            <div className={styles.socialContainer}>
              <Link to='/'>
                <FaFacebook />
              </Link>
              <Link to='/'>
                <FaGooglePlus />
              </Link>
              <Link to='/'>
                <FaLinkedin />
              </Link>
            </div>
            <span>or use your account</span>
            <div className={styles.inputFieldWrapper}>
              <input
                type='text'
                placeholder='Username'
                className={styles.inputField}
                onChange={(e) => {
                  handleFormInputs(e, 'username')
                }}
              />
            </div>
            {user.error ? <p>{errorMessages[user.error as keyof typeof errorMessages]}</p> : null}
            <div className={styles.inputFieldWrapper}>
              <input
                type='password'
                placeholder='Password'
                className={styles.inputField}
                onChange={(e) => {
                  handleFormInputs(e, 'password')
                }}
              />
            </div>
            <Link to='/'>Forgot your password?</Link>
            <button className={`${styles.signInButton} ${styles.button}`} onClick={onSignIn}>
              SIGN IN
            </button>
            {/* <button onClick={() => dispatch(updateUserInfo({username: 'Sonw'}))}>updateUserInfo</button> */}
          </div>

          {/* SIGN UP */}
          <div className={`${styles.formWrap} ${styles.signUp} ${swapForm ? styles.formActive : ''}`}>
            <p className={styles.formHeader}>Create Account</p>
            <div className={styles.socialContainer}>
              <Link to='/'>
                <FaFacebook />
              </Link>
              <Link to='/'>
                <FaGooglePlus />
              </Link>
              <Link to='/'>
                <FaLinkedin />
              </Link>
            </div>
            <span>or use your account</span>
            <div className={styles.inputFieldWrapper}>
              <input
                type='text'
                placeholder='Username'
                className={`${styles.inputField} ${errors.username ? styles.inputFieldError : null}`}
                onChange={(e) => handleFormInputs(e, 'username')}
              />
              {/* {errors.username ? <p>{errors.username}</p> : ""} */}
              {errors.username ? (
                <div className={styles.errorContainer}>
                  <MdErrorOutline />
                  <p>{errors.username}</p>
                </div>
              ) : null}
            </div>

            <div className={styles.inputFieldWrapper}>
              <input
                type='password'
                placeholder='Password'
                className={`${styles.inputField} ${errors.password ? styles.inputFieldError : null}`}
                onChange={(e) => handleFormInputs(e, 'password')}
              />
              {errors.password ? (
                <div className={styles.errorContainer}>
                  <MdErrorOutline />
                  <p>{errors.password}</p>
                </div>
              ) : null}
            </div>

            <div className={styles.inputFieldWrapper}>
              <input
                type='password'
                placeholder='Confirm password'
                className={`${styles.inputField} ${errors.confirmPassword ? styles.inputFieldError : null}`}
                onChange={(e) => handleFormInputs(e, 'confirmPassword')}
              />
              {errors.confirmPassword ? (
                <div className={styles.errorContainer}>
                  <MdErrorOutline />
                  <p>{errors.confirmPassword}</p>
                </div>
              ) : null}
            </div>

            <div className={styles.inputFieldWrapper}>
              <input
                type='text'
                placeholder='FullName'
                className={`${styles.inputField} ${errors.fullName ? styles.inputFieldError : null}`}
                onChange={(e) => handleFormInputs(e, 'fullName')}
              />
              {errors.fullName ? (
                <div className={styles.errorContainer}>
                  <MdErrorOutline />
                  <p>{errors.fullName}</p>
                </div>
              ) : null}
            </div>

            <button className={`${styles.signInButton} ${styles.button}`} onClick={onSignUp}>
              SIGN UP
            </button>
          </div>

          {/* Intro */}
          <div className={`${styles.introduce} ${swapForm ? styles.active : ''}`}>
            <div>
              <div className={`${styles.signUpIntroduce} ${!swapForm ? styles.introduceActive : ''}`}>
                <p className={styles.introHeader}>Hello Friends !</p>
                <button onClick={handleSwap} className={`${styles.button} ${styles.introBtn}`}>
                  SIGN UP
                </button>
              </div>
              <div className={`${styles.signInIntroduce} ${swapForm ? styles.introduceActive : ''}`}>
                <p className={styles.introHeader}>Welcome Back !</p>
                <p
                  style={{
                    width: '30rem',
                    textAlign: 'center',
                    color: 'white'
                  }}
                >
                  To keep connected with us please login with your personal info
                </p>
                <button onClick={handleSwap} className={`${styles.button} ${styles.introBtn}`}>
                  SIGN IN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  )
}
