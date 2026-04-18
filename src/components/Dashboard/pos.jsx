import { useState } from 'react'
import {
	FiBell,
	FiBarChart2,
	FiBox,
	FiCreditCard,
	FiGrid,
	FiHeadphones,
	FiHome,
	FiLogOut,
	FiMenu,
	FiMessageSquare,
	FiMinus,
	FiMonitor,
	FiPlus,
	FiSearch,
	FiSettings,
	FiShoppingCart,
	FiSmartphone,
	FiTrendingUp,
	FiX,
	FiPrinter,
	FiSave,
} from 'react-icons/fi'

const menuItems = [
	{ key: 'home', label: 'Home', icon: FiHome },
	{ key: 'pos', label: 'POS', icon: FiShoppingCart },
	{ key: 'inventory', label: 'Inventory', icon: FiBox },
	{ key: 'reports', label: 'Reports', icon: FiBarChart2 },
	{ key: 'analytics', label: 'Analytics', icon: FiTrendingUp },
	{ key: 'notifications', label: 'Notifications', icon: FiMessageSquare },
]

const categories = ['All Items', 'Electronics', 'Accessories', 'Software', 'Workstations', 'Audio']

const products = [
	{ name: 'BrainWave Pro X1', stock: 24, price: '$299.00', icon: FiHeadphones, tint: 'from-slate-900 to-slate-700' },
	{ name: 'Smart Stylus Gen 2', stock: 12, price: '$89.00', icon: FiSmartphone, tint: 'from-teal-900 to-cyan-700' },
	{ name: 'Neural Slate Tablet', stock: 8, price: '$549.00', icon: FiCreditCard, tint: 'from-slate-200 to-slate-50' },
	{ name: 'Infinity View Monitor', stock: 15, price: '$399.00', icon: FiMonitor, tint: 'from-amber-950 to-amber-700' },
]

const cartItems = [
	{ name: 'Smart Stylus Gen 2', price: '$89.00', qty: 1, icon: FiSmartphone, tint: 'from-[#D4E8E1] to-[#B9D9CF]' },
	{ name: 'BrainWave Pro X1', oldPrice: '$598.00', price: '$538.20', qty: 2, icon: FiHeadphones, tint: 'from-[#315753] to-[#274844]' },
]

function Sidebar({ mobile = false, onClose, activePage = 'pos', onNavigate = () => {} }) {
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
						const isClickable = item.key === 'home' || item.key === 'pos'
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
									className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
										isActive
											? 'bg-[#794B1A] text-white shadow-sm'
											: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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
					className="mb-4 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
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
					<FiLogOut className="text-slate-400" />
				</div>
			</div>
		</aside>
	)
}

