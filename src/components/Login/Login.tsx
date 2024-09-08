import { Link, Navigate } from 'react-router-dom'
import styles from './login.module.scss'

export default function Login() {
  const auth = false
  if (auth) return <Navigate to={'/'} />
  return (
    <div>
      <div className={styles.logoContainer}>
        <h1 className={styles.logo}>SMusics</h1>
      </div>

      <div className={styles.formContainer}>
        <div>
          <div>
            <label htmlFor='email'>Email</label>
            <input type='text' id='email' placeholder='Enter email or username' />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='text' id='password' placeholder='Enter password' />
          </div>
          <button>Sign in</button>
        </div>
      </div>

      <div className={styles.optionsContainer}>
        <div>
          <p>
            Has no account ?<Link to='/signup'>Sign up</Link>
          </p>
          <p>
            Forgotten password ? <Link to='/reset-password'>Reset password</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
