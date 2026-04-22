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
	FiZap,
	FiClipboard,
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

const insightCards = [
	{
		title: 'Inventory Shortage Risk',
		badge: 'Prediction',
		badgeClass: 'bg-blue-100 text-blue-600',
		icon: FiClipboard,
		iconWrap: 'bg-blue-100 text-blue-600',
		body: "Based on current consumption rates and upcoming holiday traffic, you are projected to run out of 'House Blend Coffee Beans' by Thursday afternoon.",
		primary: 'Review Order',
		secondary: 'Dismiss',
		tone: 'from-[#EEF3FA] to-[#F6F8FB]',
	},
	{
		title: 'Loyalty Segment Shift',
		badge: 'Pattern Detected',
		badgeClass: 'bg-emerald-100 text-emerald-600',
		icon: FiUsers,
		iconWrap: 'bg-emerald-100 text-emerald-600',
		body: "We've detected a 15% increase in repeat visits from the 'Evening Casual' demographic. They frequently pair craft beers with shareable appetizers.",
		primary: 'View Audience',
		secondary: 'Create Promo',
		tone: 'from-[#EEF6F1] to-[#F6FAF7]',
	},
]

function Sidebar({ mobile = false, onClose, activePage = 'ai-insights', onNavigate = () => {}, onLogout = () => {} }) {
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

function AiInsights({ activePage = 'ai-insights', onNavigate = () => {}, onLogout = () => {} }) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
								<h1 className="text-[31px] font-bold leading-none tracking-tight text-slate-900">AI Insights</h1>
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

					<section className="space-y-4">
						<div>
							<h2 className="text-[2.2rem] font-extrabold tracking-tight text-slate-900">Intelligence Hub</h2>
							<p className="text-[1.05rem] text-slate-500">AI-driven actionable insights for your business operations.</p>
						</div>

						<article className="rounded-2xl border border-blue-100 bg-[#EAF1FC] p-5">
							<div className="flex items-start gap-4">
								<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-600">
									<FiZap className="text-lg" />
								</div>
								<div>
									<h3 className="text-[1.55rem] font-extrabold tracking-tight text-blue-900">Weekly Performance Synthesis</h3>
									<p className="mt-1 text-[1.03rem] leading-relaxed text-blue-800">
										Revenue is up 12% compared to last week, primarily driven by a surge in weekend brunch traffic.
										However, your cost of goods sold (COGS) on premium proteins has increased by 4%, indicating a need
										to review supplier pricing or adjust menu margins.
									</p>
								</div>
							</div>
						</article>

						<div className="grid gap-4 lg:grid-cols-2">
							{insightCards.map((card, index) => {
								const Icon = card.icon
								return (
									<article key={card.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
										<div className={`flex items-center justify-between bg-linear-to-r ${card.tone} px-5 py-4`}>
											<div className={`grid h-8 w-8 place-items-center rounded-md ${card.iconWrap}`}>
												<Icon className="text-sm" />
											</div>
											<span className={`rounded-full px-3 py-1 text-xs font-bold ${card.badgeClass}`}>{card.badge}</span>
										</div>

										<div className="p-5">
											<h3 className="text-[2rem] font-extrabold tracking-tight text-slate-900">{card.title}</h3>
											<p className="mt-2 text-[1.05rem] leading-relaxed text-slate-500">{card.body}</p>

											<div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
												<button
													type="button"
													className={`rounded-lg px-4 py-2 text-sm font-semibold ${
														index === 0
															? 'bg-[#8A5B29] text-white hover:bg-[#734A20]'
															: 'bg-[#EDE3DC] text-slate-800 hover:bg-[#e4d6cb]'
													}`}
												>
													{card.primary}
												</button>
												<button type="button" className="px-2 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700">
													{card.secondary}
												</button>
											</div>
										</div>
									</article>
								)
							})}
						</div>

						<article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
							<div className="mb-3 flex items-start gap-3">
								<div className="grid h-9 w-9 place-items-center rounded-md bg-violet-100 text-violet-600">
									<FiTrendingUp className="text-sm" />
								</div>
								<div>
									<div className="flex flex-wrap items-center gap-2">
										<h3 className="text-[2.05rem] font-extrabold tracking-tight text-slate-900">Staffing Optimization</h3>
										<span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-bold text-violet-600">High Impact</span>
									</div>
									<p className="mt-1 text-[1.03rem] leading-relaxed text-slate-500">
										Historical data indicates your Tuesday morning shifts are overstaffed by an average of 1.5 roles,
										while Friday lunch rushes are consistently understaffed leading to higher table turnover times.
									</p>
								</div>
							</div>

							<div className="rounded-xl border border-[#EADFD7] bg-[#FCF7F4] px-4 py-3">
								<div className="mb-2 flex items-center justify-between gap-3 text-[1.02rem]">
									<p className="font-medium text-slate-500">Recommended Schedule Adjustment</p>
									<p className="font-semibold text-[#8A5B29]">Estimated savings: $320/wk</p>
								</div>
								<div className="h-2 overflow-hidden rounded-full bg-[#E8DCD2]">
									<div className="h-full w-[75%] rounded-full bg-violet-500" />
								</div>
							</div>

							<div className="pointer-events-none absolute -bottom-10 -right-8 h-42 w-42 rounded-full border-12 border-slate-100/90" />
						</article>
					</section>
				</div>
			</main>
		</div>
	)
}

export default AiInsights
