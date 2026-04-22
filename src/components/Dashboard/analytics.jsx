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
	FiCalendar,
	FiChevronDown,
	FiClock,
	FiMoreVertical,
	FiFlag,
	FiStar,
	FiAlertCircle,
	FiArrowRight,
} from 'react-icons/fi'
import NotificationPopup from '../shared/NotificationPopup'

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

const weeklyRevenueTrend = [0, 0, 0, 4700, 4850, 4725, 0]

const weeklyOrderVolume = [110, 125, 170, 210, 285, 235, 140]

const highVolumeRows = [
	{ slot: 'Friday, 7pm - 9pm', driver: 'Dinner Service & Bar', transactions: 142, avgValue: '$68.50' },
	{ slot: 'Saturday, 6pm - 8pm', driver: 'Dinner Service', transactions: 128, avgValue: '$72.00' },
	{ slot: 'Thursday, 5pm - 7pm', driver: 'Happy Hour', transactions: 95, avgValue: '$34.20' },
]

const monthlyRevenueByWeek = [42, 62, 50, 84]

const monthlyCategoryMix = [
	{ name: 'Food', share: 45, color: 'bg-[#8A5B29]' },
	{ name: 'Beverage', share: 30, color: 'bg-sky-300' },
	{ name: 'Events', share: 15, color: 'bg-amber-300' },
	{ name: 'Other', share: 10, color: 'bg-indigo-200' },
]

const monthlyHighlights = [
	{
		title: 'Highest Weekend Sales',
		detail:
			'Oct 14-15 recorded the highest weekend sales this quarter, largely driven by the Fall Menu launch event.',
		icon: FiStar,
		iconStyle: 'text-blue-500 bg-blue-50',
	},
	{
		title: 'Waste Reduction Goal Met',
		detail:
			'Food waste was reduced by 8% compared to last month, successfully meeting the Q4 sustainability target.',
		icon: FiTrendingUp,
		iconStyle: 'text-emerald-500 bg-emerald-50',
	},
	{
		title: 'Inventory Alert',
		detail: 'Key beverage stocks are depleting faster than projected. Recommended to review reorder points before the holiday season.',
		icon: FiAlertCircle,
		iconStyle: 'text-amber-500 bg-amber-50',
	},
]

const quarterlyMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']

const quarterlyRevenueSeries = [140, 165, 190, 170, 140, 105, 150, 185, 220]

const quarterlyExpenseSeries = [155, 180, 220, 175, 145, 125, 230, 290, 350]

const auditChecklist = [
	{ label: 'Reconcile Bank Accounts', done: true },
	{ label: 'Review Payroll Records', done: true },
	{ label: 'Inventory Valuation', done: true },
	{ label: 'Depreciation Schedules', done: false },
	{ label: 'Verify Tax Filings', done: false },
]

