import { signOut } from '@/auth'

const Logout = async () => {
  return (
    <div className="flex flex-col items-center">
      <p>Logout Page</p>
      <form
        action={async () => {
          'use server'
          await signOut({ redirectTo: '/' })
        }}
      >
        <button type="submit" className="bg-blue-500 p-2">
          Sign Out
        </button>
      </form>
    </div>
  )
}

export default Logout
