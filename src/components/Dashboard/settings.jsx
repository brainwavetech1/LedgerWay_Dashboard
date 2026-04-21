import { useState } from 'react'
import {
	FiBell,
	FiBox,
	FiBriefcase,
	FiCpu,
	FiCreditCard,
	FiEdit2,
	FiFileText,
	FiGrid,
	FiHome,
	FiLogOut,
	FiMenu,
	FiMessageSquare,
	FiPercent,
	FiSearch,
	FiSettings,
	FiShield,
	FiShoppingCart,
	FiTrendingUp,
	FiUser,
	FiUsers,
	FiX,
} from 'react-icons/fi'

const menuItems = [
	{ key: 'home', label: 'Home', icon: FiHome },
	{ key: 'pos', label: 'POS', icon: FiShoppingCart },
	{ key: 'inventory', label: 'Inventory', icon: FiBox },
	{ key: 'ai-insights', label: 'AI Insights', icon: FiCpu },
	{ key: 'analytics', label: 'Analytics', icon: FiTrendingUp },
	{ key: 'notifications', label: 'Notifications', icon: FiMessageSquare },
]

const settingsMenu = [
	{ label: 'Business Profile', icon: FiBriefcase, active: true },
	{ label: 'Staff Accounts', icon: FiUsers },
	{ label: 'Role Management', icon: FiShield },
	{ label: 'Tax Configuration', icon: FiFileText },
	{ label: 'Notifications', icon: FiBell },
	{ label: 'Billing & Plans', icon: FiCreditCard },
]

const staffAccounts = [
	{ initials: 'JP', name: 'Sarah', surname: 'Miller', role: 'Manager' },
	{ initials: 'MS', name: 'Mike', surname: 'Smith', role: 'Cashier' },
]

const rolePermissions = [
	{ role: 'Owner', access: 'Full Access', icon: FiShield, tone: 'text-emerald-600 bg-emerald-50' },
	{ role: 'Manager', access: 'Staff & Inventory', icon: FiUsers, tone: 'text-amber-600 bg-amber-50' },
	{ role: 'Cashier', access: 'Sales Only', icon: FiUser, tone: 'text-blue-600 bg-blue-50' },
]

function Sidebar({ mobile = false, onClose, activePage = 'settings', onNavigate = () => {}, onLogout = () => {} }) {
	return (
		<aside
			className={`flex h-screen w-68 flex-col overflow-hidden border-r border-slate-200 bg-white ${mobile ? 'shadow-2xl' : ''}`}
		>
			<div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
				<div className="flex items-center gap-3">
					<div className="grid h-9 w-9 place-items-center rounded-md bg-[#794B1A] text-white">
						<FiGrid className="text-base" />
					</div>
					<div>
						<p className="text-sm font-semibold tracking-wide text-slate-800">LOGO</p>
						<p className="text-xs text-slate-500">Business SME</p>
					</div>
				</div>
				{mobile ? (
					<button
						type="button"
						onClick={onClose}
						className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-slate-500 transition hover:text-slate-700"
					>
						<FiX />
					</button>
				) : null}
			</div>

			<nav className="flex-1 px-4 py-6">
				<ul className="space-y-1.5">
					{menuItems.map((item) => {
						const Icon = item.icon
						const isActive = item.key === activePage
						const isClickable =
							item.key === 'home' ||
							item.key === 'pos' ||
							item.key === 'inventory' ||
							item.key === 'analytics' ||
							item.key === 'settings'
						return (
							<li key={item.label}>
								<button
									type="button"
									onClick={() => {
										if (isClickable) {
											onNavigate(item.key)
											if (mobile && onClose) onClose()
										}
									}}
									className={`flex w-full items-center gap-3 rounded-lg border-0 px-3 py-2.5 text-left text-sm font-medium transition ${
										isActive
											? 'bg-[#F5EBD9] text-slate-900'
											: 'text-slate-600 hover:bg-[#F5EBD9] hover:text-slate-900'
									}`}
								>
									<Icon className="text-base" />
									{item.label}
								</button>
							</li>
						)
					})}
				</ul>
			</nav>

			<div className="border-t border-slate-200 p-4">
				<button
					type="button"
					onClick={() => {
						onNavigate('settings')
						if (mobile && onClose) onClose()
					}}
					className={`mb-4 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
						activePage === 'settings'
							? 'bg-[#F5EBD9] text-slate-900'
							: 'text-slate-600 hover:bg-[#F5EBD9] hover:text-slate-900'
					}`}
				>
					<FiSettings className="text-base" />
					Settings
				</button>

				<div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
					<div className="flex items-center gap-2.5">
						<div className="grid h-8 w-8 place-items-center rounded-full bg-[#E7D7C6] text-xs font-bold text-[#794B1A]">
							S
						</div>
						<div>
							<p className="text-xs font-semibold text-slate-800">Sarah Miller</p>
							<p className="text-[11px] text-slate-500">Store Manager</p>
						</div>
					</div>
					<button
						type="button"
						onClick={onLogout}
						className="grid h-7 w-7 place-items-center rounded-md text-red-500 transition hover:bg-red-50 hover:text-red-600"
						aria-label="Log out"
					>
						<FiLogOut />
					</button>
				</div>
			</div>
		</aside>
	)
}

