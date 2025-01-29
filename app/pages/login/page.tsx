import { signIn } from '@/auth'
import Image from 'next/image'
import loginIcon from '@/app/assets/icons/login.png'
import gitHubLogo from '@/app/assets/icons/github.png'

type SearchParams = Promise<{ loginReason: string }>

type LoginProps = {
  searchParams: SearchParams
}

export default async function Login({ searchParams }: LoginProps) {
  const { loginReason } = await searchParams

  return (
    <section className="w-full flex flex-col items-center bg-twLightGrey min-h-screen">
      <form
        className="flexCol w-full max-w-[700px] md:rounded-3xl md:border-2 md:border-twPink px-4 md:mt-8"
        action={async () => {
          'use server'
          await signIn('github', { redirectTo: '/pages/foodmenu' })
        }}
      >
        <Image
          src={loginIcon}
          width={75}
          height={75}
          alt="Person icon"
          className="m-4 mt-8"
        />

        <p className="font-bold text-3xl">LOGIN</p>

        {loginReason && <p className="text-lg">{loginReason}</p>}

        <button
          type="submit"
          className="flexRow gap-4 h-[50px] w-[300px] text-white text-lg font-bold bg-twBlack my-10 rounded active:bg-black/75"
        >
          <Image src={gitHubLogo} width={30} height={30} alt="github logo" />
          Sign in with GitHub
        </button>
      </form>
    </section>
  )
}
