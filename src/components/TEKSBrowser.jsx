import { useEffect, useState } from 'react'

export default function TEKSBrowser({ backend, onPick }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [grade, setGrade] = useState('')
  const [subject, setSubject] = useState('')

  useEffect(() => {
    fetchStandards()
  }, [])

  const fetchStandards = async () => {
    setLoading(true)
    const url = new URL(`${backend}/api/teks`)
    if (q) url.searchParams.set('q', q)
    if (grade) url.searchParams.set('grade', grade)
    if (subject) url.searchParams.set('subject', subject)
    const res = await fetch(url.toString())
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-2 gap-2 mb-3">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search keywords or code" className="border border-slate-300 rounded-lg px-3 py-3 text-sm" />
        <div className="grid grid-cols-2 gap-2">
          <select value={grade} onChange={(e)=>setGrade(e.target.value)} className="border border-slate-300 rounded-lg px-3 py-3 text-sm">
            <option value="">All Grades</option>
            {['K','1','2','3','4','5','6','7','8','9','10','11','12'].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <select value={subject} onChange={(e)=>setSubject(e.target.value)} className="border border-slate-300 rounded-lg px-3 py-3 text-sm">
            <option value="">All Subjects</option>
            {['ELA','Math','Science','SocialStudies'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={fetchStandards} className="h-10 px-3 rounded-lg bg-slate-900 text-white">Search</button>
        <button onClick={()=>{setQ('');setGrade('');setSubject('');setTimeout(fetchStandards,0)}} className="h-10 px-3 rounded-lg border border-slate-300">Reset</button>
      </div>

      {loading ? (
        <div className="text-sm text-slate-500">Loading TEKS…</div>
      ) : (
        <div className="grid gap-2">
          {items.map((s) => (
            <div key={s.code} className="bg-white rounded-xl border border-slate-200 p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs text-slate-500">{s.subject} • Grade {s.grade}</div>
                  <div className="font-medium">{s.code} — {s.title}</div>
                  <div className="text-sm text-slate-600">{s.description}</div>
                </div>
                {onPick && (
                  <button onClick={()=>onPick(s)} className="h-9 px-3 rounded-lg bg-blue-600 text-white text-sm">Add</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
