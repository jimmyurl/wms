import { NavLink, useNavigate } from 'react-router-dom'
import { clsx } from 'clsx'
import {
  LayoutDashboard, Package, ArrowDownToLine, ShoppingCart,
  Truck, RotateCcw, Users, BarChart3, LogOut, Warehouse,
  ChevronDown
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useWarehouse } from '../../context/WarehouseContext'
import { useState } from 'react'

const NAV = [
  { to: '/',           icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/inventory',  icon: Package,          label: 'Inventory' },
  { to: '/receiving',  icon: ArrowDownToLine,  label: 'Receiving' },
  { to: '/orders',     icon: ShoppingCart,     label: 'Orders' },
  { to: '/shipping',   icon: Truck,            label: 'Shipping' },
  { to: '/returns',    icon: RotateCcw,        label: 'Returns' },
  { to: '/labor',      icon: Users,            label: 'Labor' },
  { to: '/reports',    icon: BarChart3,        label: 'Reports' },
]

export default function Sidebar() {
  const { profile, signOut } = useAuth()
  const { warehouses, activeWarehouse, setActiveWarehouse } = useWarehouse()
  const [warehouseOpen, setWarehouseOpen] = useState(false)
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <aside className="w-56 flex-shrink-0 bg-ink-900 border-r border-ink-800 flex flex-col h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-ink-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-lime-400 rounded-md flex items-center justify-center">
            <Warehouse size={15} className="text-ink-900" />
          </div>
          <span className="font-semibold text-ink-50 text-sm tracking-tight">WMS Platform</span>
        </div>
        <p className="text-xs text-ink-500 mt-1 font-mono truncate">{profile?.tenants?.name || 'Loading…'}</p>
      </div>

      <div className="px-3 py-3 border-b border-ink-800">
        <button
          onClick={() => setWarehouseOpen(!warehouseOpen)}
          className="w-full flex items-center justify-between bg-ink-800 rounded-lg px-3 py-2 text-xs text-ink-300 hover:bg-ink-700 transition-colors"
        >
          <span className="truncate">{activeWarehouse?.name || 'Select warehouse'}</span>
          <ChevronDown size={13} className={clsx('transition-transform', warehouseOpen && 'rotate-180')} />
        </button>
        {warehouseOpen && (
          <div className="mt-1 bg-ink-800 rounded-lg border border-ink-700 overflow-hidden">
            {warehouses.map(w => (
              <button
                key={w.id}
                onClick={() => { setActiveWarehouse(w); setWarehouseOpen(false) }}
                className={clsx(
                  'w-full text-left px-3 py-2 text-xs transition-colors hover:bg-ink-700',
                  activeWarehouse?.id === w.id ? 'text-lime-400' : 'text-ink-300'
                )}
              >
                {w.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => clsx(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
              isActive
                ? 'bg-lime-400/10 text-lime-400 font-medium'
                : 'text-ink-400 hover:text-ink-100 hover:bg-ink-800'
            )}
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-ink-800">
        <div className="flex items-center gap-2.5 px-2 mb-2">
          <div className="w-7 h-7 bg-lime-400/20 rounded-full flex items-center justify-center text-xs font-medium text-lime-400">
            {profile?.full_name?.[0] || profile?.role?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-ink-200 truncate">{profile?.full_name || 'User'}</p>
            <p className="text-xs text-ink-500 capitalize">{profile?.role}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-400 hover:text-red-400 hover:bg-red-400/5 transition-colors"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  )
}