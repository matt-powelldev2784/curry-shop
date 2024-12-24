import { signIn } from '@/app/api/auth/auth'

export default function Login() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>Login Page</p>
      <form
        action={async () => {
          'use server'
          await signIn('github', { redirectTo: '/pages/logout' })
        }}
      >
        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}
