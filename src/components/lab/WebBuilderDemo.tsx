import { Fragment, useState, type CSSProperties, type ComponentType, type FormEvent, type ReactNode } from 'react';
import {
  CalendarCheck,
  Check,
  Clock,
  CodeXml,
  Lock,
  MapPin,
  Menu,
  Monitor,
  Moon,
  RotateCw,
  Scale,
  ShoppingBag,
  Smartphone,
  Star,
  Stethoscope,
  Sun,
  Tablet,
  UtensilsCrossed,
  X,
} from 'lucide-react';

interface Sector {
  id: 'restaurante' | 'clinica' | 'despacho' | 'tienda';
  label: string;
  brand: string;
  domain: string;
  icon: ComponentType<{ className?: string }>;
  accent: string;
  headline: string;
  sub: string;
  cta: string;
  features: { title: string; text: string }[];
  quote: string;
  author: string;
  /** Campos del formulario que abre el botón principal. */
  formTitle: string;
  formOptions: string[];
  success: string;
}

const SECTORS: Sector[] = [
  {
    id: 'restaurante',
    label: 'Restaurante',
    brand: 'Lumbre',
    domain: 'lumbre-restaurante.es',
    icon: UtensilsCrossed,
    accent: '#C77B4B',
    headline: 'Cocina de brasa en el centro de Madrid',
    sub: 'Producto de temporada, carta corta y reservas en dos clics.',
    cta: 'Reservar mesa',
    features: [
      { title: 'Carta de temporada', text: 'Se actualiza desde una hoja de cálculo, sin tocar código.' },
      { title: 'Reservas al momento', text: 'Confirmación por WhatsApp en segundos.' },
      { title: 'Reseñas reales', text: 'Las mejores, recogidas de Google cada semana.' },
    ],
    quote: 'Desde que reservan por la web, el teléfono ya no nos interrumpe el servicio.',
    author: 'Ana, jefa de sala',
    formTitle: 'Reserva tu mesa',
    formOptions: ['2 personas', '4 personas', '6 personas'],
    success: 'Mesa reservada. Te llega un WhatsApp con la confirmación.',
  },
  {
    id: 'clinica',
    label: 'Clínica',
    brand: 'Fisio Atlas',
    domain: 'fisioatlas.es',
    icon: Stethoscope,
    accent: '#3E8A86',
    headline: 'Fisioterapia que se adapta a tu agenda',
    sub: 'Primera valoración en 48 h y seguimiento de cada sesión.',
    cta: 'Pedir cita',
    features: [
      { title: 'Cita online', text: 'Eliges hueco y te llega el recordatorio el día antes.' },
      { title: 'Historial privado', text: 'Tus ejercicios y notas, solo para ti.' },
      { title: 'Equipo colegiado', text: 'Cuatro especialistas en deporte y suelo pélvico.' },
    ],
    quote: 'Las citas perdidas bajaron a la mitad con los recordatorios automáticos.',
    author: 'Javier, director',
    formTitle: 'Pide tu cita',
    formOptions: ['Valoración inicial', 'Sesión de seguimiento', 'Fisioterapia deportiva'],
    success: 'Cita solicitada. Te llega un recordatorio el día antes.',
  },
  {
    id: 'despacho',
    label: 'Despacho',
    brand: 'Ortega Abogados',
    domain: 'ortegaabogados.es',
    icon: Scale,
    accent: '#4A5A8C',
    headline: 'Derecho laboral claro y sin letra pequeña',
    sub: 'Te decimos por escrito qué opciones tienes y cuánto cuesta cada una.',
    cta: 'Consulta gratuita',
    features: [
      { title: 'Respuesta en 24 h', text: 'Una persona del despacho revisa cada consulta.' },
      { title: 'Documentos seguros', text: 'Subes tu contrato a un área privada y cifrada.' },
      { title: 'Honorarios cerrados', text: 'Presupuesto antes de empezar, sin sorpresas.' },
    ],
    quote: 'La IA ordena las consultas; nosotros dedicamos el tiempo a resolverlas.',
    author: 'Lucía Ortega, socia',
    formTitle: 'Cuéntanos tu caso',
    formOptions: ['Despido', 'Contrato', 'Reclamación de salario'],
    success: 'Consulta recibida. Una abogada te responde en menos de 24 h.',
  },
  {
    id: 'tienda',
    label: 'Tienda',
    brand: 'Olivo & Co.',
    domain: 'olivoyco.com',
    icon: ShoppingBag,
    accent: '#6E7F4E',
    headline: 'Aceite de oliva de cosecha propia',
    sub: 'Del olivar a tu casa en 48 h, con envío gratis desde 40 €.',
    cta: 'Comprar ahora',
    features: [
      { title: 'Stock en tiempo real', text: 'Conectado al almacén: nunca vendes lo que no tienes.' },
      { title: 'Pago seguro', text: 'Tarjeta, Bizum o transferencia.' },
      { title: 'Seguimiento', text: 'El cliente recibe el estado del pedido por correo.' },
    ],
    quote: 'Pasamos de apuntar pedidos en una libreta a venderlos mientras dormimos.',
    author: 'Rafa, productor',
    formTitle: 'Tu pedido',
    formOptions: ['Garrafa 2 L', 'Pack 3 botellas', 'Caja regalo'],
    success: 'Pedido confirmado. Te enviamos el seguimiento por correo.',
  },
];

