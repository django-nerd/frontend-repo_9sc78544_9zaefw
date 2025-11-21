import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import GeneratePanel from './components/GeneratePanel'
import TEKSBrowser from './components/TEKSBrowser'
import Library from './components/Library'
import Account from './components/Account'

function App() {
  const [tab, setTab] = useState('generate')
  const backend = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar current={tab} onChange={setTab} />
      <div className="max-w-5xl mx-auto">
        {tab === 'generate' && <GeneratePanel backend={backend} />}
        {tab === 'teks' && <TEKSBrowser backend={backend} onPick={(s)=>{ setTab('generate'); /* could prefill */ }} />}
        {tab === 'library' && <Library backend={backend} />}
        {tab === 'account' && <Account />}
      </div>
      <footer className="py-8 text-center text-xs text-slate-500">© LessonlyAI • Aligned to TEKS • Mobile-first</footer>
    </div>
  )
}

export default App
