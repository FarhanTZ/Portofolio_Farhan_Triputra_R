import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      </div>

      {/* Header / Navbar */}
      <header className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-slate-950/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-slate-950 text-lg shadow-lg shadow-cyan-500/20">
              ⚡
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent">
              React + Tailwind CSS
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Tailwind v4
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Vite + React
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16 flex-1 flex flex-col justify-center items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 text-sm text-slate-300 mb-8 backdrop-blur-sm shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Setup Berhasil & Siap Digunakan
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl leading-tight">
          Satu Langkah Lagi Menuju Website{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Modern & Super Cepat
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Proyek ReactJS kamu telah dikonfigurasi dengan Tailwind CSS v4 terbaru & Vite. Siap untuk membuat tampilan portofolio atau aplikasi impianmu!
        </p>

        {/* Counter Interactive Demo */}
        <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl max-w-md w-full mb-12 shadow-2xl hover:border-slate-700/80 transition-all duration-300">
          <p className="text-sm font-medium text-slate-400 mb-3">Uji Komponen Interaktif:</p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCount((c) => Math.max(0, c - 1))}
              className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-xl font-bold transition-all text-slate-200 border border-slate-700 flex items-center justify-center shadow-md"
            >
              -
            </button>
            <div className="px-6 py-2 rounded-xl bg-slate-950 border border-slate-800 min-w-24 text-2xl font-mono font-bold text-cyan-400">
              {count}
            </div>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 active:scale-95 text-xl font-bold transition-all text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/20"
            >
              +
            </button>
          </div>
        </div>

        {/* Quick Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold mb-4 border border-cyan-500/20">
              ⚡
            </div>
            <h3 className="font-semibold text-lg text-slate-100 mb-2">Vite HMR</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Instant Hot Module Replacement untuk pengalaman development yang responsif tanpa reload lambat.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold mb-4 border border-indigo-500/20">
              🎨
            </div>
            <h3 className="font-semibold text-lg text-slate-100 mb-2">Tailwind v4 Engine</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Menggunakan `@import "tailwindcss";` dan `@tailwindcss/vite` plugin tanpa perlu konfigurasi rumit.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold mb-4 border border-purple-500/20">
              🚀
            </div>
            <h3 className="font-semibold text-lg text-slate-100 mb-2">Siap Dikembangkan</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Mulai edit file <code className="text-cyan-400 font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded">src/App.jsx</code> untuk membangun aplikasi hebatmu.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6 text-center text-sm text-slate-500">
        Portofolio Website &bull; React + Tailwind CSS v4 &bull; Built with Vite
      </footer>
    </div>
  )
}

export default App
