import { Link } from '@tanstack/react-router';
import { Search, MapPin, Star, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { aboutImage } from '@/services/mockData';

export function AboutPage() {
  const steps = [
    {
      icon: Search,
      title: '1. Busque',
      description: 'Pesquise pelo tipo de serviço que você precisa ou navegue pela lista de profissionais.',
    },
    {
      icon: MapPin,
      title: '2. Encontre',
      description: 'Veja profissionais próximos com avaliação, distância e tempo estimado de chegada.',
    },
    {
      icon: Star,
      title: '3. Escolha',
      description: 'Compare avaliações e preços, veja os detalhes e o trajeto até o profissional.',
    },
    {
      icon: ShieldCheck,
      title: '4. Contrate',
      description: 'Entre em contato diretamente e contrate com confiança. Avalie o serviço depois.',
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-950 dark:to-brand-950/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                <Zap size={14} /> Sobre o LocalHelp
              </span>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
                Conectando pessoas a profissionais qualificados
              </h1>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                O LocalHelp nasceu de uma necessidade simples: precisar de um serviço e não saber
                quem contratar ou onde encontrar. Somos uma plataforma que aproxima quem precisa de
                ajuda de profissionais qualificados e bem avaliados na sua região.
              </p>
              <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                Com o LocalHelp, você encontra eletricistas, encanadores, fotógrafos, professores e
                muitos outros profissionais — com informações claras sobre localização, avaliação e
                tempo de chegada. Tudo em um só lugar.
              </p>
              <div className="mt-8">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition-all hover:bg-brand-800"
                >
                  Explorar serviços
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img src={aboutImage} alt="Profissionais trabalhando em conjunto" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Como funciona
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Encontrar o profissional certo é simples e rápido
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                <step.icon size={26} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-gray-100">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-brand-700 p-8 text-center text-white shadow-xl sm:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">Pronto para começar?</h2>
            <p className="mt-3 text-brand-50">
              Encontre o profissional perfeito para a sua necessidade agora mesmo.
            </p>
            <Link
              to="/services"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Ver todos os serviços
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
