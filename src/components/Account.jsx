export default function Account() {
  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white rounded-xl border border-slate-200 p-4 grid gap-2">
        <h3 className="text-lg font-semibold text-slate-800">Account</h3>
        <div className="text-sm text-slate-600">Signed in as demo@lessonly.ai</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-xs text-slate-500">Plan</div>
            <div className="font-medium">Free</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-xs text-slate-500">AI Generations Used</div>
            <div className="font-medium">2 / 10</div>
          </div>
        </div>
        <button className="h-11 rounded-lg bg-blue-600 text-white w-full sm:w-auto mt-2">Upgrade to Premium</button>
      </div>
    </div>
  )
}
