import { useState } from 'react'
import {
	FiBell,
	FiBox,
	FiCpu,
	FiGrid,
	FiHome,
	FiLogOut,
	FiMenu,
	FiMessageSquare,
	FiSearch,
	FiSettings,
	FiShoppingCart,
	FiTrendingUp,
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

const statCards = [
	{
		title: "Today's Sales",
		value: '$1,240.00',
		meta: '+12.5% vs yesterday',
		metaColor: 'text-emerald-600',
		icon: FiShoppingCart,
	},
	{
		title: 'Weekly Revenue',
		value: '$8,650.00',
		meta: '+5.4% vs last week',
		metaColor: 'text-emerald-600',
		icon: FiTrendingUp,
	},
	{
		title: 'Low Stock Alerts',
		value: '12 Items',
		meta: 'ATTENTION REQUIRED',
		metaColor: 'text-orange-600',
		icon: FiBell,
	},
]

const products = [
	{ name: 'Premium Basmati Rice', category: 'GRAIN CATEGORY', sold: 124, revenue: '+$2,480.00' },
	{ name: 'Organic Olive Oil', category: 'OILS & VINEGARS', sold: 86, revenue: '+$1,720.00' },
	{ name: 'Ground Arabica Coffee', category: 'BEVERAGES', sold: 52, revenue: '+$1,040.00' },
]

const transactions = [
	{ product: 'Product', amount: '$145.20', time: '2 mins ago' },
	{ product: 'Product', amount: '$89.00', time: '15 mins ago' },
]

function Sidebar({ mobile = false, onClose, activePage = 'home', onNavigate = () => {}, onLogout = () => {} }) {
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

function Overview({ activePage = 'home', onNavigate = () => {}, onLogout = () => {} }) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	return (
		<div className="h-screen overflow-hidden bg-[#f5f6f8] text-slate-900">
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

				<main className="h-screen overflow-y-auto px-3 py-4 sm:px-5 lg:ml-68 lg:px-6 xl:px-7">
					<div className="mx-auto max-w-400">
					<header className="mb-5 rounded-2xl bg-white px-4 py-3 shadow-sm sm:px-5">
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
								<h1 className="text-lg font-semibold">Dashboard</h1>
							</div>

							<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
								<label className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 sm:w-65">
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
										className="inline-flex items-center gap-2 rounded-lg bg-[#794B1A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#633B14]"
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

					  <section className="mb-5 rounded-2xl bg-linear-to-r from-[#794B1A] to-[#8E5A26] p-4 text-white shadow-md sm:p-5">
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<div className="flex items-start gap-3">
								<div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/20">
									<FiBell className="text-lg" />
								</div>
								<div>
									<h2 className="text-xl font-semibold">AI Tip of the Day</h2>
									<p className="mt-1 text-sm text-[#F3E5D6]">
										Your rice sales increased 20% this week. Consider increasing stock levels for the weekend peak.
									</p>
								</div>
							</div>
							<button
								type="button"
								className="self-start rounded-lg bg-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/35 sm:self-auto"
							>
								Apply Suggestion
							</button>
						</div>
					</section>

					<section className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
						{statCards.map((card) => {
							const Icon = card.icon
							return (
								<article key={card.title} className="rounded-2xl bg-white p-5 shadow-sm">
									<div className="mb-4 flex items-center justify-between">
										<p className="text-sm text-slate-500">{card.title}</p>
										<Icon className="text-lg text-[#794B1A]" />
									</div>
									<p className="text-[2rem] font-semibold leading-none text-slate-800">{card.value}</p>
									<p className={`mt-3 text-sm font-medium ${card.metaColor}`}>{card.meta}</p>
								</article>
							)
						})}
					</section>

					<section className="mb-5 grid gap-4 xl:grid-cols-[1.15fr_1fr]">
						<article className="rounded-2xl bg-white p-5 shadow-sm">
							<div className="mb-4 flex items-center justify-between">
								<h3 className="text-lg font-semibold">Weekly Revenue Chart</h3>
							</div>

							<div className="relative h-55 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
								<div className="absolute inset-x-4 bottom-4 flex h-40 items-end gap-2 sm:gap-3">
									{[45, 72, 93, 81, 96].map((height, index) => (
										<div
											key={height + index}
											className="flex-1 rounded-t-md bg-[#d4ccc2]"
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
								</div>
							</div>
						</article>

						<article className="rounded-2xl bg-white p-5 shadow-sm">
							<div className="mb-5 flex items-center justify-between">
								<h3 className="text-lg font-semibold">Top Selling Products</h3>
								<button type="button" className="text-sm font-semibold text-[#794B1A] hover:text-[#633B14]">
									View All
								</button>
							</div>

							<div className="space-y-5">
								{products.map((product) => (
									<div key={product.name} className="flex items-center justify-between gap-3">
										<div className="flex min-w-0 items-center gap-3">
											<div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500">
												<FiBox />
											</div>
											<div className="min-w-0">
												<p className="truncate text-sm font-semibold text-slate-800">{product.name}</p>
												<p className="truncate text-[11px] font-semibold tracking-wide text-slate-400">{product.category}</p>
											</div>
										</div>

										<div className="shrink-0 text-right">
											<p className="text-sm font-semibold text-slate-800">{product.sold} Sold</p>
											<p className="text-xs font-semibold text-emerald-600">{product.revenue}</p>
										</div>
									</div>
								))}
							</div>
						</article>
					</section>

					<section className="rounded-2xl bg-white p-5 shadow-sm">
						<div className="mb-4 flex items-center justify-between">
							<h3 className="text-lg font-semibold">Recent Transactions</h3>
							<button type="button" className="text-sm font-semibold text-[#794B1A] hover:text-[#633B14]">
								View full
							</button>
						</div>

						<div className="overflow-x-auto">
							<table className="min-w-full text-left">
								<thead>
									<tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400">
										<th className="px-2 py-3 font-semibold">Products</th>
										<th className="px-2 py-3 font-semibold">Status</th>
										<th className="px-2 py-3 font-semibold">Amount</th>
										<th className="px-2 py-3 font-semibold">Time</th>
									</tr>
								</thead>
								<tbody>
									{transactions.map((item, index) => (
										<tr key={item.time + index} className="border-b border-slate-100 text-sm">
											<td className="px-2 py-4">
												<div className="flex items-center gap-3">
													<div className="grid h-7 w-7 place-items-center rounded-full bg-stone-200 text-[10px] font-semibold text-stone-700">
														P
													</div>
													<span className="font-medium text-slate-700">{item.product}</span>
												</div>
											</td>
											<td className="px-2 py-4">
												<span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold uppercase text-emerald-700">
													Paid
												</span>
											</td>
											<td className="px-2 py-4 font-semibold text-slate-800">{item.amount}</td>
											<td className="px-2 py-4 text-slate-400">{item.time}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</section>
					</div>
				</main>
		</div>
	)
}

export default Overview
