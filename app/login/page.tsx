import { login, signup } from './actions'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage({ searchParams }: { searchParams: { error: string } }) {
    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to home
                </Link>

                <h1 className="text-2xl font-bold mb-6">Welcome Back</h1>

                {searchParams?.error && (
                    <div className="mb-4 p-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
                        {searchParams.error}
                    </div>
                )}

                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button formAction={login} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Log in
                        </button>
                        <button formAction={signup} className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
