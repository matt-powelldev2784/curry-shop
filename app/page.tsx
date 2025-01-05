import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center min-w-[320px]">
      <button>
        <Link href="/pages/login">Goto Login Page</Link>
      </button>

      <button>
        <Link href="/pages/logout">Goto Logout Page</Link>
      </button>

      <button>
        <Link href="/pages/menu">Goto Menu Page</Link>
      </button>
    </main>
  )
}