function Pos({ activePage = 'pos', onNavigate = () => {} }) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	return (
		<div className="h-screen overflow-hidden bg-[#f5f6f8] text-slate-900">
			<div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block">
				<Sidebar activePage={activePage} onNavigate={onNavigate} />
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
					/>
				</div>
			) : null}

			<main className="h-screen overflow-y-auto lg:ml-68">
				<div className="mx-auto max-w-400 px-3 py-3 sm:px-5 lg:px-6">
					<header className="mb-3 rounded-2xl bg-white px-4 py-3 shadow-sm sm:px-5">
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
								<h1 className="text-2xl font-bold tracking-tight">POS</h1>
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

					<section className="grid gap-4 xl:grid-cols-[1fr_340px]">
						<div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
							<label className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
								<FiSearch className="text-slate-400" />
								<input
									type="text"
									placeholder="Search products by name or SKU..."
									className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
								/>
							</label>

							<div className="mb-5 flex gap-4 overflow-x-auto border-b border-slate-200 pb-2">
								{categories.map((category, index) => (
									<button
										key={category}
										type="button"
										className={`shrink-0 border-b-2 px-4 py-2 text-sm font-semibold transition ${
											index === 0
												? 'border-[#794B1A] text-[#794B1A]'
												: 'border-transparent text-slate-500 hover:text-slate-700'
										}`}
									>
										{category}
									</button>
								))}
							</div>

							<div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
								{products.map((product) => {
									const ProductIcon = product.icon
									return (
										<article key={product.name} className="rounded-xl border border-slate-200 p-2.5 shadow-sm">
											<div
												className={`mb-3 grid h-30 place-items-center rounded-lg bg-linear-to-br ${product.tint}`}
											>
												<ProductIcon className="text-4xl text-white/90" />
											</div>
											<h3 className="truncate text-[23px] font-bold leading-6 text-slate-800">{product.name}</h3>
											<p className="mt-1 text-sm text-slate-400">In stock: {product.stock} units</p>
											<div className="mt-3 flex items-center justify-between">
												<p className="text-3xl font-extrabold text-[#794B1A]">{product.price}</p>
												<button
													type="button"
													className="grid h-8 w-8 place-items-center rounded-full bg-[#f2e8dd] text-[#794B1A] transition hover:bg-[#e7d7c6]"
												>
													<FiPlus />
												</button>
											</div>
										</article>
									)
								})}
							</div>
						</div>

						<aside className="rounded-2xl border border-slate-200 bg-white shadow-sm">
							<div className="border-b border-slate-200 p-4">
								<div className="flex items-center justify-between">
									<h2 className="inline-flex items-center gap-2 text-2xl font-bold">
										<FiShoppingCart className="text-[#794B1A]" />
										Current Cart
									</h2>
									<button type="button" className="text-sm font-semibold text-slate-400 hover:text-slate-600">
										Clear
									</button>
								</div>
							</div>

							<div className="space-y-4 border-b border-slate-200 p-4">
								{cartItems.map((item) => {
									const CartIcon = item.icon
									return (
										<div key={item.name} className="flex items-center justify-between gap-3">
											<div className="flex min-w-0 items-center gap-3">
												<div
													className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-linear-to-br ${item.tint}`}
												>
													<CartIcon className="text-xl text-white" />
												</div>
												<div className="min-w-0">
													<p className="truncate text-sm font-bold text-slate-800">{item.name}</p>
													<div className="mt-1 inline-flex items-center gap-2">
														<button
															type="button"
															className="grid h-5 w-5 place-items-center rounded bg-slate-100 text-slate-600"
														>
															<FiMinus className="text-[10px]" />
														</button>
														<span className="text-sm font-semibold text-slate-700">{item.qty}</span>
														<button
															type="button"
															className="grid h-5 w-5 place-items-center rounded bg-slate-100 text-slate-600"
														>
															<FiPlus className="text-[10px]" />
														</button>
													</div>
												</div>
											</div>

											<div className="shrink-0 text-right">
												{item.oldPrice ? <p className="text-xs line-through text-slate-300">{item.oldPrice}</p> : null}
												<p className="text-lg font-bold text-[#794B1A]">{item.price}</p>
											</div>
										</div>
									)
								})}
							</div>

							<div className="space-y-3 p-4 text-sm">
								<div className="flex justify-between text-slate-500">
									<span>Subtotal</span>
									<span className="font-semibold text-slate-700">$627.20</span>
								</div>
								<div className="flex justify-between text-emerald-500">
									<span>Discount (10%)</span>
									<span className="font-semibold">-$59.80</span>
								</div>
								<div className="flex justify-between text-slate-500">
									<span>Tax (VAT 5%)</span>
									<span className="font-semibold text-slate-700">$28.37</span>
								</div>
								<div className="flex justify-between border-t border-slate-200 pt-3 text-xl font-bold">
									<span>Total</span>
									<span className="text-[#794B1A]">$595.77</span>
								</div>

								<div className="pt-2">
									<p className="mb-3 text-[11px] font-bold tracking-wider text-slate-400">PAYMENT METHOD</p>
									<div className="grid grid-cols-3 gap-2">
										<button
											type="button"
											className="rounded-xl border-2 border-[#794B1A] bg-[#faf4ee] p-2 text-center text-xs font-semibold text-[#794B1A]"
										>
											<FiCreditCard className="mx-auto mb-1 text-sm" />
											Cash
										</button>
										<button
											type="button"
											className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-center text-xs font-semibold text-slate-500"
										>
											<FiCreditCard className="mx-auto mb-1 text-sm" />
											Card
										</button>
										<button
											type="button"
											className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-center text-xs font-semibold text-slate-500"
										>
											<FiSmartphone className="mx-auto mb-1 text-sm" />
											Mobile
										</button>
									</div>

									<div className="mt-4 grid grid-cols-2 gap-2">
										<button
											type="button"
											className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e9eef5] px-3 py-3 text-sm font-semibold text-slate-600"
										>
											<FiPrinter />
											Print
										</button>
										<button
											type="button"
											className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e9eef5] px-3 py-3 text-sm font-semibold text-slate-600"
										>
											<FiSave />
											Save
										</button>
									</div>

									<button
										type="button"
										className="mt-4 w-full rounded-xl bg-[#794B1A] px-4 py-3.5 text-sm font-bold tracking-wide text-white shadow-[0_10px_20px_rgba(121,75,26,0.25)] transition hover:bg-[#633B14]"
									>
										COMPLETE TRANSACTION
									</button>
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