const DEVICES = [
  { id: 'desktop', label: 'Escritorio', icon: Monitor, width: '100%' },
  { id: 'tablet', label: 'Tablet', icon: Tablet, width: '640px' },
  { id: 'mobile', label: 'Móvil', icon: Smartphone, width: '360px' },
] as const;

type DeviceId = (typeof DEVICES)[number]['id'];

export function WebBuilderDemo() {
  const [sectorId, setSectorId] = useState<Sector['id']>('restaurante');
  const [device, setDevice] = useState<DeviceId>('desktop');
  const [dark, setDark] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const sector = SECTORS.find((s) => s.id === sectorId)!;
  const width = DEVICES.find((d) => d.id === device)!.width;

  return (
    <div className="flex flex-col gap-4">
      {/* Controles */}
      <div className="flex flex-col xl:flex-row xl:items-center gap-3 xl:justify-between">
        <Segmented
          label="Sector"
          value={sectorId}
          onChange={(v) => setSectorId(v as Sector['id'])}
          options={SECTORS.map((s) => ({ id: s.id, label: s.label }))}
        />
        <div className="flex flex-wrap items-center gap-3">
          <Segmented
            label="Dispositivo"
            value={device}
            onChange={(v) => setDevice(v as DeviceId)}
            options={DEVICES.map((d) => ({ id: d.id, label: d.label, icon: d.icon }))}
            iconsOnly
          />
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            aria-pressed={dark}
            className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border border-steel/60 bg-card text-slate hover:border-slate transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer"
          >
            {dark ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
            {dark ? 'Claro' : 'Oscuro'}
          </button>
          <button
            type="button"
            onClick={() => setShowCode((c) => !c)}
            aria-pressed={showCode}
            className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer ${
              showCode ? 'bg-ink border-ink text-white' : 'border-steel/60 bg-card text-slate hover:border-slate'
            }`}
          >
            <CodeXml className="w-4 h-4" aria-hidden="true" />
            {/* En pantallas estrechas el código ocupa el sitio de la web, así que el botón sirve para volver */}
            <span className="lg:hidden">{showCode ? 'Ver web' : 'Código'}</span>
            <span className="hidden lg:inline">Código</span>
          </button>
        </div>
      </div>

      {/* Escenario: la web en su navegador */}
      <div className="rounded-xl ring-1 ring-steel/40 p-3 sm:p-5 bg-near-white bg-[radial-gradient(circle,rgba(169,183,196,0.45)_1px,transparent_1px)] bg-[size:18px_18px]">
        <div className={`grid gap-4 ${showCode ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]' : ''}`}>
          {/* Por debajo de lg no cabe al lado: el código sustituye a la web en el mismo sitio */}
          <div className={`mx-auto w-full transition-[max-width] duration-500 ease-out ${showCode ? 'hidden lg:block' : ''}`} style={{ maxWidth: width }}>
            <BrowserFrame domain={sector.domain} compact={device === 'mobile'}>
              <Fragment key={sector.id}>
                <MiniSite sector={sector} dark={dark} />
              </Fragment>
            </BrowserFrame>
          </div>
          {showCode && <CodePanel sector={sector} dark={dark} />}
        </div>
      </div>
    </div>
  );
}

function Segmented({
  label,
  value,
  onChange,
  options,
  iconsOnly = false,
}: {
  label: string;
  value: string;
  onChange: (id: string) => void;
  options: { id: string; label: string; icon?: ComponentType<{ className?: string }> }[];
  iconsOnly?: boolean;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap p-1 rounded-lg bg-card ring-1 ring-steel/50 gap-1 w-fit">
      {options.map((o) => {
        const Icon = o.icon;
        const active = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={iconsOnly ? o.label : undefined}
            title={iconsOnly ? o.label : undefined}
            onClick={() => onChange(o.id)}
            className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer ${
              active ? 'bg-copper text-white' : 'text-slate hover:bg-steel/20'
            }`}
          >
            {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
            {!iconsOnly && o.label}
          </button>
        );
      })}
    </div>
  );
}

function BrowserFrame({ domain, compact, children }: { domain: string; compact: boolean; children: ReactNode }) {
  return (
    <div className={`overflow-hidden bg-ink shadow-xl ring-1 ring-slate ${compact ? 'rounded-[1.75rem] p-1.5' : 'rounded-xl'}`}>
      <div className={`flex items-center gap-2 px-3 ${compact ? 'py-1.5 justify-center' : 'py-2.5'}`}>
        {!compact && (
          <div className="flex gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-slate" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate" />
            <span className="w-2.5 h-2.5 rounded-full bg-copper" />
          </div>
        )}
        <div className={`flex items-center gap-1.5 bg-slate/60 rounded-md px-2.5 py-1 text-[11px] text-snow/85 min-w-0 ${compact ? '' : 'flex-1 max-w-sm mx-auto'}`}>
          <Lock className="w-3 h-3 text-steel shrink-0" aria-hidden="true" />
          <span className="truncate">{domain}</span>
          {!compact && <RotateCw className="w-3 h-3 text-steel ml-auto shrink-0" aria-hidden="true" />}
        </div>
      </div>
      <div className={`relative h-[30rem] overflow-hidden ${compact ? 'rounded-[1.4rem]' : ''}`}>{children}</div>
    </div>
  );
}

/** La web de ejemplo. Usa container queries: se adapta al ancho del marco, no al de la pantalla. */
function MiniSite({ sector, dark }: { sector: Sector; dark: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const Icon = sector.icon;

  const palette = (
    dark
      ? { '--s-bg': '#14181F', '--s-fg': '#EEF1F4', '--s-muted': '#9AA5B1', '--s-card': '#1D232D', '--s-line': '#2C3440' }
      : { '--s-bg': '#FFFFFF', '--s-fg': '#1F2530', '--s-muted': '#5F6874', '--s-card': '#F5F6F7', '--s-line': '#E3E7EB' }
  ) as CSSProperties;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      className="absolute inset-0 bg-[var(--s-bg)] text-[var(--s-fg)] transition-colors duration-500"
      style={{ ...palette, '--accent': sector.accent } as CSSProperties}
    >
      {/* La página hace scroll dentro del marco; el formulario queda fijo encima */}
      <div className="@container absolute inset-0 overflow-y-auto overscroll-contain animate-[lab-fade-in_0.45s_ease-out]">
        {/* Navegación */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b border-[var(--s-line)] bg-[var(--s-bg)]/95 backdrop-blur-sm">
          <span className="flex items-center gap-2 font-bold text-sm">
            <span className="w-7 h-7 rounded-md bg-[var(--accent)] text-white flex items-center justify-center">
              <Icon className="w-4 h-4" aria-hidden="true" />
            </span>
            {sector.brand}
          </span>
          <nav className="hidden @lg:flex items-center gap-5 text-xs text-[var(--s-muted)]" aria-label={`Menú de ${sector.brand}`}>
            <span>Inicio</span>
            <span>Servicios</span>
            <span>Contacto</span>
            <button type="button" onClick={() => setFormOpen(true)} className="text-xs font-semibold text-white bg-[var(--accent)] px-3 py-1.5 rounded-full cursor-pointer hover:opacity-90">
              {sector.cta}
            </button>
          </nav>
          <button type="button" onClick={() => setMenuOpen((o) => !o)} className="@lg:hidden p-1.5 rounded cursor-pointer" aria-label="Menú" aria-expanded={menuOpen}>
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </header>
        {menuOpen && (
          <div className="@lg:hidden px-5 py-3 border-b border-[var(--s-line)] flex flex-col gap-2 text-sm animate-[lab-fade-in_0.25s_ease-out]">
            <span>Inicio</span>
            <span>Servicios</span>
            <span>Contacto</span>
          </div>
        )}

        {/* Portada */}
        <section className="px-5 pt-8 pb-10 grid gap-6 @2xl:grid-cols-2 @2xl:items-center @2xl:px-10 @2xl:py-14">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] mb-4">
              <MapPin className="w-3 h-3" aria-hidden="true" /> Madrid
            </span>
            <h3 className="text-2xl @2xl:text-3xl font-bold leading-tight tracking-tight mb-3">{sector.headline}</h3>
            <p className="text-sm text-[var(--s-muted)] mb-6">{sector.sub}</p>
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="inline-flex items-center gap-2 bg-[var(--accent)] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
            >
              <CalendarCheck className="w-4 h-4" aria-hidden="true" /> {sector.cta}
            </button>
          </div>
          <div
            className="relative aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${sector.accent}, ${sector.accent}55 60%, var(--s-card))` }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,white_1.5px,transparent_1.5px)] bg-[size:16px_16px]" />
            <Icon className="relative w-20 h-20 text-white/90" />
            <span className="absolute bottom-3 left-3 text-[11px] font-semibold bg-white/90 text-[#1F2530] px-2.5 py-1 rounded-full inline-flex items-center gap-1">
              <Clock className="w-3 h-3" /> Abierto ahora
            </span>
          </div>
        </section>

        {/* Ventajas */}
        <section className="px-5 pb-10 @2xl:px-10 grid gap-3 @lg:grid-cols-3">
          {sector.features.map((f) => (
            <div key={f.title} className="rounded-xl bg-[var(--s-card)] p-4">
              <span className="block w-6 h-1 rounded-full bg-[var(--accent)] mb-3" />
              <p className="text-sm font-semibold mb-1">{f.title}</p>
              <p className="text-xs text-[var(--s-muted)] leading-relaxed">{f.text}</p>
            </div>
          ))}
        </section>

        {/* Opinión */}
        <section className="mx-5 mb-10 @2xl:mx-10 rounded-2xl border border-[var(--s-line)] p-5">
          <div className="flex gap-0.5 text-[var(--accent)] mb-2" aria-label="5 estrellas">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
            ))}
          </div>
          <p className="text-sm leading-relaxed mb-2">"{sector.quote}"</p>
          <p className="text-xs text-[var(--s-muted)]">{sector.author}</p>
        </section>

        <footer className="px-5 py-5 @2xl:px-10 border-t border-[var(--s-line)] text-[11px] text-[var(--s-muted)] flex flex-wrap justify-between gap-2">
          <span>© {sector.brand}</span>
          <span>
            Web creada por <span className="font-semibold text-[var(--accent)]">EG Solutions</span>
          </span>
        </footer>
      </div>

      {/* Formulario del botón principal, dentro de la propia web */}
      {formOpen && (
        <div className="absolute inset-0 z-20 flex items-end sm:items-center justify-center bg-black/40 p-3 animate-[lab-fade-in_0.2s_ease-out]" onClick={(e) => e.target === e.currentTarget && setFormOpen(false)}>
          <div className="w-full max-w-sm rounded-2xl bg-[var(--s-bg)] p-5 shadow-2xl">
            {sent ? (
              <div className="text-center py-4">
                <span className="w-12 h-12 mx-auto rounded-full bg-[var(--accent)] text-white flex items-center justify-center mb-3">
                  <Check className="w-6 h-6" aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold mb-1">¡Listo!</p>
                <p className="text-xs text-[var(--s-muted)] mb-4">{sector.success}</p>
                <p className="text-[11px] text-[var(--s-muted)] border-t border-[var(--s-line)] pt-3">
                  Ese aviso lo enviaría una automatización, como las del primer demo.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormOpen(false);
                    setSent(false);
                  }}
                  className="mt-4 text-xs font-semibold text-[var(--accent)] cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">{sector.formTitle}</p>
                  <button type="button" onClick={() => setFormOpen(false)} aria-label="Cerrar" className="p-1 cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <label className="block text-xs">
                  <span className="text-[var(--s-muted)]">Nombre</span>
                  <input required defaultValue="María" className="mt-1 w-full rounded-lg bg-[var(--s-card)] border border-[var(--s-line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
                </label>
                <label className="block text-xs">
                  <span className="text-[var(--s-muted)]">Opción</span>
                  <select className="mt-1 w-full rounded-lg bg-[var(--s-card)] border border-[var(--s-line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
                    {sector.formOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <button type="submit" className="w-full bg-[var(--accent)] text-white text-sm font-semibold py-2.5 rounded-full hover:opacity-90 cursor-pointer">
                  {sector.cta}
                </button>
                <p className="text-[10px] text-center text-[var(--s-muted)]">Demo: no se envía ningún dato.</p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/** Código (simplificado) que genera la web de la izquierda; cambia con cada opción. */
function CodePanel({ sector, dark }: { sector: Sector; dark: boolean }) {
  const k = 'text-[#E3A57E]';
  const s = 'text-[#9FC3A8]';
  const c = 'text-steel/70';
  return (
    <div className="rounded-xl bg-ink ring-1 ring-slate overflow-hidden min-w-0 min-h-[32rem] lg:min-h-0 animate-[lab-fade-in_0.3s_ease-out]">
      <div className="px-4 py-2 border-b border-slate text-[11px] font-mono text-steel">src/site.config.ts</div>
      <pre className="p-4 text-[11.5px] leading-relaxed font-mono text-snow/90 overflow-x-auto h-full">
        <code>
          <span className={c}>{'// Cambia una línea y la web entera se adapta'}</span>
          {'\n'}
          <span className={k}>export const</span> site = {'{'}
          {'\n  '}name: <span className={s}>'{sector.brand}'</span>,
          {'\n  '}domain: <span className={s}>'{sector.domain}'</span>,
          {'\n  '}theme: <span className={s}>'{dark ? 'dark' : 'light'}'</span>,
          {'\n  '}accent: <span className={s}>'{sector.accent}'</span>,
          {'\n  '}hero: {'{'}
          {'\n    '}title: <span className={s}>'{sector.headline}'</span>,
          {'\n    '}cta: <span className={s}>'{sector.cta}'</span>,
          {'\n  }'},
          {'\n  '}form: {'{'}
          {'\n    '}onSubmit: <span className={s}>'n8n/webhook'</span>,
          {'\n    '}notify: [<span className={s}>'whatsapp'</span>, <span className={s}>'email'</span>],
          {'\n  }'},
          {'\n  '}credit: <span className={s}>'Web creada por EG Solutions'</span>,
          {'\n}'};
        </code>
      </pre>
    </div>
  );
}
