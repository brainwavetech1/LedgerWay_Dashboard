import { useState } from 'react'
import { FiBriefcase, FiCoffee, FiHome, FiShoppingBag } from 'react-icons/fi'

const industries = [
	{ key: 'restaurant', label: 'Restaurant / Cafe', icon: FiCoffee },
	{ key: 'retail', label: 'Retail Store', icon: FiShoppingBag },
	{ key: 'wholesale', label: 'Wholesale', icon: FiHome },
	{ key: 'hotel', label: 'Hotel / Lodging', icon: FiBriefcase },
]

function Signup({ onCreateAccount = () => {}, onBackToLogin = () => {} }) {
	const [selectedIndustry, setSelectedIndustry] = useState('restaurant')

	const handleSubmit = (event) => {
		event.preventDefault()
		onCreateAccount()
	}

	return (
		<div className="min-h-screen bg-[#f4f4f4] text-slate-900">
			<div className="grid min-h-screen lg:grid-cols-2">
				<main className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
					<section className="w-full max-w-117.5 bg-[#f4f4f4] px-5 py-6 shadow-none sm:px-8 sm:py-8">
						<h1 className="text-5xl font-bold tracking-tight text-slate-900">Create Your Account</h1>
						<p className="mt-2 text-sm text-slate-500">
							Join LedgerWay to unify your cross-industry dashboard system.
						</p>

						<form className="mt-6 space-y-4" onSubmit={handleSubmit}>
							<div className="grid gap-4 sm:grid-cols-2">
								<div>
									<label htmlFor="fullName" className="mb-2 block text-xs font-semibold text-slate-600">
										Full Name
									</label>
									<input
										id="fullName"
										type="text"
										placeholder="Enter full name"
										className="w-full rounded-md border border-[#ddd7cf] bg-[#f7f4f1] px-3 py-2.5 text-sm outline-none placeholder:text-[#9b7d5c]"
									/>
								</div>

								<div>
									<label htmlFor="businessName" className="mb-2 block text-xs font-semibold text-slate-600">
										Business Name
									</label>
									<input
										id="businessName"
										type="text"
										placeholder="Enter business name"
										className="w-full rounded-md border border-[#ddd7cf] bg-[#f7f4f1] px-3 py-2.5 text-sm outline-none placeholder:text-[#9b7d5c]"
									/>
								</div>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<div>
									<label htmlFor="email" className="mb-2 block text-xs font-semibold text-slate-600">
										Email Address
									</label>
									<input
										id="email"
										type="email"
										placeholder="name@company.com"
										className="w-full rounded-md border border-[#ddd7cf] bg-[#f7f4f1] px-3 py-2.5 text-sm outline-none placeholder:text-[#9b7d5c]"
									/>
								</div>

								<div>
									<label htmlFor="phone" className="mb-2 block text-xs font-semibold text-slate-600">
										Phone Number
									</label>
									<input
										id="phone"
										type="tel"
										placeholder="+1 (555) 000-0000"
										className="w-full rounded-md border border-[#ddd7cf] bg-[#f7f4f1] px-3 py-2.5 text-sm outline-none placeholder:text-[#9b7d5c]"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="password" className="mb-2 block text-xs font-semibold text-slate-600">
									Password
								</label>
								<input
									id="password"
									type="password"
									placeholder="Create a password"
									className="w-full rounded-md border border-[#ddd7cf] bg-[#f7f4f1] px-3 py-2.5 text-sm outline-none placeholder:text-[#9b7d5c]"
								/>
							</div>

							<div>
								<p className="mb-2 text-xs font-semibold text-slate-600">Select Your Industry</p>
								<div className="grid gap-3 sm:grid-cols-2">
									{industries.map((industry) => {
										const Icon = industry.icon
										const isSelected = selectedIndustry === industry.key
										return (
											<button
												key={industry.key}
												type="button"
												onClick={() => setSelectedIndustry(industry.key)}
												className={`rounded-xl border px-3 py-4 text-center transition ${
													isSelected
														? 'border-[#8A5B29] bg-[#f5ebd9]'
														: 'border-[#ddd7cf] bg-[#f7f4f1] hover:bg-[#f5ebd9]'
												}`}
											>
												<Icon className="mx-auto mb-2 text-lg text-[#8A5B29]" />
												<span className="text-sm font-medium text-slate-700">{industry.label}</span>
											</button>
										)
									})}
								</div>
							</div>

							<button
								type="submit"
								className="mt-2 w-full rounded-md bg-[#8A5B29] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#734A20]"
							>
								Start Free Trial
							</button>
						</form>

						<p className="mt-6 text-center text-xs text-slate-500">
							By starting your free trial, you agree to our Terms of Service and Privacy Policy.
						</p>

						<p className="mt-2 text-center text-xs text-slate-500">
							Already have an account?{' '}
							<button type="button" onClick={onBackToLogin} className="font-medium text-[#8A5B29] hover:text-[#734A20]">
								Sign in
							</button>
						</p>
					</section>
				</main>

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
			</div>
		</div>
	)
}

export default Signup
