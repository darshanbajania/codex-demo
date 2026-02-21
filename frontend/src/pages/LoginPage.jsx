import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    if (mode === 'login') await login(form.username, form.password)
    else await register(form.username, form.email, form.password)
    navigate('/')
  }

  return (
    <form onSubmit={submit} className='checkout'>
      <h2>{mode === 'login' ? 'Login' : 'Create Account'}</h2>
      <input required placeholder='Username' onChange={(e) => setForm({ ...form, username: e.target.value })} />
      {mode === 'register' && <input required placeholder='Email' onChange={(e) => setForm({ ...form, email: e.target.value })} />}
      <input required placeholder='Password' type='password' onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className='btn'>{mode === 'login' ? 'Login' : 'Register'}</button>
      <button type='button' onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>Switch to {mode === 'login' ? 'Register' : 'Login'}</button>
    </form>
  )
}
