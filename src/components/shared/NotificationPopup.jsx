import { useEffect, useRef } from 'react'
import {
	FiAlertTriangle,
	FiCheckCircle,
	FiFileText,
	FiRefreshCw,
	FiUserCheck,
} from 'react-icons/fi'

const alerts = [
	{
		title: 'Stock Alert Critical',
		time: '10m ago',
		detail: 'Draft Beer IPA keg is below 5% capacity at Bar Station 2.',
		icon: FiAlertTriangle,
		iconClass: 'text-rose-600',
	},
	{
		title: 'Role Changed',
		time: '1h ago',
		detail: "Sarah Jenkins's role was updated from 'Server' to 'Shift Lead' by Admin.",
		icon: FiUserCheck,
		iconClass: 'text-blue-600',
	},
	{
		title: 'Daily Reconciliation',
		time: '4h ago',
		detail: 'Register 3 has been successfully reconciled with 0 discrepancies.',
		icon: FiCheckCircle,
		iconClass: 'text-emerald-600',
	},
	{
		title: 'Large Order Placed',
		time: 'Yesterday',
		detail: 'Table 12 submitted an order exceeding $400.',
		icon: FiFileText,
		iconClass: 'text-slate-600',
	},
	{
		title: 'System Update',
		time: '2 days ago',
		detail: 'LedgerWay POS updated to v2.4.1 overnight.',
		icon: FiRefreshCw,
		iconClass: 'text-slate-400',
	},
]

function NotificationPopup({ open, onClose = () => {} }) {
	const panelRef = useRef(null)

	useEffect(() => {
		if (!open) return undefined

		function handleClickOutside(event) {
			if (panelRef.current && !panelRef.current.contains(event.target)) {
				onClose()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [open, onClose])

	if (!open) return null

	return (
		<div
			ref={panelRef}
			className="absolute right-0 top-12 z-50 w-95 max-w-[90vw] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
		>
			<div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
				<h3 className="text-2xl font-bold tracking-tight text-slate-900">Recent Alerts</h3>
				<button type="button" className="text-sm font-bold text-[#8A5B29] hover:text-[#734A20]">
					Mark all read
				</button>
			</div>

			<div>
				{alerts.map((alert) => {
					const Icon = alert.icon
					return (
						<div key={alert.title} className="border-b border-slate-200 px-4 py-4">
							<div className="flex items-start justify-between gap-3">
								<div className="inline-flex items-start gap-3">
									<Icon className={`mt-0.5 text-base ${alert.iconClass}`} />
									<div>
										<p className="text-[1.02rem] font-semibold text-slate-800">{alert.title}</p>
										<p className="mt-1 max-w-75 text-sm leading-relaxed text-slate-500">{alert.detail}</p>
									</div>
								</div>
								<span className="shrink-0 text-xs font-medium text-slate-400">{alert.time}</span>
							</div>
						</div>
					)
				})}
			</div>

			<button
				type="button"
				className="w-full bg-[#EFE9E5] px-4 py-3 text-center text-sm font-bold text-slate-600 hover:bg-[#e9dfd8]"
			>
				View Full Log
			</button>
		</div>
	)
}

export default NotificationPopup
