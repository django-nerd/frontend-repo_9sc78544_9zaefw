import { useState } from 'react'

export default function GeneratePanel({ backend }) {
  const [title, setTitle] = useState('Inference in Literary Texts')
  const [grade, setGrade] = useState('3')
  const [subject, setSubject] = useState('ELA')
  const [teks, setTeks] = useState(['ELA.3.6.B'])
  const [loading, setLoading] = useState(false)
  const [lesson, setLesson] = useState(null)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${backend}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          grade,
          subject,
          teks_codes: teks,
          duration_minutes: 45,
        }),
      })
      if (!res.ok) throw new Error('Failed to generate')
      const data = await res.json()
      setLesson(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <form onSubmit={submit} className="grid gap-3">
        <div className="grid grid-cols-2 gap-2">
          <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Lesson title" className="w-full border border-slate-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          <select value={subject} onChange={(e)=>setSubject(e.target.value)} className="border border-slate-300 rounded-lg px-3 py-3 text-sm">
            <option>ELA</option>
            <option>Math</option>
            <option>Science</option>
            <option>SocialStudies</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <select value={grade} onChange={(e)=>setGrade(e.target.value)} className="border border-slate-300 rounded-lg px-3 py-3 text-sm">
            {['K','1','2','3','4','5','6','7','8','9','10','11','12'].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <input value={teks.join(', ')} onChange={(e)=>setTeks(e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} placeholder="TEKS codes (comma separated)" className="w-full border border-slate-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <button disabled={loading} className="h-12 rounded-lg bg-blue-600 text-white font-semibold disabled:opacity-50">
          {loading ? 'Generating…' : 'Generate lesson draft'}
        </button>
      </form>

      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

      {lesson && (
        <div className="mt-6 grid gap-3">
          <h3 className="text-lg font-semibold text-slate-800">Draft</h3>
          <div className="bg-white rounded-xl border border-slate-200 p-4 grid gap-2">
            <div className="text-sm text-slate-500">{lesson.subject} • Grade {lesson.grade} • {lesson.duration_minutes}m</div>
            <div className="font-semibold">{lesson.title}</div>
            <div>
              <div className="text-xs uppercase text-slate-400">Objectives</div>
              <p className="text-sm">{lesson.objectives}</p>
            </div>
            <div>
              <div className="text-xs uppercase text-slate-400">Procedures</div>
              <pre className="text-sm whitespace-pre-wrap">{lesson.procedures}</pre>
            </div>
            {lesson.accommodations && (
              <div>
                <div className="text-xs uppercase text-slate-400">Accommodations</div>
                <p className="text-sm">{lesson.accommodations}</p>
              </div>
            )}
            <div>
              <div className="text-xs uppercase text-slate-400">Assessment</div>
              <p className="text-sm">{lesson.assessment}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
