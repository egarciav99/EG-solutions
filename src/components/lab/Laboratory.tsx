import { useState, type ComponentType, type KeyboardEvent } from 'react';
import { ArrowRight, Bot, LayoutTemplate, Moon, Sun, Workflow } from 'lucide-react';
import { PageLink } from '../PageLink';
import type { PageId } from '../../router';
import { useTheme } from '../../theme';
import { AutomationDemo } from './AutomationDemo';
import { AgentDemo } from './AgentDemo';
import { WebBuilderDemo } from './WebBuilderDemo';

interface Demo {
  id: string;
  tab: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  basedOn: string;
  Component: ComponentType;
}

const DEMOS: Demo[] = [
  {
    id: 'automatizacion',
    tab: 'Automatización',
    icon: Workflow,
    title: 'Una automatización, ejecutándose delante de ti',
    desc: 'Elige un flujo y pulsa Ejecutar. Cada paso se enciende cuando trabaja; en el de LinkedIn, nada se publica hasta que tú lo apruebas.',
    basedOn: 'CoreIT, el formulario de esta web y el motor de publicación en LinkedIn',
    Component: AutomationDemo,
  },
  {
    id: 'agente',
    tab: 'Agente IA',
    icon: Bot,
    title: 'Un agente de IA que cita sus fuentes',
    desc: 'Pregúntale a la documentación de una empresa ficticia. Verás qué herramientas usa, en qué página encontró la respuesta y qué hace cuando no la encuentra.',
    basedOn: 'PDF Technical Assistant',
    Component: AgentDemo,
  },
  {
    id: 'web',
    tab: 'Web',
    icon: LayoutTemplate,
    title: 'Una web dentro de la web',
    desc: 'Cambia de sector, de dispositivo o de tema y mira cómo se adapta. Pulsa el botón principal: el formulario funciona dentro de la propia web.',
    basedOn: 'las webs para clientes como Carolina Guijarro',
    Component: WebBuilderDemo,
  },
];

