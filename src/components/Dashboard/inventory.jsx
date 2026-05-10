import { useEffect, useMemo, useState } from 'react'
import {
	FiAlertTriangle,
	FiBell,
	FiBox,
	FiCpu,
	FiEdit2,
	FiFilter,
	FiGrid,
	FiHome,
	FiList,
	FiLogOut,
	FiMenu,
	FiMessageSquare,
	FiPackage,
	FiPlus,
	FiSearch,
	FiSettings,
	FiShoppingCart,
	FiTrendingUp,
	FiTruck,
	FiTrash2,
	FiX,
	FiArchive,
} from 'react-icons/fi'
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore'
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

const defaultFormState = {
	name: '',
	sku: '',
	category: '',
	supplier: '',
	quantity: '0',
	lowStockThreshold: '10',
}

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

function normalizeSku(value) {
	return String(value || '').replace(/^SKU:\s*/i, '').trim()
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
			quantityClass: 'text-rose-600',
		}
	}

	if (quantity <= threshold) {
		return {
			label: 'Low Stock',
			statusClass: 'bg-orange-100 text-orange-700',
			quantityClass: 'text-[#F05A22]',
		}
	}

	return {
		label: 'In Stock',
		statusClass: 'bg-emerald-100 text-emerald-700',
		quantityClass: 'text-slate-700',
	}
}