function Settings({ activePage = 'settings', onNavigate = () => {}, onLogout = () => {} }) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	return (
		<div className="h-screen overflow-hidden bg-[#F4F5F7] text-slate-900">
			<div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block">
				<Sidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
			</div>

			{isMobileMenuOpen ? (
				<div className="fixed inset-0 z-50 flex lg:hidden">
					<button
						type="button"
						onClick={() => setIsMobileMenuOpen(false)}
						className="h-full flex-1 bg-black/35"
						aria-label="Close sidebar"
					/>
					<Sidebar
						mobile
						onClose={() => setIsMobileMenuOpen(false)}
						activePage={activePage}
						onNavigate={onNavigate}
						onLogout={onLogout}
					/>
				</div>
			) : null}

			<main className="h-screen overflow-y-auto lg:ml-68">
				<div className="mx-auto max-w-400 px-3 py-4 sm:px-5 lg:px-6 xl:px-7">
					<header className="mb-5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_1px_1px_rgba(15,23,42,0.04)] sm:px-5">
						<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
							<div className="flex items-center gap-3">
								<button
									type="button"
									onClick={() => setIsMobileMenuOpen(true)}
									className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-600 lg:hidden"
									aria-label="Open sidebar"
								>
									<FiMenu />
								</button>
								<h1 className="text-[31px] font-bold leading-none tracking-tight text-slate-900">Settings</h1>
							</div>

							<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
								<label className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-100/80 px-3 py-2.5 sm:w-62">
									<FiSearch className="text-slate-400" />
									<input
										type="text"
										placeholder="Search data..."
										className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
									/>
								</label>

								<div className="flex items-center gap-2">
									<button
										type="button"
										className="inline-flex items-center gap-2 rounded-lg bg-[#8A5B29] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#734A20]"
									>
										<FiShoppingCart className="text-sm" />
										Quick Add Sale
									</button>
									<button
										type="button"
										className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:text-slate-700"
									>
										<FiBell />
									</button>
								</div>
							</div>
						</div>
					</header>

					<section className="grid gap-4 xl:grid-cols-[1fr_2.2fr]">
						<aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
							<p className="mb-4 text-xs font-medium text-slate-400">Enterprise Management</p>

							<div className="space-y-1.5">
								{settingsMenu.slice(0, 5).map((item) => {
									const Icon = item.icon
									return (
										<button
											key={item.label}
											type="button"
											className={`flex w-full items-center gap-3 rounded-xl border-0 px-3 py-2.5 text-left text-base font-semibold transition ${
												item.active
													? 'bg-[#F5EBD9] text-slate-900'
													: 'text-slate-600 hover:bg-[#F5EBD9]'
											}`}
										>
											<Icon className="text-base" />
											{item.label}
										</button>
									)
								})}
							</div>

							<div className="mt-5 border-t border-slate-100 pt-4">
								<button
									type="button"
									className="flex w-full items-center gap-3 rounded-xl border-0 px-3 py-2.5 text-left text-base font-semibold text-slate-600 transition hover:bg-[#F5EBD9]"
								>
									<FiCreditCard className="text-base" />
									Billing &amp; Plans
								</button>
							</div>
						</aside>

						<div className="space-y-4">
							<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
								<div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
									<div>
										<h3 className="text-[1.8rem] font-extrabold tracking-tight text-slate-900">Business Branding</h3>
										<p className="text-sm font-medium text-slate-400">
											Update your logo and store details appearing on receipts.
										</p>
									</div>
									<button
										type="button"
										className="self-start rounded-xl bg-[#8A5B29] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_16px_rgba(138,91,41,0.25)] hover:bg-[#734A20]"
									>
										Save Changes
									</button>
								</div>

								<div className="grid gap-4 lg:grid-cols-[90px_1fr]">
									<div className="relative">
										<div className="grid h-20 w-20 place-items-center rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50 text-rose-400">
											<FiCpu className="text-3xl" />
										</div>
										<button
											type="button"
											className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border border-slate-200 bg-white text-slate-400"
										>
											<FiEdit2 className="text-[10px]" />
										</button>
									</div>

									<div className="grid gap-3 sm:grid-cols-2">
										<div>
											<p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Business Name</p>
											<div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700">
												BrainWave HQ
											</div>
										</div>

										<div>
											<p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Contact Email</p>
											<div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700">
												ops@brainwave.one
											</div>
										</div>

										<div className="sm:col-span-2">
											<p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Business Address</p>
											<div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700">
												123 Innovation Way, San Francisco, CA 94103
											</div>
										</div>
									</div>
								</div>
							</article>

							<div className="grid gap-4 lg:grid-cols-2">
								<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
									<div className="mb-3 flex items-center justify-between">
										<h3 className="inline-flex items-center gap-2 text-[1.5rem] font-bold tracking-tight text-slate-900">
											<FiUsers className="text-[#8A5B29]" />
											Staff Accounts
										</h3>
										<button type="button" className="text-sm font-semibold text-[#8A5B29] hover:text-[#734A20]">
											+ Add New
										</button>
									</div>

									<div className="space-y-3">
										{staffAccounts.map((staff) => (
											<div key={staff.name + staff.surname} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
												<div className="flex items-center justify-between gap-3">
													<div className="flex items-center gap-3">
														<div className="grid h-8 w-8 place-items-center rounded-full bg-[#E7D7C6] text-xs font-bold text-[#8A5B29]">
															{staff.initials}
														</div>
														<div>
															<p className="text-sm font-semibold text-slate-800">
																{staff.name} <span className="ml-1">{staff.surname}</span>
															</p>
															<p className="text-xs text-slate-400">{staff.role}</p>
														</div>
													</div>
													<FiSettings className="text-xs text-slate-400" />
												</div>
											</div>
										))}
									</div>
								</article>

								<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
									<h3 className="mb-4 inline-flex items-center gap-2 text-[1.5rem] font-bold tracking-tight text-slate-900">
										<FiShield className="text-[#8A5B29]" />
										Role Permissions
									</h3>

									<div className="space-y-3">
										{rolePermissions.map((item) => {
											const Icon = item.icon
											return (
												<div key={item.role} className="flex items-center justify-between">
													<div className="inline-flex items-center gap-3">
														<div className={`grid h-6 w-6 place-items-center rounded-full ${item.tone}`}>
															<Icon className="text-[11px]" />
														</div>
														<p className="text-sm font-semibold text-slate-700">{item.role}</p>
													</div>
													<p className="text-xs font-semibold text-slate-400">{item.access}</p>
												</div>
											)
										})}
									</div>
								</article>
							</div>

							<div className="grid gap-4 lg:grid-cols-2">
								<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
									<h3 className="mb-4 inline-flex items-center gap-2 text-[1.5rem] font-bold tracking-tight text-slate-900">
										<FiPercent className="text-[#8A5B29]" />
										Tax Configuration
									</h3>

									<div className="mb-3 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
										<div>
											<p className="text-sm font-semibold text-slate-700">Standard VAT</p>
											<p className="text-xs text-slate-400">Applied to all goods</p>
										</div>
										<div className="inline-flex items-center gap-2">
											<div className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm font-semibold text-slate-700">
												15
											</div>
											<span className="text-sm font-semibold text-slate-500">%</span>
										</div>
									</div>

									<button
										type="button"
										className="w-full rounded-xl border border-dashed border-slate-200 px-3 py-2.5 text-left text-sm font-semibold text-slate-400 hover:border-slate-300"
									>
										+ Add Custom Tax Rule
									</button>
								</article>

								<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
									<h3 className="mb-4 inline-flex items-center gap-2 text-[1.5rem] font-bold tracking-tight text-slate-900">
										<FiBell className="text-[#8A5B29]" />
										Notifications
									</h3>

									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<p className="text-sm font-semibold text-slate-700">Daily Sales Summary</p>
											<div className="h-6 w-12 rounded-full bg-[#8A5B29] p-0.5">
												<div className="ml-auto h-5 w-5 rounded-full bg-white" />
											</div>
										</div>

										<div className="flex items-center justify-between">
											<p className="text-sm font-semibold text-slate-700">Low Stock Alerts</p>
											<div className="h-6 w-12 rounded-full bg-[#8A5B29] p-0.5">
												<div className="ml-auto h-5 w-5 rounded-full bg-white" />
											</div>
										</div>

										<div className="flex items-center justify-between">
											<p className="text-sm font-semibold text-slate-700">Login Notifications</p>
											<div className="h-6 w-12 rounded-full bg-slate-200 p-0.5">
												<div className="h-5 w-5 rounded-full bg-white" />
											</div>
										</div>
									</div>
								</article>
							</div>
						</div>
					</section>

					<footer className="mt-5 border-t border-slate-200 pt-4 text-center text-xs font-semibold text-slate-300">
						&copy; 2024 BrainWave ONE Enterprise. All Rights Reserved.
					</footer>
				</div>
			</main>
		</div>
	)
}

export default Settings
