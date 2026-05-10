import { useEffect, useMemo, useState } from 'react'
import {
	FiBell,
	FiBox,
	FiCreditCard,
	FiCpu,
	FiGrid,
	FiHeadphones,
	FiHome,
	FiLogOut,
	FiMenu,
	FiMessageSquare,
	FiMinus,
	FiMonitor,
	FiPlus,
	FiPrinter,
	FiSave,
	FiSearch,
	FiSettings,
	FiShoppingCart,
	FiSmartphone,
	FiTrendingUp,
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

const DEFAULT_CATEGORY = 'All Items'
const DEFAULT_PAYMENT_METHOD = 'Cash'

function parseTimestamp(value) {
	if (!value) return null
	if (typeof value.toDate === 'function') return value.toDate()
	const date = new Date(value)
	return Number.isNaN(date.getTime()) ? null : date
}

function normalizeText(value, fallback = '') {
	return String(value || fallback).trim() || fallback
}

function formatCurrency(value) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 2,
	}).format(value)
}

function formatSku(value) {
	return String(value || '').replace(/^SKU:\s*/i, '').trim()
}

function getProductStatus(quantity) {
	if (quantity <= 0) return 'Out'
	if (quantity <= 10) return 'Low'
	return 'In Stock'
}

function getProductTone(quantity) {
	if (quantity <= 0) return 'from-rose-900 to-rose-600'
	if (quantity <= 10) return 'from-amber-900 to-orange-700'
	return 'from-slate-900 to-slate-700'
}

function getProductIcon(category) {
	const normalized = String(category || '').toLowerCase()
	if (normalized.includes('audio') || normalized.includes('headphone') || normalized.includes('speaker')) return FiHeadphones
	if (normalized.includes('mobile') || normalized.includes('phone') || normalized.includes('accessor')) return FiSmartphone
	if (normalized.includes('monitor') || normalized.includes('workstation') || normalized.includes('display')) return FiMonitor
	return FiCreditCard
}

function Sidebar({ mobile = false, onClose, activePage = 'pos', onNavigate = () => {}, onLogout = () => {}, profile = null, user = null }) {
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
					<button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-slate-500 transition hover:text-slate-700">
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
										if (!isClickable) return
										onNavigate(item.key)
										if (mobile && onClose) onClose()
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
					<button type="button" onClick={onLogout} className="grid h-7 w-7 place-items-center rounded-md text-red-500 transition hover:bg-red-50 hover:text-red-600" aria-label="Log out">
						<FiLogOut />
					</button>
				</div>
			</div>
		</aside>
	)
}