function Sidebar({ mobile = false, onClose, activePage = 'inventory', onNavigate = () => {}, onLogout = () => {}, profile = null, user = null }) {
	const displayName = profile?.fullName || user?.displayName || user?.email?.split('@')[0] || 'Account'
	const subtitle = profile?.businessName || profile?.industry || user?.email || 'Signed in'

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

function Inventory({ activePage = 'inventory', onNavigate = () => {}, onLogout = () => {}, profile = null, user = null }) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
	const [inventoryItems, setInventoryItems] = useState([])
	const [selectedCategory, setSelectedCategory] = useState('All Items')
	const [searchTerm, setSearchTerm] = useState('')
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [editingItem, setEditingItem] = useState(null)
	const [formData, setFormData] = useState(defaultFormState)
	const [formError, setFormError] = useState('')
	const [isSaving, setIsSaving] = useState(false)

	useEffect(() => {
		if (!user?.uid) {
			return undefined
		}

		const inventoryRef = collection(db, 'users', user.uid, 'inventory')
		const unsubscribe = onSnapshot(inventoryRef, (snapshot) => {
			const nextItems = snapshot.docs
				.map((inventoryDoc) => {
					const data = inventoryDoc.data()
					const quantity = Number(data.quantity ?? 0)
					const lowStockThreshold = Number(data.lowStockThreshold ?? 10)
					const updatedAt = parseTimestamp(data.updatedAt)
					const createdAt = parseTimestamp(data.createdAt)

					return {
						id: inventoryDoc.id,
						name: data.name || 'Untitled Item',
						sku: normalizeSku(data.sku),
						category: data.category || 'Uncategorized',
						supplier: data.supplier || 'Unknown Supplier',
						quantity,
						lowStockThreshold,
						updatedAt,
						createdAt,
					}
				})
				.sort((left, right) => {
					const leftTime = left.updatedAt?.getTime() || left.createdAt?.getTime() || 0
					const rightTime = right.updatedAt?.getTime() || right.createdAt?.getTime() || 0
					return rightTime - leftTime
				})

			setInventoryItems(nextItems)
		})

		return unsubscribe
	}, [user?.uid])

	const inventoryCategories = useMemo(() => {
		const uniqueCategories = new Set()
		inventoryItems.forEach((item) => {
			if (item.category) {
				uniqueCategories.add(item.category)
			}
		})

		return ['All Items', ...Array.from(uniqueCategories).sort((left, right) => left.localeCompare(right))]
	}, [inventoryItems])

	const activeCategory = inventoryCategories.includes(selectedCategory) ? selectedCategory : 'All Items'

	const visibleItems = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase()

		return inventoryItems.filter((item) => {
			const matchesCategory = activeCategory === 'All Items' || item.category === activeCategory
			const matchesSearch =
				!normalizedSearch ||
				[item.name, item.sku, item.category, item.supplier].some((field) =>
					String(field || '').toLowerCase().includes(normalizedSearch),
				)

			return matchesCategory && matchesSearch
		})
	}, [activeCategory, inventoryItems, searchTerm])

	const summary = useMemo(() => {
		const totalProducts = inventoryItems.length
		const lowStockItems = inventoryItems.filter((item) => item.quantity > 0 && item.quantity <= item.lowStockThreshold).length
		const outOfStockItems = inventoryItems.filter((item) => item.quantity <= 0).length
		const totalUnits = inventoryItems.reduce((accumulator, item) => accumulator + item.quantity, 0)

		return [
			{
				title: 'Total Products',
				value: totalProducts.toLocaleString(),
				meta: inventoryItems.length ? `${inventoryCategories.length - 1} active categories` : 'No inventory records yet',
				metaClass: 'text-emerald-600',
				icon: FiPackage,
				iconClass: 'text-[#8A5B29]',
				borderClass: 'border-slate-200',
			},
			{
				title: 'Low Stock Items',
				value: lowStockItems.toLocaleString(),
				meta: lowStockItems ? 'Requires attention' : 'Healthy stock levels',
				metaClass: lowStockItems ? 'text-[#f05a22]' : 'text-emerald-600',
				icon: FiAlertTriangle,
				iconClass: 'text-[#f6a25e]',
				borderClass: 'border-rose-200',
			},
			{
				title: 'Out of Stock',
				value: outOfStockItems.toLocaleString(),
				meta: outOfStockItems ? 'Critical Action' : 'Nothing missing',
				metaClass: outOfStockItems ? 'text-rose-600' : 'text-slate-500',
				icon: FiArchive,
				iconClass: 'text-rose-400',
				borderClass: 'border-slate-200',
			},
			{
				title: 'Total Units',
				value: totalUnits.toLocaleString(),
				meta: 'Live quantity across inventory',
				metaClass: 'text-blue-600',
				icon: FiShoppingCart,
				iconClass: 'text-blue-500',
				borderClass: 'border-slate-200',
			},
		]
	}, [inventoryCategories.length, inventoryItems])

	const activities = useMemo(() => {
		const recentUpdate = [...inventoryItems].sort((left, right) => {
			const leftTime = left.updatedAt?.getTime() || left.createdAt?.getTime() || 0
			const rightTime = right.updatedAt?.getTime() || right.createdAt?.getTime() || 0
			return rightTime - leftTime
		})[0]
		const lowStockItem = inventoryItems.find((item) => item.quantity > 0 && item.quantity <= item.lowStockThreshold)

		const nextActivities = []

		if (recentUpdate) {
			nextActivities.push({
				title: `Updated: ${recentUpdate.name}`,
				description: `${recentUpdate.quantity} units in ${recentUpdate.category}.`,
				time: recentUpdate.updatedAt ? formatRelativeTime(recentUpdate.updatedAt) : 'Recently',
				icon: FiTruck,
				iconWrap: 'bg-blue-100 text-blue-500',
			})
		}

		if (lowStockItem) {
			nextActivities.push({
				title: `Alert: ${lowStockItem.name} is low`,
				description: `Only ${lowStockItem.quantity} units remain. Threshold is ${lowStockItem.lowStockThreshold}.`,
				time: 'Needs attention',
				icon: FiAlertTriangle,
				iconWrap: 'bg-orange-100 text-orange-500',
			})
		}

		if (!nextActivities.length) {
			nextActivities.push({
				title: 'No stock activity yet',
				description: 'Add inventory items to start tracking movement and alerts.',
				time: 'Waiting for data',
				icon: FiBox,
				iconWrap: 'bg-slate-100 text-slate-500',
			})
		}

		return nextActivities.slice(0, 2)
	}, [inventoryItems])

	const suppliers = useMemo(() => {
		const supplierMap = new Map()
		inventoryItems.forEach((item) => {
			if (!supplierMap.has(item.supplier)) {
				supplierMap.set(item.supplier, new Set())
			}

			supplierMap.get(item.supplier).add(item.category)
		})

		const nextSuppliers = Array.from(supplierMap.entries()).map(([name, categoriesSet]) => ({
			name,
			subtitle: Array.from(categoriesSet).join(' / '),
		}))

		if (!nextSuppliers.length) {
			return [
				{ name: 'No suppliers yet', subtitle: 'Create your first inventory item' },
			]
		}

		return nextSuppliers
	}, [inventoryItems])

	const filteredRows = useMemo(() => {
		return visibleItems.map((item) => {
			const status = getInventoryStatus(item.quantity, item.lowStockThreshold)

			return {
				...item,
				quantityLabel: `${item.quantity.toLocaleString()} units`,
				status: status.label,
				statusClass: status.statusClass,
				quantityClass: status.quantityClass,
			}
		})
	}, [visibleItems])

	const handleOpenAddForm = () => {
		setEditingItem(null)
		setFormData(defaultFormState)
		setFormError('')
		setIsFormOpen(true)
	}

	const handleOpenEditForm = (item) => {
		setEditingItem(item)
		setFormData({
			name: item.name,
			sku: item.sku,
			category: item.category,
			supplier: item.supplier,
			quantity: String(item.quantity),
			lowStockThreshold: String(item.lowStockThreshold),
		})
		setFormError('')
		setIsFormOpen(true)
	}

	const handleCloseForm = () => {
		setIsFormOpen(false)
		setEditingItem(null)
		setFormError('')
		setIsSaving(false)
		setFormData(defaultFormState)
	}

	const handleSubmitInventoryItem = async (event) => {
		event.preventDefault()

		if (!user?.uid) {
			setFormError('Sign in to manage inventory.')
			return
		}

		const name = formData.name.trim()
		const sku = normalizeSku(formData.sku)
		const category = formData.category.trim()
		const supplier = formData.supplier.trim()
		const quantity = Number(formData.quantity)
		const lowStockThreshold = Number(formData.lowStockThreshold)

		if (!name || !sku || !category || !supplier || Number.isNaN(quantity) || Number.isNaN(lowStockThreshold)) {
			setFormError('Complete all inventory fields before saving.')
			return
		}

		setIsSaving(true)
		setFormError('')

		try {
			const payload = {
				name,
				sku,
				category,
				supplier,
				quantity,
				lowStockThreshold,
				updatedAt: serverTimestamp(),
			}

			if (editingItem) {
				await updateDoc(doc(db, 'users', user.uid, 'inventory', editingItem.id), payload)
			} else {
				await addDoc(collection(db, 'users', user.uid, 'inventory'), {
					...payload,
					createdAt: serverTimestamp(),
				})
			}

			handleCloseForm()
		} catch (error) {
			setFormError(error instanceof Error ? error.message : 'Failed to save inventory item.')
			setIsSaving(false)
		}
	}

	const handleDeleteInventoryItem = async (item) => {
		if (!user?.uid) {
			return
		}

		const confirmed = window.confirm(`Delete ${item.name} from inventory?`)
		if (!confirmed) {
			return
		}

		await deleteDoc(doc(db, 'users', user.uid, 'inventory', item.id))
	}

	return (
		<div className="h-screen overflow-hidden bg-[#F4F5F7] text-slate-900">
			<div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block">
				<Sidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} profile={profile} user={user} />
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
						profile={profile}
						user={user}
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
								<h1 className="text-[31px] font-bold leading-none tracking-tight text-slate-900">Inventory</h1>
							</div>

							<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
								<label className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-100/80 px-3 py-2.5 sm:w-65">
									<FiSearch className="text-slate-400" />
									<input
										type="text"
										placeholder="Search data..."
										value={searchTerm}
										onChange={(event) => setSearchTerm(event.target.value)}
										className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
									/>
								</label>

								<div className="flex items-center gap-2">
									<button
										type="button"
										onClick={handleOpenAddForm}
										className="inline-flex items-center gap-2 rounded-lg bg-[#8A5B29] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#734A20]"
									>
										<FiPlus className="text-sm" />
										Add Item
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

					<section className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						{summary.map((card) => {
							const Icon = card.icon
							return (
								<article
									key={card.title}
									className={`rounded-2xl border ${card.borderClass} bg-white p-4 shadow-[0_1px_1px_rgba(15,23,42,0.04)]`}
								>
									<div className="mb-2 flex items-center justify-between">
										<p className="text-sm font-medium text-slate-500">{card.title}</p>
										<div className={`grid h-5 w-5 place-items-center rounded-md bg-slate-100 ${card.iconClass}`}>
											<Icon className="text-xs" />
										</div>
									</div>
									<p className="text-[2.05rem] leading-none font-bold text-slate-800">{card.value}</p>
									<p className={`mt-2 text-sm font-semibold ${card.metaClass}`}>{card.meta}</p>
								</article>
							)
						})}
					</section>

					<section className="mb-5 rounded-2xl border border-slate-200 bg-white shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
						<div className="border-b border-slate-200 p-3 sm:p-4">
							<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
								<div className="flex flex-wrap gap-2">
									{inventoryCategories.map((category) => (
										<button
											key={category}
											type="button"
											onClick={() => setSelectedCategory(category)}
											className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
												activeCategory === category
													? 'bg-[#8A5B29] text-white'
													: 'bg-slate-100 text-slate-600 hover:bg-slate-200'
											}`}
										>
											{category}
										</button>
									))}
								</div>

								<button
									type="button"
									onClick={() => setSelectedCategory('All Items')}
									className="inline-flex items-center gap-2 self-start rounded-lg px-2 py-1 text-sm font-medium text-slate-500 hover:text-slate-700 sm:self-auto"
								>
									<FiFilter className="text-sm" />
									Reset Filters
								</button>
							</div>
						</div>

						<div className="overflow-x-auto">
							<table className="w-full min-w-225 text-left">
								<thead>
									<tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400">
										<th className="px-4 py-3.5 font-semibold">Product Info</th>
										<th className="px-4 py-3.5 font-semibold">Category</th>
										<th className="px-4 py-3.5 font-semibold">Supplier</th>
										<th className="px-4 py-3.5 font-semibold">Quantity</th>
										<th className="px-4 py-3.5 font-semibold">Status</th>
										<th className="px-4 py-3.5 font-semibold">Actions</th>
									</tr>
								</thead>
								<tbody>
									{filteredRows.length ? (
										filteredRows.map((item) => (
											<tr key={item.id} className="border-b border-slate-100 text-sm text-slate-600">
												<td className="px-4 py-4">
													<div className="flex items-center gap-3">
														<div className="grid h-8 w-8 place-items-center rounded-md bg-[#F6EFE9] text-[#8A5B29]">
															<FiList className="text-sm" />
														</div>
														<div>
															<p className="font-semibold text-slate-800">{item.name}</p>
															<p className="text-xs text-slate-400">SKU: {item.sku}</p>
														</div>
													</div>
												</td>
												<td className="px-4 py-4">{item.category}</td>
												<td className="px-4 py-4">{item.supplier}</td>
												<td className={`px-4 py-4 font-semibold ${item.quantityClass}`}>{item.quantityLabel}</td>
												<td className="px-4 py-4">
													<span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.statusClass}`}>
														{item.status}
													</span>
												</td>
												<td className="px-4 py-4">
													<div className="flex items-center gap-3 text-slate-400">
														<button type="button" onClick={() => handleOpenEditForm(item)} className="hover:text-slate-600" aria-label={`Edit ${item.name}`}>
															<FiEdit2 className="text-sm" />
														</button>
														<button type="button" onClick={() => handleDeleteInventoryItem(item)} className="hover:text-slate-600" aria-label={`Delete ${item.name}`}>
															<FiTrash2 className="text-sm" />
														</button>
													</div>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan={6} className="px-4 py-12 text-center text-sm text-slate-500">
												No inventory items match your current search or filter.
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</section>

					<section className="grid gap-4 xl:grid-cols-2">
						<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
							<h2 className="mb-5 text-[1.7rem] font-bold tracking-tight text-slate-900">Recent Stock Activities</h2>
							<div className="space-y-5">
								{activities.map((activity) => {
									const Icon = activity.icon
									return (
										<div key={activity.title} className="flex items-start gap-3">
											<div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${activity.iconWrap}`}>
												<Icon className="text-sm" />
											</div>
											<div>
												<p className="text-lg font-semibold leading-tight text-slate-800">{activity.title}</p>
												<p className="mt-1 text-sm text-slate-400">{activity.description}</p>
												<p className="mt-2 text-xs text-slate-300">{activity.time}</p>
											</div>
										</div>
									)
								})}
							</div>
						</article>

						<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
							<div className="mb-5 flex items-center justify-between">
								<h2 className="text-[1.7rem] font-bold tracking-tight text-slate-900">Active Suppliers</h2>
								<button type="button" className="text-sm font-semibold text-[#8A5B29] hover:text-[#734A20]">
									View All
								</button>
							</div>

							<div className="grid gap-3 sm:grid-cols-2">
								{suppliers.slice(0, 2).map((supplier) => (
									<div
										key={supplier.name}
										className="flex min-h-22 items-center justify-center rounded-xl border border-slate-200 px-4 text-center"
									>
										<div>
											<div className="mx-auto mb-2 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500">
												<FiBox className="text-sm" />
											</div>
											<p className="font-semibold text-slate-800">{supplier.name}</p>
											<p className="text-xs text-slate-400">{supplier.subtitle}</p>
										</div>
									</div>
								))}

								<div className="sm:col-span-2">
									<div className="flex min-h-22 items-center justify-center rounded-xl border border-slate-200 px-4 text-center">
										<div>
											<div className="mx-auto mb-2 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500">
												<FiTrendingUp className="text-sm" />
											</div>
											<p className="font-semibold text-slate-800">{suppliers[2]?.name || 'Add more suppliers'}</p>
											<p className="text-xs text-slate-400">{suppliers[2]?.subtitle || 'More inventory records will populate this card.'}</p>
										</div>
									</div>
								</div>
							</div>
						</article>
					</section>

					{isFormOpen ? (
						<div className="fixed inset-0 z-50 grid place-items-center bg-black/45 px-4 py-6">
							<div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
								<div className="mb-4 flex items-start justify-between gap-4">
									<div>
										<p className="text-sm font-semibold uppercase tracking-wide text-[#8A5B29]">
											{editingItem ? 'Edit Inventory Item' : 'Add Inventory Item'}
										</p>
										<h3 className="text-2xl font-bold tracking-tight text-slate-900">Live inventory record</h3>
									</div>
									<button type="button" onClick={handleCloseForm} className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-slate-500 transition hover:text-slate-700" aria-label="Close form">
										<FiX />
									</button>
								</div>

								<form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmitInventoryItem}>
									<label className="grid gap-1 sm:col-span-2">
										<span className="text-sm font-medium text-slate-600">Product Name</span>
										<input value={formData.name} onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#8A5B29]" placeholder="NeuralLink Pro Gen-2" />
									</label>
									<label className="grid gap-1">
										<span className="text-sm font-medium text-slate-600">SKU</span>
										<input value={formData.sku} onChange={(event) => setFormData((current) => ({ ...current, sku: event.target.value }))} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#8A5B29]" placeholder="BW-NL-2024" />
									</label>
									<label className="grid gap-1">
										<span className="text-sm font-medium text-slate-600">Category</span>
										<input value={formData.category} onChange={(event) => setFormData((current) => ({ ...current, category: event.target.value }))} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#8A5B29]" placeholder="Neuro-gear" />
									</label>
									<label className="grid gap-1">
										<span className="text-sm font-medium text-slate-600">Supplier</span>
										<input value={formData.supplier} onChange={(event) => setFormData((current) => ({ ...current, supplier: event.target.value }))} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#8A5B29]" placeholder="Synapse Tech Corp" />
									</label>
									<label className="grid gap-1">
										<span className="text-sm font-medium text-slate-600">Quantity</span>
										<input type="number" min="0" value={formData.quantity} onChange={(event) => setFormData((current) => ({ ...current, quantity: event.target.value }))} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#8A5B29]" />
									</label>
									<label className="grid gap-1">
										<span className="text-sm font-medium text-slate-600">Low Stock Threshold</span>
										<input type="number" min="0" value={formData.lowStockThreshold} onChange={(event) => setFormData((current) => ({ ...current, lowStockThreshold: event.target.value }))} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#8A5B29]" />
									</label>
									{formError ? <p className="sm:col-span-2 text-sm font-medium text-rose-600">{formError}</p> : null}
									<div className="flex items-center justify-end gap-3 sm:col-span-2">
										<button type="button" onClick={handleCloseForm} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
											Cancel
										</button>
										<button type="submit" disabled={isSaving} className="rounded-lg bg-[#8A5B29] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#734A20] disabled:cursor-not-allowed disabled:opacity-70">
											{isSaving ? 'Saving...' : editingItem ? 'Update Item' : 'Create Item'}
										</button>
									</div>
								</form>
							</div>
						</div>
					) : null}
				</div>
			</main>
		</div>
	)
}

export default Inventory