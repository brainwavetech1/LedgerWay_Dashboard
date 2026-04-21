import { useState } from 'react'
import {
	FiBell,
	FiBox,
	FiCpu,
	FiDownload,
	FiGrid,
	FiHome,
	FiLogOut,
	FiMenu,
	FiMessageSquare,
	FiPercent,
	FiSearch,
	FiSettings,
	FiShoppingCart,
	FiTrendingUp,
	FiBarChart2,
	FiX,
	FiPrinter,
	FiDollarSign,
	FiArchive,
} from 'react-icons/fi'

const menuItems = [
	{ key: 'home', label: 'Home', icon: FiHome },
	{ key: 'pos', label: 'POS', icon: FiShoppingCart },
	{ key: 'inventory', label: 'Inventory', icon: FiBox },
	{ key: 'ai-insights', label: 'AI Insights', icon: FiCpu },
	{ key: 'analytics', label: 'Analytics', icon: FiTrendingUp },
	{ key: 'notifications', label: 'Notifications', icon: FiMessageSquare },
]

const tabs = ['Daily Overview', 'Weekly Trends', 'Monthly Summary', 'Quarterly Audit']

const summaryCards = [
	{
		title: 'Total Revenue',
		value: '$124,500.00',
		change: '+12.5%',
		changeClass: 'bg-emerald-100 text-emerald-600',
		icon: FiDollarSign,
		iconClass: 'text-[#8A5B29]',
		iconBg: 'bg-[#F5EEE8]',
	},
	{
		title: 'Profit Margin',
		value: '32.4%',
		change: '-2.1%',
		changeClass: 'bg-rose-100 text-rose-500',
		icon: FiPercent,
		iconClass: 'text-rose-500',
		iconBg: 'bg-rose-50',
	},
	{
		title: 'Inventory Turnover',
		value: '4.2x',
		change: '+0.5x',
		changeClass: 'bg-emerald-100 text-emerald-600',
		icon: FiArchive,
		iconClass: 'text-blue-500',
		iconBg: 'bg-blue-50',
	},
	{
		title: 'Net Profit',
		value: '$40,460.00',
		change: '+8.4%',
		changeClass: 'bg-emerald-100 text-emerald-600',
		icon: FiTrendingUp,
		iconClass: 'text-amber-500',
		iconBg: 'bg-amber-50',
	},
]

const categoryDistribution = [
	{ name: 'Electronics', value: 42, barClass: 'bg-[#8A5B29]' },
	{ name: 'Home & Living', value: 28, barClass: 'bg-[#E79AB2]' },
	{ name: 'Fashion', value: 18, barClass: 'bg-[#E79AB2]/85' },
	{ name: 'Beauty', value: 12, barClass: 'bg-[#E9C6D4]' },
]

function Sidebar({ mobile = false, onClose, activePage = 'analytics', onNavigate = () => {}, onLogout = () => {} }) {
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
							item.key === 'home' || item.key === 'pos' || item.key === 'inventory' || item.key === 'analytics'
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
					className="mb-4 flex w-full items-center gap-3 rounded-lg border-0 px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-[#F5EBD9] hover:text-slate-900"
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

function Analytics({ activePage = 'analytics', onNavigate = () => {}, onLogout = () => {} }) {
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
								<h1 className="text-[31px] font-bold leading-none tracking-tight text-slate-900">Analytics</h1>
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

					<section className="mb-5">
						<div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
							<div>
								<h2 className="text-[2.1rem] font-extrabold tracking-tight text-slate-900">Reports &amp; Analytics</h2>
								<p className="text-lg text-slate-500">Comprehensive real-time insights into your business performance.</p>
							</div>

							<div className="flex flex-wrap items-center gap-2">
								<button
									type="button"
									className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
								>
									<FiPrinter className="text-sm" />
									Export CSV
								</button>
								<button
									type="button"
									className="inline-flex items-center gap-2 rounded-lg bg-[#8A5B29] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#734A20]"
								>
									<FiDownload className="text-sm" />
									Download PDF
								</button>
							</div>
						</div>

						<div className="border-b border-slate-200">
							<div className="flex gap-4 overflow-x-auto">
								{tabs.map((tab, index) => (
									<button
										key={tab}
										type="button"
										className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold ${
											index === 0
												? 'border-[#8A5B29] text-[#8A5B29]'
												: 'border-transparent text-slate-500 hover:text-slate-700'
										}`}
									>
										{tab}
									</button>
								))}
							</div>
						</div>
					</section>

					<section className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						{summaryCards.map((card) => {
							const Icon = card.icon
							return (
								<article
									key={card.title}
									className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]"
								>
									<div className="mb-6 flex items-center justify-between">
										<div className={`grid h-8 w-8 place-items-center rounded-md ${card.iconBg} ${card.iconClass}`}>
											<Icon className="text-sm" />
										</div>
										<span className={`rounded-md px-2 py-1 text-xs font-semibold ${card.changeClass}`}>{card.change}</span>
									</div>
									<p className="text-lg text-slate-500">{card.title}</p>
									<p className="mt-1 text-[2.1rem] leading-none font-extrabold tracking-tight text-slate-900">{card.value}</p>
								</article>
							)
						})}
					</section>

					<section className="grid gap-4 xl:grid-cols-[1.95fr_1fr]">
						<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
							<div className="mb-5 flex items-center justify-between">
								<h3 className="text-[1.8rem] font-bold tracking-tight text-slate-900">Revenue Trends</h3>
								<div className="flex items-center gap-2">
									<span className="rounded-full bg-[#F5EEE8] px-3 py-1 text-xs font-semibold text-[#8A5B29]">Revenue</span>
									<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">Expenses</span>
								</div>
							</div>

							<div className="relative h-62 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
								<div className="absolute inset-x-4 bottom-4 flex h-45 items-end gap-2 sm:gap-3">
									{[36, 58, 76, 69, 85, 62, 48].map((height, index) => (
										<div
											key={height + index}
											className="flex-1 rounded-t-md bg-[#E4D4C3]"
											style={{ height: `${height}%` }}
										/>
									))}
								</div>

								<div className="absolute inset-x-4 bottom-0 flex justify-between px-1 pb-1 text-[11px] font-semibold text-slate-400 sm:text-xs">
									<span>MON</span>
									<span>TUE</span>
									<span>WED</span>
									<span>THU</span>
									<span>FRI</span>
									<span>SAT</span>
									<span>SUN</span>
								</div>
							</div>
						</article>

						<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
							<h3 className="mb-6 text-[1.8rem] font-bold tracking-tight text-slate-900">Top Categories</h3>

							<div className="space-y-5">
								{categoryDistribution.map((category) => (
									<div key={category.name}>
										<div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
											<span>{category.name}</span>
											<span>{category.value}%</span>
										</div>
										<div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
											<div className={`h-full ${category.barClass}`} style={{ width: `${category.value}%` }} />
										</div>
									</div>
								))}
							</div>

							<div className="mt-6 border-t border-slate-100 pt-6 text-center">
								<button type="button" className="text-sm font-bold text-[#8A5B29] hover:text-[#734A20]">
									View Full Distribution
								</button>
							</div>
						</article>
					</section>
				</div>
			</main>
		</div>
	)
}

export default Analytics