function Pos({ activePage = 'pos', onNavigate = () => {}, onLogout = () => {}, profile = null, user = null }) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY)
	const [paymentMethod, setPaymentMethod] = useState(DEFAULT_PAYMENT_METHOD)
	const [cartItems, setCartItems] = useState([])
	const [inventoryItems, setInventoryItems] = useState([])

	useEffect(() => {
		if (!user?.uid) return undefined

		const inventoryRef = collection(db, 'users', user.uid, 'inventory')
		const unsubscribe = onSnapshot(inventoryRef, (snapshot) => {
			const nextItems = snapshot.docs
				.map((inventoryDoc) => {
					const data = inventoryDoc.data()
					const quantity = Number(data.quantity ?? 0) || 0
					const lowStockThreshold = Number(data.lowStockThreshold ?? 10) || 10
					const createdAt = parseTimestamp(data.createdAt)
					const updatedAt = parseTimestamp(data.updatedAt) || createdAt

					return {
						id: inventoryDoc.id,
						name: normalizeText(data.name, 'Untitled Item'),
						sku: formatSku(data.sku),
						category: normalizeText(data.category, 'Uncategorized'),
						supplier: normalizeText(data.supplier, 'Unknown Supplier'),
						quantity,
						lowStockThreshold,
						updatedAt,
						createdAt,
						unitPrice: Number(data.unitPrice ?? data.price ?? 0) || 0,
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

	const categories = useMemo(() => {
		const uniqueCategories = new Set(inventoryItems.map((item) => item.category).filter(Boolean))
		return [DEFAULT_CATEGORY, ...Array.from(uniqueCategories).sort((left, right) => left.localeCompare(right))]
	}, [inventoryItems])

	const visibleProducts = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase()
		return inventoryItems.filter((item) => {
			const matchesCategory = selectedCategory === DEFAULT_CATEGORY || item.category === selectedCategory
			const matchesSearch =
				!normalizedSearch ||
				[item.name, item.sku, item.category, item.supplier].some((field) => String(field || '').toLowerCase().includes(normalizedSearch))
			return matchesCategory && matchesSearch
		})
	}, [inventoryItems, searchTerm, selectedCategory])

	const cartTotals = useMemo(() => {
		const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
		const discount = subtotal * 0.1
		const tax = (subtotal - discount) * 0.05
		const total = subtotal - discount + tax
		return { subtotal, discount, tax, total }
	}, [cartItems])

	const addToCart = (product) => {
		if (product.quantity <= 0) return

		setCartItems((currentItems) => {
			const existingItem = currentItems.find((item) => item.id === product.id)
			if (existingItem) {
				return currentItems.map((item) => (item.id === product.id ? { ...item, qty: Math.min(item.qty + 1, product.quantity) } : item))
			}

			return [
				...currentItems,
				{
					id: product.id,
					name: product.name,
					price: product.unitPrice,
					qty: 1,
					icon: getProductIcon(product.category),
					tint: product.quantity <= 10 ? 'from-[#D4E8E1] to-[#B9D9CF]' : 'from-[#315753] to-[#274844]',
					maxQty: product.quantity,
				},
			]
		})
	}

	const updateCartQty = (itemId, delta) => {
		setCartItems((currentItems) =>
			currentItems
				.map((item) => {
					if (item.id !== itemId) return item
					const nextQty = item.qty + delta
					if (nextQty <= 0) return null
					return { ...item, qty: Math.min(nextQty, item.maxQty) }
				})
				.filter(Boolean),
		)
	}

	const clearCart = () => setCartItems([])

	return (
		<div className="h-screen overflow-hidden bg-[#f5f6f8] text-slate-900">
			<div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block">
				<Sidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} profile={profile} user={user} />
			</div>

			{isMobileMenuOpen ? (
				<div className="fixed inset-0 z-50 flex lg:hidden">
					<button type="button" onClick={() => setIsMobileMenuOpen(false)} className="h-full flex-1 bg-black/35" aria-label="Close sidebar" />
					<Sidebar mobile onClose={() => setIsMobileMenuOpen(false)} activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} profile={profile} user={user} />
				</div>
			) : null}

			<main className="h-screen overflow-y-auto lg:ml-68">
				<div className="mx-auto max-w-400 px-3 py-3 sm:px-5 lg:px-6">
					<header className="mb-3 rounded-2xl bg-white px-4 py-3 shadow-sm sm:px-5">
						<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
							<div className="flex items-center gap-3">
								<button type="button" onClick={() => setIsMobileMenuOpen(true)} className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-600 lg:hidden" aria-label="Open sidebar">
									<FiMenu />
								</button>
								<div>
									<h1 className="text-2xl font-bold tracking-tight">POS</h1>
									<p className="text-sm text-slate-500">Live inventory-driven checkout</p>
								</div>
							</div>

							<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
								<label className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 sm:w-65">
									<FiSearch className="text-slate-400" />
									<input
										type="text"
										placeholder="Search products by name or SKU..."
										value={searchTerm}
										onChange={(event) => setSearchTerm(event.target.value)}
										className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
									/>
								</label>

								<div className="flex items-center gap-2">
									<button type="button" className="inline-flex items-center gap-2 rounded-lg bg-[#794B1A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#633B14]">
										<FiShoppingCart className="text-sm" />
										Quick Add Sale
									</button>
									<div className="relative">
										<button type="button" onClick={() => setIsNotificationsOpen((prev) => !prev)} className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:text-slate-700" aria-label="Open notifications" aria-expanded={isNotificationsOpen}>
											<FiBell />
										</button>
										<NotificationPopup open={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
									</div>
								</div>
							</div>
						</div>
					</header>

					<section className="grid gap-4 xl:grid-cols-[1fr_340px]">
						<div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
							<label className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
								<FiSearch className="text-slate-400" />
								<input
									type="text"
									placeholder="Search inventory..."
									value={searchTerm}
									onChange={(event) => setSearchTerm(event.target.value)}
									className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
								/>
							</label>

							<div className="mb-5 flex gap-4 overflow-x-auto border-b border-slate-200 pb-2">
								{categories.map((category) => (
									<button
										key={category}
										type="button"
										onClick={() => setSelectedCategory(category)}
										className={`shrink-0 border-b-2 px-4 py-2 text-sm font-semibold transition ${category === selectedCategory ? 'border-[#794B1A] text-[#794B1A]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
									>
										{category}
									</button>
								))}
							</div>

							<div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
								{visibleProducts.length ? visibleProducts.map((product) => {
									const ProductIcon = getProductIcon(product.category)
									const tone = getProductTone(product.quantity)
									const status = getProductStatus(product.quantity)

									return (
										<article key={product.id} className="rounded-xl border border-slate-200 p-2.5 shadow-sm">
											<div className={`mb-3 grid h-30 place-items-center rounded-lg bg-linear-to-br ${tone}`}>
												<ProductIcon className="text-4xl text-white/90" />
											</div>
											<h3 className="truncate text-[23px] font-bold leading-6 text-slate-800">{product.name}</h3>
											<p className="mt-1 text-sm text-slate-400">{product.sku || 'No SKU'} • {status} stock</p>
											<div className="mt-1 text-xs font-semibold text-slate-500">{product.category}</div>
											<div className="mt-3 flex items-center justify-between">
												<p className="text-3xl font-extrabold text-[#794B1A]">{formatCurrency(product.unitPrice || 0)}</p>
												<button type="button" onClick={() => addToCart(product)} disabled={product.quantity <= 0} className="grid h-8 w-8 place-items-center rounded-full bg-[#f2e8dd] text-[#794B1A] transition hover:bg-[#e7d7c6] disabled:cursor-not-allowed disabled:opacity-40">
													<FiPlus />
												</button>
											</div>
										</article>
									)
								}) : (
									<div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500 sm:col-span-2 2xl:col-span-4">
										No inventory matches the current search.
									</div>
								)}
							</div>
						</div>

						<aside className="rounded-2xl border border-slate-200 bg-white shadow-sm">
							<div className="border-b border-slate-200 p-4">
								<div className="flex items-center justify-between">
									<h2 className="inline-flex items-center gap-2 text-2xl font-bold">
										<FiShoppingCart className="text-[#794B1A]" />
										Current Cart
									</h2>
									<button type="button" onClick={clearCart} className="text-sm font-semibold text-slate-400 hover:text-slate-600">Clear</button>
								</div>
							</div>

							<div className="space-y-4 border-b border-slate-200 p-4">
								{cartItems.length ? cartItems.map((item) => {
									const CartIcon = item.icon
									return (
										<div key={item.id} className="flex items-center justify-between gap-3">
											<div className="flex min-w-0 items-center gap-3">
												<div className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-linear-to-br ${item.tint}`}>
													<CartIcon className="text-xl text-white" />
												</div>
												<div className="min-w-0">
													<p className="truncate text-sm font-bold text-slate-800">{item.name}</p>
													<div className="mt-1 inline-flex items-center gap-2">
														<button type="button" onClick={() => updateCartQty(item.id, -1)} className="grid h-5 w-5 place-items-center rounded bg-slate-100 text-slate-600"><FiMinus className="text-[10px]" /></button>
														<span className="text-sm font-semibold text-slate-700">{item.qty}</span>
														<button type="button" onClick={() => updateCartQty(item.id, 1)} className="grid h-5 w-5 place-items-center rounded bg-slate-100 text-slate-600"><FiPlus className="text-[10px]" /></button>
													</div>
												</div>
											</div>
											<div className="shrink-0 text-right">
												<p className="text-lg font-bold text-[#794B1A]">{formatCurrency(item.price * item.qty)}</p>
												<p className="text-xs text-slate-400">{formatCurrency(item.price)} each</p>
											</div>
										</div>
									)
								}) : (
									<p className="text-sm font-medium text-slate-500">Add inventory items to build a live cart.</p>
								)}
							</div>

							<div className="space-y-3 p-4 text-sm">
								<div className="flex justify-between text-slate-500"><span>Subtotal</span><span className="font-semibold text-slate-700">{formatCurrency(cartTotals.subtotal)}</span></div>
								<div className="flex justify-between text-emerald-500"><span>Discount (10%)</span><span className="font-semibold">-{formatCurrency(cartTotals.discount)}</span></div>
								<div className="flex justify-between text-slate-500"><span>Tax (VAT 5%)</span><span className="font-semibold text-slate-700">{formatCurrency(cartTotals.tax)}</span></div>
								<div className="flex justify-between border-t border-slate-200 pt-3 text-xl font-bold"><span>Total</span><span className="text-[#794B1A]">{formatCurrency(cartTotals.total)}</span></div>

								<div className="pt-2">
									<p className="mb-3 text-[11px] font-bold tracking-wider text-slate-400">PAYMENT METHOD</p>
									<div className="grid grid-cols-3 gap-2">
										{[
											{ label: 'Cash', icon: FiCreditCard },
											{ label: 'Card', icon: FiCreditCard },
											{ label: 'Mobile', icon: FiSmartphone },
										].map((method) => {
											const MethodIcon = method.icon
											const isActive = paymentMethod === method.label
											return (
												<button key={method.label} type="button" onClick={() => setPaymentMethod(method.label)} className={`rounded-xl border-2 p-2 text-center text-xs font-semibold ${isActive ? 'border-[#794B1A] bg-[#faf4ee] text-[#794B1A]' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
													<MethodIcon className="mx-auto mb-1 text-sm" />
													{method.label}
												</button>
											)
										})}
									</div>

									<div className="mt-4 grid grid-cols-2 gap-2">
										<button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e9eef5] px-3 py-3 text-sm font-semibold text-slate-600"><FiPrinter />Print</button>
										<button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e9eef5] px-3 py-3 text-sm font-semibold text-slate-600"><FiSave />Save</button>
									</div>

									<button type="button" className="mt-4 w-full rounded-xl bg-[#794B1A] px-4 py-3.5 text-sm font-bold tracking-wide text-white shadow-[0_10px_20px_rgba(121,75,26,0.25)] transition hover:bg-[#633B14]">COMPLETE TRANSACTION</button>
								</div>
							</div>
						</aside>
					</section>
				</div>
			</main>
		</div>
	)
}

export default Pos