const flaggedTransactions = [
	{
		date: 'Sep 28, 2023',
		description: 'Vendor Payout - Apex Supplies',
		category: 'Inventory',
		amount: '-$12,450.00',
		status: 'Requires Review',
		statusClass: 'bg-rose-100 text-rose-600',
	},
	{
		date: 'Sep 15, 2023',
		description: 'Quarterly Tax Estimate',
		category: 'Taxes',
		amount: '-$45,000.00',
		status: 'Pending Document',
		statusClass: 'bg-blue-100 text-blue-600',
	},
	{
		date: 'Aug 30, 2023',
		description: 'Equipment Lease - Ovens',
		category: 'Capital Expense',
		amount: '-$3,200.00',
		status: 'Cleared',
		statusClass: 'bg-emerald-100 text-emerald-600',
	},
	{
		date: 'Aug 12, 2023',
		description: 'Legal Retainer Fee',
		category: 'Professional Services',
		amount: '-$5,000.00',
		status: 'Cleared',
		statusClass: 'bg-emerald-100 text-emerald-600',
	},
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
							item.key === 'home' ||
							item.key === 'pos' ||
							item.key === 'inventory' ||
							item.key === 'analytics' ||
							item.key === 'ai-insights'
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
	const [activeTab, setActiveTab] = useState('Weekly Trends')
	const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

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
									<div className="relative">
										<button
											type="button"
											onClick={() => setIsNotificationsOpen((prev) => !prev)}
											className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:text-slate-700"
											aria-label="Open notifications"
											aria-expanded={isNotificationsOpen}
										>
											<FiBell />
										</button>
										<NotificationPopup open={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
									</div>
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
								{tabs.map((tab) => (
									<button
										key={tab}
										type="button"
										onClick={() => setActiveTab(tab)}
										className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold ${
											activeTab === tab
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

					{activeTab === 'Weekly Trends' ? (
						<section className="space-y-4">
							<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
								<button
									type="button"
									className="inline-flex w-fit items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600"
								>
									<FiCalendar className="text-sm" />
									Oct 16 - Oct 22, 2023
									<FiChevronDown className="text-xs text-slate-400" />
								</button>

								<div className="flex items-center gap-2">
									<button
										type="button"
										className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
									>
										<FiDownload className="text-sm" />
										Export
									</button>
									<button
										type="button"
										className="rounded-md bg-[#8A5B29] px-4 py-2 text-sm font-semibold text-white hover:bg-[#734A20]"
									>
										Generate Summary
									</button>
								</div>
							</div>

							<div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
								<article className="rounded-2xl border border-slate-200 bg-[#EDF2FB] p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
									<div className="flex items-center justify-between gap-4">
										<div>
											<p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Weekly Win</p>
											<h3 className="mt-2 text-[1.9rem] font-extrabold leading-tight tracking-tight text-slate-900">
												Friday sales increased 15% vs. last week
											</h3>
											<p className="mt-1 text-sm font-medium text-slate-500">
												Driven largely by evening beverage specials and patio reservations.
											</p>
										</div>
										<div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border-2 border-emerald-100 bg-emerald-50 text-emerald-600">
											<FiTrendingUp className="text-xl" />
										</div>
									</div>
								</article>

								<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
									<p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Total Weekly Revenue</p>
									<p className="mt-2 text-[2.3rem] leading-none font-extrabold tracking-tight text-slate-900">$24,850</p>
									<div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-sm font-semibold text-emerald-600">
										<span>+8.4%</span>
										<span className="text-slate-400">vs previous week</span>
									</div>
								</article>
							</div>

							<div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
								<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
									<div className="mb-4 flex items-start justify-between">
										<div>
											<h3 className="text-[1.8rem] font-bold tracking-tight text-slate-900">Revenue Trend</h3>
											<p className="text-sm font-medium text-slate-400">Day-over-day comparison</p>
										</div>
										<button type="button" className="text-slate-400 hover:text-slate-600" aria-label="More options">
											<FiMoreVertical />
										</button>
									</div>

									<div className="relative rounded-xl border border-slate-100 bg-slate-50/60 p-4">
										<div className="absolute left-3 top-3 rounded-md bg-slate-800 px-3 py-2 text-xs font-semibold text-white">
											Friday: $4,850
										</div>
										<div className="mt-10 grid h-50 grid-cols-7 items-end gap-3">
											{weeklyRevenueTrend.map((value, index) => (
												<div key={index} className="flex h-full items-end justify-center">
													<div
														className={`w-full rounded-t-md ${value > 0 ? 'bg-[#8A5B29]' : 'bg-slate-200'}`}
														style={{ height: `${Math.max((value / 5000) * 100, value === 0 ? 2 : 12)}%` }}
													/>
												</div>
											))}
										</div>
										<div className="mt-3 grid grid-cols-7 text-center text-xs font-semibold text-slate-400">
											{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
												<span key={day}>{day}</span>
											))}
										</div>
									</div>
								</article>

								<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
									<h3 className="text-[1.8rem] font-bold tracking-tight text-slate-900">Order Volume</h3>
									<p className="mb-4 text-sm font-medium text-slate-400">By day of week</p>
									<div className="grid h-60 grid-cols-7 items-end gap-2 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
										{weeklyOrderVolume.map((value, index) => (
											<div key={index} className="flex h-full flex-col items-center justify-end gap-2">
												{index === 4 ? (
													<span className="text-xs font-bold text-[#8A5B29]">{value}</span>
												) : null}
												<div
													className={`w-6 rounded-t-md ${index === 4 ? 'bg-[#8A5B29]' : 'bg-[#E3D8D0]'}`}
													style={{ height: `${(value / 300) * 100}%` }}
												/>
												<span className="text-[10px] font-semibold text-slate-400">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
											</div>
										))}
									</div>
								</article>
							</div>

							<article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
								<div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
									<h3 className="text-[1.8rem] font-bold tracking-tight text-slate-900">High-Volume Periods</h3>
									<button type="button" className="text-sm font-bold text-[#8A5B29] hover:text-[#734A20]">
										View Detailed Log
									</button>
								</div>
								<div className="overflow-x-auto">
									<table className="min-w-full text-left text-sm">
										<thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-400">
											<tr>
												<th className="px-5 py-3 font-bold">Day / Time Slot</th>
												<th className="px-5 py-3 font-bold">Category Driver</th>
												<th className="px-5 py-3 font-bold">Transactions</th>
												<th className="px-5 py-3 text-right font-bold">Avg Value</th>
											</tr>
										</thead>
										<tbody>
											{highVolumeRows.map((row) => (
												<tr key={row.slot} className="border-t border-slate-100">
													<td className="px-5 py-4 font-semibold text-slate-700">
														<span className="inline-flex items-center gap-2">
															<FiClock className="text-xs text-slate-400" />
															{row.slot}
														</span>
													</td>
													<td className="px-5 py-4 font-medium text-slate-500">{row.driver}</td>
													<td className="px-5 py-4 font-semibold text-slate-700">{row.transactions}</td>
													<td className="px-5 py-4 text-right font-semibold text-slate-700">{row.avgValue}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</article>
						</section>
					) : activeTab === 'Monthly Summary' ? (
						<section className="space-y-4">
							<div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
								<div>
									<h3 className="text-[2rem] font-extrabold tracking-tight text-slate-900">October 2023 Overview</h3>
									<p className="text-base font-medium text-slate-500">A high-level view of your monthly performance metrics.</p>
								</div>

								<div className="flex items-center gap-2">
									<button
										type="button"
										className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
									>
										<FiCalendar className="text-sm" />
										Oct 2023
									</button>
									<button
										type="button"
										className="inline-flex items-center gap-2 rounded-md bg-[#8A5B29] px-4 py-2 text-sm font-semibold text-white hover:bg-[#734A20]"
									>
										<FiDownload className="text-sm" />
										Export
									</button>
								</div>
							</div>

							<div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
								<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
									<div className="mb-5 flex items-start justify-between gap-3">
										<div>
											<p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Total Monthly Revenue</p>
											<div className="mt-1 flex flex-wrap items-center gap-2">
												<p className="text-[2.2rem] leading-none font-extrabold tracking-tight text-slate-900">$124,500.00</p>
												<span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-600">+12.4%</span>
											</div>
											<p className="mt-1 text-sm font-medium text-slate-500">vs. previous month ($110,765.00)</p>
										</div>
										<div className="grid h-10 w-10 place-items-center rounded-md bg-[#F5EEE8] text-[#8A5B29]">
											<FiBarChart2 className="text-sm" />
										</div>
									</div>

									<div className="grid h-34 grid-cols-4 items-end gap-2 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
										{monthlyRevenueByWeek.map((value, index) => (
											<div key={index} className="flex h-full flex-col items-center justify-end gap-1.5">
												<div
													className={`w-full rounded-t-sm ${index === 3 ? 'bg-[#8A5B29]' : 'bg-[#DDD2CB]'}`}
													style={{ height: `${value}%` }}
												/>
												<span className="text-xs font-semibold text-slate-500">Week {index + 1}</span>
											</div>
										))}
									</div>
								</article>

								<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
									<div className="mb-3 flex items-center justify-between">
										<p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Sales Target</p>
										<FiFlag className="text-slate-400" />
									</div>
									<p className="text-[2rem] font-extrabold tracking-tight text-slate-900">85% Achieved</p>
									<div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E7E1DE]">
										<div className="h-full w-[85%] rounded-full bg-[#8A5B29]" />
									</div>
									<div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-500">
										<span>Current: $124.5k</span>
										<span>Target: $145.0k</span>
									</div>

									<div className="mt-5 border-t border-slate-100 pt-5">
										<p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Top Performing Staff</p>
										<div className="space-y-3">
											<div className="flex items-center justify-between">
												<div className="inline-flex items-center gap-2.5">
													<div className="grid h-7 w-7 place-items-center rounded-full bg-blue-100 text-xs font-bold text-slate-600">JD</div>
													<span className="text-sm font-semibold text-slate-700">Jane Doe</span>
												</div>
												<span className="text-sm font-semibold text-slate-500">$18.2k</span>
											</div>
											<div className="flex items-center justify-between">
												<div className="inline-flex items-center gap-2.5">
													<div className="grid h-7 w-7 place-items-center rounded-full bg-teal-700 text-xs font-bold text-white">MS</div>
													<span className="text-sm font-semibold text-slate-700">Mike Smith</span>
												</div>
												<span className="text-sm font-semibold text-slate-500">$15.4k</span>
											</div>
										</div>
									</div>
								</article>
							</div>

							<div className="grid gap-4 lg:grid-cols-[1fr_1.45fr]">
								<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
									<h4 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Revenue By Category</h4>
									<div className="grid gap-4 sm:grid-cols-[1fr_1.4fr] sm:items-center">
										<div className="grid h-34 place-items-center">
											<div className="text-4xl font-extrabold tracking-tight text-slate-800">Mix</div>
										</div>
										<div className="space-y-2.5">
											{monthlyCategoryMix.map((item) => (
												<div key={item.name} className="flex items-center justify-between text-sm font-semibold text-slate-600">
													<div className="inline-flex items-center gap-2">
														<span className={`h-2.5 w-2.5 rounded-sm ${item.color}`} />
														<span>{item.name}</span>
													</div>
													<span>{item.share}%</span>
												</div>
											))}
										</div>
									</div>
								</article>

								<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
									<div className="mb-4 flex items-center justify-between">
										<h4 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Monthly Highlights</h4>
										<button type="button" className="text-sm font-bold text-[#8A5B29] hover:text-[#734A20]">
											View All
										</button>
									</div>

									<div className="space-y-5">
										{monthlyHighlights.map((item) => {
											const Icon = item.icon
											return (
												<div key={item.title} className="flex items-start gap-3">
													<div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${item.iconStyle}`}>
														<Icon className="text-sm" />
													</div>
													<div>
														<p className="text-[1.2rem] font-bold tracking-tight text-slate-800">{item.title}</p>
														<p className="mt-0.5 text-base font-medium leading-relaxed text-slate-500">{item.detail}</p>
													</div>
												</div>
											)
										})}
									</div>
								</article>
							</div>
						</section>
					) : activeTab === 'Quarterly Audit' ? (
						<section className="space-y-4">
							<div className="grid gap-4 lg:grid-cols-[0.9fr_2.9fr]">
								<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
									<p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Tax Summary (Q3)</p>
									<p className="mt-1 text-[2.3rem] leading-none font-extrabold tracking-tight text-slate-900">$142,500.00</p>
									<p className="mt-2 text-sm font-semibold text-rose-500">-4.2% vs Q2</p>

									<div className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-[1.1rem] font-medium text-slate-600">
										<div className="flex items-center justify-between">
											<span>Sales Tax</span>
											<span className="font-semibold text-slate-800">$85,200</span>
										</div>
										<div className="flex items-center justify-between">
											<span>Payroll Tax</span>
											<span className="font-semibold text-slate-800">$42,100</span>
										</div>
										<div className="flex items-center justify-between">
											<span>Property Tax</span>
											<span className="font-semibold text-slate-800">$15,200</span>
										</div>
									</div>

									<button
										type="button"
										className="mt-5 w-full rounded-md bg-[#EFE6DF] px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-[#e8dbd0]"
									>
										View Tax Details
									</button>
								</article>

								<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
									<div className="mb-4 flex items-center justify-between">
										<div>
											<h3 className="text-[2rem] font-bold tracking-tight text-slate-900">Profit &amp; Loss Comparison</h3>
											<p className="text-sm font-medium text-slate-500">Q1 vs Q2 vs Q3 Revenue Performance</p>
										</div>
										<div className="inline-flex items-center gap-4 text-sm font-semibold">
											<span className="inline-flex items-center gap-1.5 text-slate-600">
												<span className="h-2.5 w-2.5 rounded-full bg-[#8A5B29]" /> Revenue
											</span>
											<span className="inline-flex items-center gap-1.5 text-slate-500">
												<span className="h-2.5 w-2.5 rounded-full bg-[#DDD2CB]" /> Expenses
											</span>
										</div>
									</div>

									<div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
										<div className="relative h-62">
											<svg className="h-full w-full" viewBox="0 0 900 320" preserveAspectRatio="none">
												{[100, 200, 300, 400, 500].map((tick, index) => (
													<line key={tick} x1="0" y1={320 - (tick / 500) * 290} x2="900" y2={320 - (tick / 500) * 290} stroke="#e5e7eb" strokeWidth="1" opacity={index === 0 ? 0 : 1} />
												))}
												<polygon
													points={`${quarterlyExpenseSeries
														.map((value, index) => `${(index / (quarterlyExpenseSeries.length - 1)) * 900},${320 - (value / 500) * 290}`)
														.join(' ')} 900,320 0,320`}
													fill="#DDD2CB"
													opacity="0.35"
												/>
												<polygon
													points={`${quarterlyRevenueSeries
														.map((value, index) => `${(index / (quarterlyRevenueSeries.length - 1)) * 900},${320 - (value / 500) * 290}`)
														.join(' ')} 900,320 0,320`}
													fill="#8A5B29"
													opacity="0.2"
												/>
											</svg>
											<div className="pointer-events-none absolute left-0 top-0 flex h-full w-full">
												<div className="mr-2 flex h-full flex-col justify-between py-1 text-xs font-semibold text-slate-400">
													<span>$500k</span>
													<span>$400k</span>
													<span>$300k</span>
													<span>$200k</span>
													<span>$100k</span>
													<span>$0</span>
												</div>
											</div>
										</div>
										<div className="mt-2 grid grid-cols-9 text-center text-xs font-semibold text-slate-500">
											{quarterlyMonths.map((month) => (
												<span key={month}>{month}</span>
											))}
										</div>
									</div>
								</article>
							</div>

							<div className="grid gap-4 lg:grid-cols-[0.9fr_2.9fr]">
								<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
									<div className="mb-4 flex items-center justify-between">
										<h3 className="text-[2rem] font-bold tracking-tight text-slate-900">Audit Checklist</h3>
										<span className="rounded-full bg-[#EFE6DF] px-2 py-0.5 text-xs font-bold text-[#8A5B29]">60%</span>
									</div>
									<div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-100">
										<div className="h-full w-3/5 rounded-full bg-[#8A5B29]" />
									</div>

									<div className="space-y-3">
										{auditChecklist.map((item) => (
											<label key={item.label} className="flex items-start gap-2.5">
												<input type="checkbox" checked={item.done} readOnly className="mt-0.5 h-4 w-4 accent-[#8A5B29]" />
												<span className={`text-[1.1rem] font-semibold ${item.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
													{item.label}
												</span>
											</label>
										))}
									</div>
								</article>

								<article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
									<div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
										<h3 className="text-[2rem] font-bold tracking-tight text-slate-900">Flagged Transactions (Q3)</h3>
										<button type="button" className="inline-flex items-center gap-1 text-sm font-bold text-[#8A5B29] hover:text-[#734A20]">
											View All
											<FiArrowRight className="text-sm" />
										</button>
									</div>
									<div className="overflow-x-auto">
										<table className="min-w-full text-left text-sm">
											<thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-400">
												<tr>
													<th className="px-4 py-3 font-bold">Date</th>
													<th className="px-4 py-3 font-bold">Description</th>
													<th className="px-4 py-3 font-bold">Category</th>
													<th className="px-4 py-3 font-bold">Amount</th>
													<th className="px-4 py-3 font-bold">Status</th>
												</tr>
											</thead>
											<tbody>
												{flaggedTransactions.map((row) => (
													<tr key={row.date + row.description} className="border-t border-slate-100">
														<td className="px-4 py-3 font-medium text-slate-600">{row.date}</td>
														<td className="px-4 py-3 font-semibold text-slate-800">{row.description}</td>
														<td className="px-4 py-3 font-medium text-slate-500">{row.category}</td>
														<td className="px-4 py-3 font-semibold text-slate-700">{row.amount}</td>
														<td className="px-4 py-3">
															<span className={`inline-flex rounded-xl px-3 py-1 text-xs font-semibold ${row.statusClass}`}>
																{row.status}
															</span>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</article>
							</div>
						</section>
					) : (
						<>
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
						</>
					)}
				</div>
			</main>
		</div>
	)
}

export default Analytics
