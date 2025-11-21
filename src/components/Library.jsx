import { useEffect, useState } from 'react'

export default function Library({ backend }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchLessons = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/lessons`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchLessons() }, [])

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-slate-800">My Lessons</h3>
        <button onClick={fetchLessons} className="h-9 px-3 rounded-lg border border-slate-300 text-sm">Refresh</button>
      </div>

      {loading ? (
        <div className="text-sm text-slate-500">Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-sm text-slate-500">No lessons yet. Generate your first draft to see it here.</div>
      ) : (
        <div className="grid gap-2">
          {items.map((l, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-3">
              <div className="text-xs text-slate-500">{l.subject} • Grade {l.grade} • {l.duration_minutes}m</div>
              <div className="font-medium">{l.title}</div>
              {l.teks_codes?.length > 0 && (
                <div className="text-xs text-slate-500">TEKS: {l.teks_codes.join(', ')}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
