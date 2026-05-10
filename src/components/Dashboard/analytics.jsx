import { useEffect, useMemo, useState } from 'react'
import {
	FiAlertCircle,
	FiArrowRight,
	FiBarChart2,
	FiBell,
	FiBox,
	FiCalendar,
	FiClock,
	FiCpu,
	FiDownload,
	FiGrid,
	FiHome,
	FiLogOut,
	FiMenu,
	FiMessageSquare,
	FiPackage,
	FiSearch,
	FiSettings,
	FiShoppingCart,
	FiStar,
	FiTrendingUp,
	FiTruck,
	FiX,
} from 'react-icons/fi'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import NotificationPopup from '../shared/NotificationPopup'

const menuItems = [
	{ key: 'home', label: 'Home', icon: FiHome },
	{ key: 'pos', label: 'POS', icon: FiShoppingCart },
	{ key: 'inventory', label: 'Inventory', icon: FiBox },
	{ key: 'ai-insights', label: 'AI Insights', icon: FiCpu },
	{ key: 'analytics', label: 'Analytics', icon: FiTrendingUp },
	{ key: 'notifications', label: 'Notifications', icon: FiMessageSquare },
]

const tabs = ['Live Overview', 'Movement', 'Category Mix', 'Audit']
const EMPTY_ITEMS = []

const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 2,
})

function parseTimestamp(value) {
	if (!value) {
		return null
	}

	if (typeof value.toDate === 'function') {
		return value.toDate()
	}

	const date = new Date(value)
	return Number.isNaN(date.getTime()) ? null : date
}

function normalizeCategory(value) {
	return String(value || 'Uncategorized').trim() || 'Uncategorized'
}

function formatRelativeTime(date) {
	if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
		return 'Recently'
	}

	const diffMs = date.getTime() - Date.now()
	const absDiff = Math.abs(diffMs)
	const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

	if (absDiff < 60_000) {
		return 'Just now'
	}

	if (absDiff < 3_600_000) {
		return formatter.format(Math.round(diffMs / 60_000), 'minute')
	}

	if (absDiff < 86_400_000) {
		return formatter.format(Math.round(diffMs / 3_600_000), 'hour')
	}

	return formatter.format(Math.round(diffMs / 86_400_000), 'day')
}

function getInventoryStatus(quantity, threshold) {
	if (quantity <= 0) {
		return {
			label: 'Out of Stock',
			statusClass: 'bg-rose-100 text-rose-700',
		}
	}

	if (quantity <= threshold) {
		return {
			label: 'Low Stock',
			statusClass: 'bg-orange-100 text-orange-700',
		}
	}

	return {
		label: 'In Stock',
		statusClass: 'bg-emerald-100 text-emerald-700',
	}
}

