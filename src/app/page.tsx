import { HeroSection } from '@/components/sections/HeroSection'

/**
 * Home — Server Component.
 * Não recebe props, não usa estado. Rotas adicionais
 * serão estruturadas em fases subsequentes (ADR pendente).
 */
export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
    </main>
  )
}
