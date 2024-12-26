import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <button>
        <Link href="/pages/login">Goto Login Page</Link>
      </button>

      <button>
        <Link href="/pages/logout">Goto Logout Page</Link>
      </button>
    </div>
  )
}