function Sidebar({ mobile = false, onClose, activePage = 'analytics', onNavigate = () => {}, onLogout = () => {}, profile = null, user = null }) {
	const displayName = profile?.fullName || user?.displayName || user?.email?.split('@')[0] || 'Account'
	const subtitle = profile?.businessName || profile?.industry || user?.email || 'Signed in'

	return (
		<aside className={`flex h-screen w-68 flex-col overflow-hidden border-r border-slate-200 bg-white ${mobile ? 'shadow-2xl' : ''}`}>
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
						const isClickable = item.key === 'home' || item.key === 'pos' || item.key === 'inventory' || item.key === 'analytics' || item.key === 'ai-insights'

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
									className={`flex w-full items-center gap-3 rounded-lg border-0 px-3 py-2.5 text-left text-sm font-medium transition ${isActive ? 'bg-[#F5EBD9] text-slate-900' : 'text-slate-600 hover:bg-[#F5EBD9] hover:text-slate-900'}`}
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
							{displayName.slice(0, 1).toUpperCase()}
						</div>
						<div>
							<p className="text-xs font-semibold text-slate-800">{displayName}</p>
							<p className="text-[11px] text-slate-500">{subtitle}</p>
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

function Analytics({ onNavigate = () => {}, onLogout = () => {}, profile = null, user = null }) {
	const [activeTab, setActiveTab] = useState('Live Overview')
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
	const [showNotification, setShowNotification] = useState(false)
	const [inventoryItems, setInventoryItems] = useState([])

	useEffect(() => {
		if (!user?.uid) {
			return undefined
		}

		const inventoryRef = collection(db, 'users', user.uid, 'inventory')
		const unsubscribe = onSnapshot(
			inventoryRef,
			(snapshot) => {
				const nextItems = snapshot.docs.map((docSnapshot) => {
					const data = docSnapshot.data()
					const quantity = Number(data.quantity ?? 0) || 0
					const lowStockThreshold = Number(data.lowStockThreshold ?? 10) || 10
					const createdAt = parseTimestamp(data.createdAt)
					const updatedAt = parseTimestamp(data.updatedAt) || createdAt

					return {
						id: docSnapshot.id,
						name: data.name || 'Unnamed Item',
						sku: String(data.sku || '').trim(),
						category: normalizeCategory(data.category),
						supplier: String(data.supplier || 'Unknown Supplier').trim() || 'Unknown Supplier',
						quantity,
						lowStockThreshold,
						createdAt,
						updatedAt,
					}
				})

				setInventoryItems(nextItems)
			},
			() => {
				setInventoryItems([])
			},
		)

		return () => unsubscribe()
	}, [user?.uid])

	const activeInventoryItems = user?.uid ? inventoryItems : EMPTY_ITEMS

	const analytics = useMemo(() => {
		const now = new Date()
		const sevenDaysAgo = new Date(now)
		sevenDaysAgo.setDate(now.getDate() - 6)

		const dailyCounts = Array.from({ length: 7 }, (_, index) => {
			const date = new Date(now)
			date.setDate(now.getDate() - (6 - index))
			return { label: date.toLocaleDateString('en-US', { weekday: 'short' }), date, count: 0, quantity: 0 }
		})

		const categoryMap = new Map()
		const supplierMap = new Map()
		let totalUnits = 0
		let lowStockCount = 0
		let outOfStockCount = 0
		let recentUpdates = 0
		let missingSkuCount = 0
		let staleCount = 0

		for (const item of activeInventoryItems) {
			totalUnits += item.quantity

			if (!item.sku) {
				missingSkuCount += 1
			}

			const status = getInventoryStatus(item.quantity, item.lowStockThreshold)
			if (status.label === 'Low Stock') {
				lowStockCount += 1
			}
			if (status.label === 'Out of Stock') {
				outOfStockCount += 1
			}

			const categoryKey = item.category || 'Uncategorized'
			const categoryEntry = categoryMap.get(categoryKey) || { name: categoryKey, units: 0, items: 0 }
			categoryEntry.units += item.quantity
			categoryEntry.items += 1
			categoryMap.set(categoryKey, categoryEntry)

			const supplierKey = item.supplier || 'Unknown Supplier'
			const supplierEntry = supplierMap.get(supplierKey) || { name: supplierKey, items: 0, units: 0 }
			supplierEntry.items += 1
			supplierEntry.units += item.quantity
			supplierMap.set(supplierKey, supplierEntry)

			const referenceDate = item.updatedAt || item.createdAt
			if (referenceDate instanceof Date && !Number.isNaN(referenceDate.getTime())) {
				if (referenceDate >= sevenDaysAgo) {
					recentUpdates += 1
				}

				const dayIndex = dailyCounts.findIndex((entry) => {
					return (
						entry.date.getFullYear() === referenceDate.getFullYear() &&
						entry.date.getMonth() === referenceDate.getMonth() &&
						entry.date.getDate() === referenceDate.getDate()
					)
				})

				if (dayIndex >= 0) {
					dailyCounts[dayIndex].count += 1
					dailyCounts[dayIndex].quantity += item.quantity
				}

				if (now.getTime() - referenceDate.getTime() > 30 * 86_400_000) {
					staleCount += 1
				}
			}
		}

		const totalItems = activeInventoryItems.length
		const inStockCount = totalItems - lowStockCount - outOfStockCount
		const coverageRate = totalItems === 0 ? 0 : Math.round((inStockCount / totalItems) * 100)
		const reorderPressure = totalItems === 0 ? 0 : Math.round(((lowStockCount + outOfStockCount) / totalItems) * 100)

		const categories = Array.from(categoryMap.values())
			.sort((left, right) => right.units - left.units)
			.slice(0, 4)

		const suppliers = Array.from(supplierMap.values())
			.sort((left, right) => right.units - left.units)
			.slice(0, 4)

		const recentItems = [...activeInventoryItems]
			.sort((left, right) => {
				const leftTime = left.updatedAt?.getTime() || left.createdAt?.getTime() || 0
				const rightTime = right.updatedAt?.getTime() || right.createdAt?.getTime() || 0
				return rightTime - leftTime
			})
			.slice(0, 5)

		return {
			totalItems,
			totalUnits,
			lowStockCount,
			outOfStockCount,
			recentUpdates,
			missingSkuCount,
			staleCount,
			coverageRate,
			reorderPressure,
			categories,
			suppliers,
			dailyCounts,
			recentItems,
		}
	}, [activeInventoryItems])

	const monthlyTrend = useMemo(() => analytics.dailyCounts.map((entry) => entry.quantity), [analytics.dailyCounts])

	const categoryMix = useMemo(() => {
		const totalUnits = analytics.categories.reduce((sum, category) => sum + category.units, 0)
		return analytics.categories.map((category, index) => ({
			name: category.name,
			share: totalUnits === 0 ? 0 : Math.round((category.units / totalUnits) * 100),
			color: index === 0 ? 'bg-[#8A5B29]' : 'bg-slate-300',
		}))
	}, [analytics.categories])

	const summaryCards = [
		{
			title: 'Live Items',
			value: analytics.totalItems.toLocaleString(),
			change: `${analytics.recentUpdates} updated`,
			changeClass: 'bg-emerald-100 text-emerald-600',
			icon: FiPackage,
			iconClass: 'text-[#8A5B29]',
			iconBg: 'bg-[#F5EEE8]',
		},
		{
			title: 'Stock Units',
			value: analytics.totalUnits.toLocaleString(),
			change: `${analytics.coverageRate}% healthy`,
			changeClass: 'bg-sky-100 text-sky-600',
			icon: FiBarChart2,
			iconClass: 'text-sky-600',
			iconBg: 'bg-sky-50',
		},
		{
			title: 'Reorder Alerts',
			value: `${analytics.lowStockCount + analytics.outOfStockCount}`,
			change: `${analytics.reorderPressure}% of items`,
			changeClass: 'bg-orange-100 text-orange-600',
			icon: FiAlertCircle,
			iconClass: 'text-orange-600',
			iconBg: 'bg-orange-50',
		},
		{
			title: 'Supplier Network',
			value: `${analytics.suppliers.length}`,
			change: `${analytics.missingSkuCount} missing SKU`,
			changeClass: 'bg-slate-100 text-slate-600',
			icon: FiTruck,
			iconClass: 'text-amber-600',
			iconBg: 'bg-amber-50',
		},
	]

	const topAlert = analytics.lowStockCount + analytics.outOfStockCount > 0
		? `${analytics.lowStockCount + analytics.outOfStockCount} items need attention before the next restock cycle.`
		: 'All tracked items are above their reorder threshold.'

	const liveValueLabel = `${currencyFormatter.format(analytics.totalUnits * 12.5)} estimated stock value`

	return (
		<div className="flex h-screen overflow-hidden bg-[#F8F6F3] text-slate-900">
			<div className="hidden lg:block">
				<Sidebar activePage="analytics" onNavigate={onNavigate} onLogout={onLogout} profile={profile} user={user} />
			</div>

			{mobileSidebarOpen ? (
				<div className="fixed inset-0 z-50 bg-slate-950/30 lg:hidden">
					<div className="h-full w-72">
						<Sidebar
							mobile
							onClose={() => setMobileSidebarOpen(false)}
							activePage="analytics"
							onNavigate={onNavigate}
							onLogout={onLogout}
							profile={profile}
							user={user}
						/>
					</div>
				</div>
			) : null}

			<main className="flex-1 overflow-y-auto">
				<div className="mx-auto w-full max-w-[1600px] px-4 py-4 md:px-6 md:py-5">
					<header className="mb-5 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-[0_1px_1px_rgba(15,23,42,0.04)] backdrop-blur-sm md:flex-row md:items-center md:justify-between md:p-5">
						<div className="flex items-center gap-3">
							<button
								type="button"
								onClick={() => setMobileSidebarOpen(true)}
								className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 lg:hidden"
							>
								<FiMenu />
							</button>
							<div>
								<p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A5B29]">Analytics</p>
								<h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 md:text-[2.35rem]">Live inventory analytics</h1>
								<p className="mt-1 text-sm font-medium text-slate-500">Real-time performance signals derived from your Firestore inventory collection.</p>
							</div>
						</div>

						<div className="flex flex-col gap-3 md:items-end">
							<div className="flex flex-wrap items-center gap-2">
								<div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
									<FiSearch className="text-sm" />
									<span>Search analytics</span>
								</div>
								<button type="button" className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500">
									<FiBell />
								</button>
								<button type="button" className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500">
									<FiSettings />
								</button>
							</div>
							<button
								type="button"
								onClick={() => setShowNotification(true)}
								className="inline-flex items-center gap-2 rounded-xl bg-[#8A5B29] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#734A20]"
							>
								<FiDownload className="text-sm" />
								Export snapshot
							</button>
						</div>
					</header>

					{showNotification ? <NotificationPopup message="Analytics snapshot is ready to export." onClose={() => setShowNotification(false)} /> : null}

					<div className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
						{tabs.map((tab) => (
							<button
								key={tab}
								type="button"
								onClick={() => setActiveTab(tab)}
								className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${activeTab === tab ? 'bg-[#F5EBD9] text-slate-900' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
							>
								{tab}
							</button>
						))}
					</div>

					<section className="space-y-5">
						<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
							{summaryCards.map((card) => {
								const Icon = card.icon

								return (
									<article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
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
						</div>

						<div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
							<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
								<div className="mb-5 flex items-center justify-between">
									<div>
										<h3 className="text-[1.8rem] font-bold tracking-tight text-slate-900">Movement Trend</h3>
										<p className="text-sm font-medium text-slate-400">Inventory activity over the last seven days</p>
									</div>
									<div className="inline-flex items-center gap-2 rounded-full bg-[#F5EEE8] px-3 py-1 text-xs font-semibold text-[#8A5B29]">
										<FiClock className="text-xs" />
										Updated live
									</div>
								</div>

								<div className="relative rounded-xl border border-slate-100 bg-slate-50/60 p-4">
									<div className="absolute left-3 top-3 rounded-md bg-slate-800 px-3 py-2 text-xs font-semibold text-white">
										{`${analytics.recentUpdates} updates this week`}
									</div>
									<div className="mt-10 grid h-52 grid-cols-7 items-end gap-3">
										{analytics.dailyCounts.map((entry, index) => {
											const maxCount = Math.max(...analytics.dailyCounts.map((item) => item.count), 1)
											return (
												<div key={entry.label} className="flex h-full items-end justify-center">
													<div
														className={`w-full rounded-t-md ${index === 4 ? 'bg-[#8A5B29]' : 'bg-[#E3D8D0]'}`}
														style={{ height: `${Math.max((entry.count / maxCount) * 100, entry.count === 0 ? 3 : 14)}%` }}
														title={`${entry.label}: ${entry.count} updates`}
													/>
												</div>
											)
										})}
									</div>
									<div className="mt-3 grid grid-cols-7 text-center text-xs font-semibold text-slate-400">
										{analytics.dailyCounts.map((entry) => (
											<span key={entry.label}>{entry.label}</span>
										))}
									</div>
								</div>
							</article>

							<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
								<div className="mb-3 flex items-center justify-between">
									<p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Health Score</p>
									<FiAlertCircle className="text-slate-400" />
								</div>
								<p className="text-[2rem] font-extrabold tracking-tight text-slate-900">{analytics.coverageRate}% Ready</p>
								<div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E7E1DE]">
									<div className="h-full rounded-full bg-[#8A5B29]" style={{ width: `${Math.max(analytics.coverageRate, 4)}%` }} />
								</div>
								<div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-500">
									<span>{analytics.totalItems} tracked items</span>
									<span>{analytics.lowStockCount + analytics.outOfStockCount} alerts</span>
								</div>

								<div className="mt-5 border-t border-slate-100 pt-5">
									<p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Top Suppliers</p>
									<div className="space-y-3">
										{analytics.suppliers.length ? analytics.suppliers.map((supplier) => (
											<div key={supplier.name} className="flex items-center justify-between">
												<div className="inline-flex items-center gap-2.5">
													<div className="grid h-7 w-7 place-items-center rounded-full bg-blue-100 text-xs font-bold text-slate-600">{supplier.name.slice(0, 2).toUpperCase()}</div>
													<span className="text-sm font-semibold text-slate-700">{supplier.name}</span>
												</div>
												<span className="text-sm font-semibold text-slate-500">{supplier.items} items</span>
											</div>
										)) : (
											<p className="text-sm font-medium text-slate-500">No suppliers tracked yet.</p>
										)}
									</div>
								</div>
							</article>
						</div>

						<div className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
							<article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
								<div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
									<h3 className="text-[1.8rem] font-bold tracking-tight text-slate-900">Reorder Watchlist</h3>
									<button type="button" className="text-sm font-bold text-[#8A5B29] hover:text-[#734A20]">View Inventory</button>
								</div>
								<div className="overflow-x-auto">
									<table className="min-w-full text-left text-sm">
										<thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-400">
											<tr>
												<th className="px-5 py-3 font-bold">Item</th>
												<th className="px-5 py-3 font-bold">Category</th>
												<th className="px-5 py-3 font-bold">Quantity</th>
												<th className="px-5 py-3 text-right font-bold">Status</th>
											</tr>
										</thead>
										<tbody>
											{(analytics.recentItems.length ? analytics.recentItems : activeInventoryItems.slice(0, 5)).map((item) => {
												const status = getInventoryStatus(item.quantity, item.lowStockThreshold)
												return (
													<tr key={item.id} className="border-t border-slate-100">
														<td className="px-5 py-4 font-semibold text-slate-700">
															<div>
																<p>{item.name}</p>
																<p className="mt-0.5 text-xs font-medium text-slate-400">{formatRelativeTime(item.updatedAt || item.createdAt)}</p>
															</div>
														</td>
														<td className="px-5 py-4 font-medium text-slate-500">{item.category}</td>
														<td className="px-5 py-4 font-semibold text-slate-700">{item.quantity}</td>
														<td className="px-5 py-4 text-right">
															<span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.statusClass}`}>{status.label}</span>
														</td>
													</tr>
												)
											})}
										</tbody>
									</table>
								</div>
							</article>

							<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
								<h3 className="text-[1.8rem] font-bold tracking-tight text-slate-900">Live Category Mix</h3>
								<p className="mb-4 text-sm font-medium text-slate-400">Distribution of tracked inventory units</p>
								<div className="space-y-5">
									{categoryMix.length ? categoryMix.map((category) => (
										<div key={category.name}>
											<div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
												<span>{category.name}</span>
												<span>{category.share}%</span>
											</div>
											<div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
												<div className={`h-full ${category.color}`} style={{ width: `${Math.max(category.share, 4)}%` }} />
											</div>
										</div>
									)) : (
										<p className="text-sm font-medium text-slate-500">Add inventory to populate category insights.</p>
									)}
								</div>

								<div className="mt-6 border-t border-slate-100 pt-6">
									<div className="grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
										<div className="flex items-center justify-between">
											<span className="font-semibold text-slate-700">Estimated stock value</span>
											<span className="font-bold text-slate-900">{liveValueLabel}</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="font-semibold text-slate-700">Recent updates</span>
											<span className="font-bold text-slate-900">{analytics.recentUpdates}</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="font-semibold text-slate-700">Stale items</span>
											<span className="font-bold text-slate-900">{analytics.staleCount}</span>
										</div>
									</div>
								</div>
							</article>
						</div>

						<div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
							<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
								<div className="mb-4 flex items-center justify-between">
									<div>
										<h3 className="text-[1.8rem] font-bold tracking-tight text-slate-900">Insight Summary</h3>
										<p className="text-sm font-medium text-slate-400">Automatically generated from current Firestore data</p>
									</div>
									<button type="button" className="inline-flex items-center gap-1 text-sm font-bold text-[#8A5B29] hover:text-[#734A20]">
										Refresh
										<FiArrowRight className="text-sm" />
									</button>
								</div>

								<div className="grid gap-4 md:grid-cols-3">
									<article className="rounded-2xl border border-slate-100 bg-[#EDF2FB] p-4">
										<p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Watchlist</p>
										<p className="mt-2 text-[1.7rem] font-extrabold tracking-tight text-slate-900">{analytics.lowStockCount + analytics.outOfStockCount}</p>
										<p className="mt-1 text-sm font-medium text-slate-500">Items require restocking attention.</p>
									</article>
									<article className="rounded-2xl border border-slate-100 bg-white p-4">
										<p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Coverage</p>
										<p className="mt-2 text-[1.7rem] font-extrabold tracking-tight text-slate-900">{analytics.coverageRate}%</p>
										<p className="mt-1 text-sm font-medium text-slate-500">Tracked items above threshold.</p>
									</article>
									<article className="rounded-2xl border border-slate-100 bg-white p-4">
										<p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Alerts</p>
										<p className="mt-2 text-[1.7rem] font-extrabold tracking-tight text-slate-900">{analytics.missingSkuCount}</p>
										<p className="mt-1 text-sm font-medium text-slate-500">Items missing a SKU identifier.</p>
									</article>
								</div>
							</article>

							<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
								<div className="mb-4 flex items-center justify-between">
									<h3 className="text-[1.8rem] font-bold tracking-tight text-slate-900">Current Signal</h3>
									<span className="rounded-full bg-[#F5EEE8] px-3 py-1 text-xs font-semibold text-[#8A5B29]">Live</span>
								</div>
								<div className="space-y-4">
									<div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
										<div className="flex items-start gap-3">
											<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
												<FiTrendingUp />
											</div>
											<div>
												<p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">Coverage</p>
												<p className="mt-1 text-[1.15rem] font-semibold text-slate-700">{topAlert}</p>
											</div>
										</div>
									</div>
									<div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
										<div className="flex items-start gap-3">
											<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600">
												<FiStar />
											</div>
											<div>
												<p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">Largest Category</p>
												<p className="mt-1 text-[1.15rem] font-semibold text-slate-700">{analytics.categories[0]?.name || 'No categories yet'}</p>
											</div>
										</div>
									</div>
									<div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
										<div className="flex items-start gap-3">
											<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
												<FiCalendar />
											</div>
											<div>
												<p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">Trend</p>
												<p className="mt-1 text-[1.15rem] font-semibold text-slate-700">{monthlyTrend.length ? 'Activity is being tracked live across the week.' : 'Waiting for inventory updates to build trends.'}</p>
											</div>
										</div>
									</div>
								</div>
							</article>
						</div>
					</section>
				</div>
			</main>
		</div>
	)
}

export default Analytics