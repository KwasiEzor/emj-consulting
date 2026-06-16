'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { GlassmorphCard } from '@/components/shared/GlassmorphCard';
import { Loader2, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email ou mot de passe incorrect');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (error) {
      setError('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 glass-dark rounded-full mb-4">
            <Lock size={32} className="text-[var(--color-gold)]" />
          </div>
          <h1 className="text-3xl font-bold gold-gradient mb-2">
            Administration
          </h1>
          <p className="text-white/60">
            Connectez-vous pour accéder au tableau de bord
          </p>
        </div>

        <GlassmorphCard>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 glass-dark rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
                placeholder="admin@emj-consulting.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 glass-dark rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="p-3 glass rounded-lg border border-red-500/50 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-lg font-semibold hover:bg-[var(--color-gold-light)] transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Connexion...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
        </GlassmorphCard>

        <p className="text-center text-sm text-white/40 mt-6">
          Credentials de test: admin@emj-consulting.com / admin123
        </p>
      </div>
    </div>
  );
}
