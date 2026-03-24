'use client';

import Link from 'next/link';
import { ChevronRight, Zap, BarChart3, FileText } from 'lucide-react';

export default function Home() {
  return (
    <main>
      {/* Header */}
      <header className="fixed w-full top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            EVLO
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="/diagnostic" className="text-slate-600 hover:text-slate-900">
              Diagnostic
            </Link>
            <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
              Dashboard
            </Link>
          </nav>
          <Link
            href="/diagnostic"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900">
              Know Your EV Battery Health
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Professional battery diagnostics with 97% accuracy. Get detailed reports on SoH, range, and financial value.
            </p>
            <div className="flex gap-4 justify-center pt-6">
              <Link
                href="/diagnostic"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                Start Diagnostic <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="border border-slate-300 text-slate-900 px-8 py-3 rounded-lg hover:bg-slate-50 transition"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why EVLO?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Accurate Diagnostics',
                description: 'AI-powered battery health scoring with 97% accuracy'
              },
              {
                icon: BarChart3,
                title: 'Detailed Analytics',
                description: 'Track degradation, range loss, and financial impact'
              },
              {
                icon: FileText,
                title: 'Professional Reports',
                description: 'Generate and share detailed PDF reports'
              }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
                  <Icon className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-2xl mx-auto text-center text-white space-y-6">
          <h2 className="text-3xl font-bold">Ready to check your battery?</h2>
          <p className="text-lg opacity-90">
            Get a professional diagnostic report in minutes
          </p>
          <Link
            href="/diagnostic"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-slate-100 transition font-semibold"
          >
            Start Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">© 2024 EVLO. Professional EV Battery Diagnostics.</p>
        </div>
      </footer>
    </main>
  );
}
