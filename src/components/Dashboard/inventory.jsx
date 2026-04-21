import { useState } from 'react'
import {
	FiAlertTriangle,
	FiBell,
	FiBox,
	FiEdit2,
	FiFilter,
	FiGrid,
	FiHome,
	FiList,
	FiLogOut,
	FiMenu,
	FiMessageSquare,
	FiCpu,
	FiPackage,
	FiSearch,
	FiSettings,
	FiShoppingCart,
	FiTrendingUp,
	FiTruck,
	FiX,
	FiTrash2,
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

const statCards = [
	{
		title: 'Total Products',
		value: '1,284',
		meta: '+2.5% this month',
		metaClass: 'text-emerald-600',
		icon: FiPackage,
		iconClass: 'text-[#8A5B29]',
		borderClass: 'border-slate-200',
	},
	{
		title: 'Low Stock Items',
		value: '12',
		meta: 'Requires attention',
		metaClass: 'text-[#f05a22]',
		icon: FiAlertTriangle,
		iconClass: 'text-[#f6a25e]',
		borderClass: 'border-rose-200',
	},
	{
		title: 'Out of Stock',
		value: '05',
		meta: 'Critical Action',
		metaClass: 'text-rose-600',
		icon: FiArchive,
		iconClass: 'text-rose-400',
		borderClass: 'border-slate-200',
	},
	{
		title: 'Monthly Orders',
		value: '452',
		meta: '+12.8% growth',
		metaClass: 'text-blue-600',
		icon: FiShoppingCart,
		iconClass: 'text-blue-500',
		borderClass: 'border-slate-200',
	},
]

const categories = ['All Items', 'Neuro-gear', 'Bio-sensors', 'Accessories']

const inventoryRows = [
	{
		name: 'NeuralLink Pro Gen-2',
		sku: 'SKU: BW-NL-2024',
		category: 'Neuro-gear',
		supplier: 'Synapse Tech Corp',
		quantity: '124 units',
		status: 'In Stock',
		statusClass: 'bg-emerald-100 text-emerald-700',
		quantityClass: 'text-slate-700',
	},
	{
		name: 'EEG Sensor Pads (10pk)',
		sku: 'SKU: BW-EEG-P10',
		category: 'Bio-sensors',
		supplier: 'BioMed Global',
		quantity: '08 units',
		status: 'Low Stock',
		statusClass: 'bg-orange-100 text-orange-700',
		quantityClass: 'text-[#F05A22]',
	},
	{
		name: 'Synaptic Bridge Cable',
		sku: 'SKU: BW-CBL-SYN',
		category: 'Accessories',
		supplier: 'Alpha Connect',
		quantity: '45 units',
		status: 'In Stock',
		statusClass: 'bg-emerald-100 text-emerald-700',
		quantityClass: 'text-slate-700',
	},
]

const activities = [
	{
		title: 'Shipment Received: Synapse Tech Corp',
		description: '50 units of NeuralLink Pro Gen-2 added to inventory.',
		time: '2 hours ago',
		icon: FiTruck,
		iconWrap: 'bg-blue-100 text-blue-500',
	},
	{
		title: 'Alert: Stock Low',
		description: 'EEG Sensor Pads dropped below safety threshold (10).',
		time: '5 hours ago',
		icon: FiAlertTriangle,
		iconWrap: 'bg-orange-100 text-orange-500',
	},
]

const suppliers = [
	{ name: 'Synapse Tech', subtitle: 'Main Hardware' },
	{ name: 'BioMed Global', subtitle: 'Bio-sensors' },
	{ name: 'Alpha Connect', subtitle: 'Cabling/Parts' },
]

function Sidebar({ mobile = false, onClose, activePage = 'inventory', onNavigate = () => {}, onLogout = () => {} }) {
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

function Inventory({ activePage = 'inventory', onNavigate = () => {}, onLogout = () => {} }) {
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
								<h1 className="text-[31px] font-bold leading-none tracking-tight text-slate-900">Inventory</h1>
							</div>

							<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
								<label className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-100/80 px-3 py-2.5 sm:w-65">
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

					<section className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						{statCards.map((card) => {
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
									{categories.map((category, index) => (
										<button
											key={category}
											type="button"
											className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
												index === 0
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
									className="inline-flex items-center gap-2 self-start rounded-lg px-2 py-1 text-sm font-medium text-slate-500 hover:text-slate-700 sm:self-auto"
								>
									<FiFilter className="text-sm" />
									More Filters
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
									{inventoryRows.map((item) => (
										<tr key={item.name} className="border-b border-slate-100 text-sm text-slate-600">
											<td className="px-4 py-4">
												<div className="flex items-center gap-3">
													<div className="grid h-8 w-8 place-items-center rounded-md bg-[#F6EFE9] text-[#8A5B29]">
														<FiList className="text-sm" />
													</div>
													<div>
														<p className="font-semibold text-slate-800">{item.name}</p>
														<p className="text-xs text-slate-400">{item.sku}</p>
													</div>
												</div>
											</td>
											<td className="px-4 py-4">{item.category}</td>
											<td className="px-4 py-4">{item.supplier}</td>
											<td className={`px-4 py-4 font-semibold ${item.quantityClass}`}>{item.quantity}</td>
											<td className="px-4 py-4">
												<span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.statusClass}`}>
													{item.status}
												</span>
											</td>
											<td className="px-4 py-4">
												<div className="flex items-center gap-3 text-slate-400">
													<button type="button" className="hover:text-slate-600">
														<FiEdit2 className="text-sm" />
													</button>
													<button type="button" className="hover:text-slate-600">
														<FiTrash2 className="text-sm" />
													</button>
												</div>
											</td>
										</tr>
									))}
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
											<p className="font-semibold text-slate-800">{suppliers[2].name}</p>
											<p className="text-xs text-slate-400">{suppliers[2].subtitle}</p>
										</div>
									</div>
								</div>
							</div>
						</article>
					</section>
				</div>
			</main>
		</div>
	)
}

export default Inventory