/** Portada: los tres demos en pestañas. */
export function LabTabs({ onNavigate }: { onNavigate: (id: PageId) => void }) {
  const [active, setActive] = useState(DEMOS[0].id);
  const demo = DEMOS.find((d) => d.id === active)!;
  const { Component } = demo;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const idx = DEMOS.findIndex((d) => d.id === active);
    const next = DEMOS[(idx + (e.key === 'ArrowRight' ? 1 : DEMOS.length - 1)) % DEMOS.length];
    setActive(next.id);
    document.getElementById(`lab-tab-${next.id}`)?.focus();
  };

  return (
    <section className="relative py-16 sm:py-20 border-b border-steel/30 bg-near-white overflow-hidden" id="laboratorio-en-vivo">
      <div className="absolute inset-0 pointer-events-none bg-blueprint-grid" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-copper mb-2">
              <span className="w-2 h-2 rounded-full bg-copper animate-pulse" aria-hidden="true" /> EN VIVO
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-2">No te lo cuento: pruébalo</h2>
            <p className="text-base text-mid-gray leading-relaxed">Lo que hago, funcionando aquí mismo. Toca, ejecuta y rompe lo que quieras.</p>
          </div>
          <PageLink
            to="laboratorio"
            onNavigate={onNavigate}
            id="home-ver-laboratorio"
            className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 text-sm font-medium text-copper hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded cursor-pointer"
          >
            Abrir el laboratorio completo
            <ArrowRight className="w-4 h-4" />
          </PageLink>
        </div>

        <div role="tablist" aria-label="Demos" className="flex gap-1 p-1 rounded-xl bg-card ring-1 ring-steel/40 w-full sm:w-fit mb-5" onKeyDown={onKeyDown}>
          {DEMOS.map((d) => {
            const Icon = d.icon;
            const selected = d.id === active;
            return (
              <button
                key={d.id}
                id={`lab-tab-${d.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`lab-panel-${d.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(d.id)}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 text-sm font-semibold px-3 sm:px-4 py-2.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer ${
                  selected ? 'bg-ink text-white' : 'text-slate hover:bg-steel/20'
                }`}
              >
                <Icon className={`w-4 h-4 ${selected ? 'text-copper' : ''}`} aria-hidden="true" />
                {d.tab}
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id={`lab-panel-${demo.id}`} aria-labelledby={`lab-tab-${demo.id}`} key={demo.id} className="animate-[lab-fade-in_0.35s_ease-out]">
          <p className="card-text text-mid-gray mb-4 max-w-3xl">{demo.desc}</p>
          <Component />
        </div>
      </div>
    </section>
  );
}

/** Página /laboratorio: los demos uno debajo de otro, con su contexto. */
export function Laboratory({ onNavigate }: { onNavigate: (id: PageId) => void }) {
  return (
    <section className="relative py-20 sm:py-24 bg-near-white overflow-hidden" id="laboratorio">
      <div className="absolute inset-x-0 top-0 h-[28rem] pointer-events-none bg-blueprint-grid" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-copper mb-3">
            <span className="w-2 h-2 rounded-full bg-copper animate-pulse" aria-hidden="true" /> LABORATORIO
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-4">Pruébalo antes de hablar conmigo</h1>
          <p className="text-lg text-mid-gray leading-relaxed">
            Tres demos de lo que construyo: una automatización, un agente de IA y una web. Son simulaciones hechas con el mismo diseño que los proyectos reales y no envían ningún dato.
          </p>
        </div>

        {/* Índice */}
        <nav aria-label="Demos del laboratorio" className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-16">
          {DEMOS.map((d, i) => {
            const Icon = d.icon;
            return (
              <a
                key={d.id}
                href={`#demo-${d.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(`demo-${d.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="group flex items-center gap-3 bg-card rounded-xl p-4 ring-1 ring-steel/40 hover:ring-copper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
              >
                <span className="w-10 h-10 rounded-lg bg-ink text-copper flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block card-meta text-mid-gray">Demo {i + 1}</span>
                  <span className="block text-sm font-semibold text-navy">{d.tab}</span>
                </span>
              </a>
            );
          })}
        </nav>

        <div className="space-y-20">
          {DEMOS.map((d, i) => {
            const { Component } = d;
            return (
              <article key={d.id} id={`demo-${d.id}`} className="scroll-mt-28">
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-4xl sm:text-5xl font-bold text-copper/30 leading-none tabular-nums" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <div className="max-w-3xl">
                    <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-2">{d.title}</h2>
                    <p className="text-base text-mid-gray leading-relaxed">{d.desc}</p>
                    <p className="card-meta text-mid-gray mt-2">
                      Basado en {d.basedOn}.{' '}
                      <PageLink to="proyectos" onNavigate={onNavigate} className="text-copper font-medium hover:underline">
                        Ver proyectos
                      </PageLink>
                    </p>
                  </div>
                </div>
                <Component />
              </article>
            );
          })}

          <ThemeDemo />
        </div>

        {/* Cierre */}
        <div className="mt-20 rounded-xl bg-ink text-white p-7 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight mb-2">¿Quieres uno de estos, pero con tus datos?</h2>
            <p className="text-sm text-snow/80 leading-relaxed">Cuéntame qué proceso te quita horas y te digo cuál encaja, con plazo y presupuesto por escrito.</p>
          </div>
          <PageLink
            to="contacto"
            onNavigate={onNavigate}
            id="lab-cta-contacto"
            className="shrink-0 bg-copper hover:opacity-90 text-white text-base font-medium px-6 py-3 rounded transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer"
          >
            Consultar proyecto
          </PageLink>
        </div>
      </div>
    </section>
  );
}

/** El cuarto "demo": cambiar el tema de toda la web. */
function ThemeDemo() {
  const [theme, toggle] = useTheme();
  const isDark = theme === 'dark';
  return (
    <article id="demo-tema" className="rounded-xl bg-card ring-1 ring-steel/40 p-7 sm:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
      <div>
        <span className="text-4xl font-bold text-copper/30 leading-none" aria-hidden="true">
          04
        </span>
        <h2 className="text-2xl font-bold text-navy tracking-tight mt-2 mb-2">Y si prefieres la noche</h2>
        <p className="text-base text-mid-gray leading-relaxed max-w-2xl">
          Toda la web tiene modo oscuro con la misma paleta. Tu elección se guarda para la próxima visita. Pulsa el interruptor y mira de dónde sale el cambio.
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Modo oscuro"
        onClick={(e) => toggle({ x: e.clientX || window.innerWidth / 2, y: e.clientY || window.innerHeight / 2 })}
        className={`relative w-28 h-14 rounded-full transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 cursor-pointer ${
          isDark ? 'bg-ink ring-1 ring-copper' : 'bg-steel/40'
        }`}
      >
        <span
          className={`absolute top-1.5 left-1.5 w-11 h-11 rounded-full bg-copper text-white flex items-center justify-center shadow-md transition-transform duration-500 ${
            isDark ? 'translate-x-14' : 'translate-x-0'
          }`}
        >
          {isDark ? <Moon className="w-5 h-5" aria-hidden="true" /> : <Sun className="w-5 h-5" aria-hidden="true" />}
        </span>
      </button>
    </article>
  );
}
