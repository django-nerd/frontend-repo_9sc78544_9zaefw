import { useState } from 'react'

export default function Navbar({ current, onChange }) {
  const tabs = [
    { id: 'generate', label: 'Generate' },
    { id: 'teks', label: 'TEKS' },
    { id: 'library', label: 'Library' },
    { id: 'account', label: 'Account' },
  ]

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">L</div>
          <div className="font-semibold text-slate-800">LessonlyAI</div>
        </div>
        <nav className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                current === t.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
