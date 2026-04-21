import { useState } from 'react'
import { FiEyeOff, FiLock, FiMail } from 'react-icons/fi'

function Login({ onSignIn = () => {}, onCreateAccount = () => {} }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		onSignIn({ email, password })
	}

	return (
		<div className="min-h-screen bg-[#f4f4f4] text-slate-900">
			<div className="grid min-h-screen lg:grid-cols-2">
				<aside className="relative hidden overflow-hidden bg-[#1d1208] lg:block">
					<div
						className="absolute inset-0 bg-cover bg-left brightness-75"
						style={{
							backgroundImage:
								'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.58) 100%), url("/login.jpg")',
						}}
					/>
					<div className="absolute inset-0 bg-linear-to-l from-white/55 via-white/25 to-transparent backdrop-blur-[2px]" />
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,186,92,0.28),transparent_38%),radial-gradient(circle_at_80%_70%,rgba(255,120,20,0.2),transparent_42%)]" />

					<div className="absolute right-6 bottom-6 left-6 text-white">
						<div className="mb-3 inline-flex items-center gap-3 text-4xl font-bold tracking-tight">
							LedgerWay
						</div>
						<p className="text-2xl text-white/90">Smart Infrastructure for Restaurants &amp; Retail</p>
					</div>
				</aside>

				<main className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
					<section className="w-full max-w-117.5 bg-[#f4f4f4] px-5 py-6 shadow-none sm:px-8 sm:py-8">
						<h1 className="text-5xl font-bold tracking-tight text-slate-900">Welcome Back</h1>
						<p className="mt-2 text-sm text-slate-500">Please enter your details to sign in.</p>

						<form className="mt-6 space-y-4" onSubmit={handleSubmit}>
							<div>
								<label htmlFor="email" className="mb-2 block text-xs font-semibold text-slate-600">
									Email address
								</label>
								<div className="flex items-center gap-2 rounded-md border border-[#ddd7cf] bg-[#f7f4f1] px-3 py-2.5">
									<FiMail className="text-sm text-[#9b7d5c]" />
									<input
										id="email"
										type="email"
										placeholder="Enter your email"
										value={email}
										onChange={(event) => setEmail(event.target.value)}
										className="w-full bg-transparent text-sm outline-none placeholder:text-[#9b7d5c]"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="password" className="mb-2 block text-xs font-semibold text-slate-600">
									Password
								</label>
								<div className="flex items-center gap-2 rounded-md border border-[#ddd7cf] bg-[#f7f4f1] px-3 py-2.5">
									<FiLock className="text-sm text-[#9b7d5c]" />
									<input
										id="password"
										type="password"
										placeholder="*******"
										value={password}
										onChange={(event) => setPassword(event.target.value)}
										className="w-full bg-transparent text-sm outline-none placeholder:text-[#9b7d5c]"
									/>
									<FiEyeOff className="text-sm text-[#9b7d5c]" />
								</div>
							</div>

							<div className="flex items-center justify-between text-xs text-slate-500">
								<label className="inline-flex items-center gap-2">
									<input type="checkbox" className="h-3.5 w-3.5 rounded border border-[#ddd7cf]" />
									Remember me
								</label>
								<button type="button" className="font-medium text-[#8A5B29] hover:text-[#734A20]">
									Forgot Password?
								</button>
							</div>

							<button
								type="submit"
								className="w-full rounded-md bg-[#8A5B29] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#734A20]"
							>
								Sign In
							</button>
						</form>

						<div className="mt-6 flex items-center gap-4 text-xs text-slate-400">
							<div className="h-px flex-1 bg-[#e9e1d9]" />
							<span>or</span>
							<div className="h-px flex-1 bg-[#e9e1d9]" />
						</div>

						<p className="mt-6 text-center text-xs text-slate-500">
							Don&apos;t have an account?{' '}
							<button
								type="button"
								onClick={onCreateAccount}
								className="font-medium text-[#8A5B29] hover:text-[#734A20]"
							>
								Create new account
							</button>
						</p>
					</section>
				</main>
			</div>
		</div>
	)
}

export default Login
