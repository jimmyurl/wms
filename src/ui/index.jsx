import { X } from 'lucide-react'
import { clsx } from 'clsx'

const statusColors = {
  new:        'bg-sky-400/10 text-sky-400 border border-sky-400/20',
  allocated:  'bg-lime-400/10 text-lime-400 border border-lime-400/20',
  picking:    'bg-amber-400/10 text-amber-400 border border-amber-400/20',
  picked:     'bg-amber-400/10 text-amber-400 border border-amber-400/20',
  packing:    'bg-amber-400/10 text-amber-400 border border-amber-400/20',
  packed:     'bg-lime-400/10 text-lime-400 border border-lime-400/20',
  shipped:    'bg-lime-500/10 text-lime-300 border border-lime-500/20',
  cancelled:  'bg-red-500/10 text-red-400 border border-red-400/20',
  pending:    'bg-ink-600/60 text-ink-300 border border-ink-600',
  in_transit: 'bg-sky-400/10 text-sky-400 border border-sky-400/20',
  receiving:  'bg-amber-400/10 text-amber-400 border border-amber-400/20',
  received:   'bg-lime-400/10 text-lime-400 border border-lime-400/20',
  closed:     'bg-ink-600/40 text-ink-400 border border-ink-600',
  requested:  'bg-sky-400/10 text-sky-400 border border-sky-400/20',
  inspected:  'bg-amber-400/10 text-amber-400 border border-amber-400/20',
  restocked:  'bg-lime-400/10 text-lime-400 border border-lime-400/20',
  good:       'bg-lime-400/10 text-lime-400 border border-lime-400/20',
  damaged:    'bg-red-400/10 text-red-400 border border-red-400/20',
  quarantine: 'bg-amber-400/10 text-amber-400 border border-amber-400/20',
  in_progress:'bg-amber-400/10 text-amber-400 border border-amber-400/20',
  completed:  'bg-lime-400/10 text-lime-400 border border-lime-400/20',
  active:     'bg-lime-400/10 text-lime-400 border border-lime-400/20',
  inactive:   'bg-ink-600/40 text-ink-400 border border-ink-600',
}

export function Badge({ status, label, className }) {
  const colors = statusColors[status] || 'bg-ink-600/40 text-ink-300 border border-ink-600'
  return (
    <span className={clsx('badge', colors, className)}>
      {label || status?.replace(/_/g, ' ')}
    </span>
  )
}

export function Modal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null
  const sizes = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-ink-900/80 backdrop-blur-sm" />
      <div
        className={clsx('relative w-full bg-ink-800 border border-ink-700 rounded-2xl shadow-2xl', sizes[size])}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-ink-700">
          <h3 className="text-base font-semibold text-ink-50">{title}</h3>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-100 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

export function Spinner({ size = 20 }) {
  return (
    <div
      className="border-2 border-ink-600 border-t-lime-400 rounded-full animate-spin"
      style={{ width: size, height: size }}
    />
  )
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <div className="w-12 h-12 bg-ink-700 rounded-xl flex items-center justify-center mb-4">
          <Icon size={22} className="text-ink-400" />
        </div>
      )}
      <p className="text-ink-200 font-medium mb-1">{title}</p>
      {description && <p className="text-ink-400 text-sm mb-4">{description}</p>}
      {action}
    </div>
  )
}

export function DataTable({ columns, data, onRowClick, loading }) {
  if (loading) return (
    <div className="flex items-center justify-center py-12"><Spinner size={24} /></div>
  )
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-700">
            {columns.map(col => (
              <th key={col.key} className="text-left py-3 px-4 text-xs font-medium text-ink-400 uppercase tracking-wider">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={columns.length} className="text-center py-8 text-ink-500">No records found</td></tr>
          ) : data.map((row, i) => (
            <tr
              key={row.id || i}
              className={clsx('border-b border-ink-700/60', onRowClick && 'cursor-pointer hover:bg-ink-700/30 transition-colors')}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map(col => (
                <td key={col.key} className="py-3 px-4 text-ink-200">
                  {col.render ? col.render(row) : row[col.key] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function StatCard({ label, value, sub, accent, icon: Icon }) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <span className="text-xs text-ink-400 font-medium uppercase tracking-wider">{label}</span>
        {Icon && <Icon size={16} className="text-ink-500" />}
      </div>
      <p className={clsx('text-2xl font-semibold font-mono mt-1', accent || 'text-ink-50')}>{value}</p>
      {sub && <p className="text-xs text-ink-400 mt-0.5">{sub}</p>}
    </div>
  )
}

export function Field({ label, children, error }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="label">{label}</label>}
      {children}
      {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
    </div>
  )
}

export function Alert({ type = 'info', message }) {
  const colors = {
    info:    'bg-sky-400/10 border-sky-400/30 text-sky-300',
    success: 'bg-lime-400/10 border-lime-400/30 text-lime-300',
    error:   'bg-red-400/10 border-red-400/30 text-red-300',
    warning: 'bg-amber-400/10 border-amber-400/30 text-amber-300',
  }
  return (
    <div className={clsx('border rounded-lg px-4 py-3 text-sm', colors[type])}>
      {message}
    </div>
  )
}