import { signIn } from '@/auth'

export default function Login() {
  return (
    <div className="flex flex-col items-center">
      <p>Login Page</p>
      <form
        action={async () => {
          'use server'
          await signIn('github', { redirectTo: '/pages/foodmenu' })
        }}
      >
        <button type="submit" className="p-2 bg-red-500">
          Sign in
        </button>
      </form>
    </div>
  )
}
