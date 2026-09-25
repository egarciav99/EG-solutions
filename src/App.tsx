/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { usePage } from './router';

// Code splitting: Secciones inferiores cargadas asíncronamente para despejar el hilo principal en el primer pintado
const HomePreviews = lazy(() => import('./components/HomePreviews').then((m) => ({ default: m.HomePreviews })));
const Services = lazy(() => import('./components/Services').then((m) => ({ default: m.Services })));
const CaseStudies = lazy(() => import('./components/CaseStudies').then((m) => ({ default: m.CaseStudies })));
const Differential = lazy(() => import('./components/Differential').then((m) => ({ default: m.Differential })));
const Contact = lazy(() => import('./components/Contact').then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import('./components/NotFound').then((m) => ({ default: m.NotFound })));
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));

// Marcador de posición liviano sin saltos de layout (CLS guard)
function SectionFallback({ minHeightClass = 'min-h-[400px]' }: { minHeightClass?: string }) {
  return (
    <div
      className={`w-full ${minHeightClass} bg-near-white border-b border-steel/20 flex items-center justify-center`}
      aria-hidden="true"
    />
  );
}

export default function App() {
  const [page, navigate] = usePage();
  const [inquiryService, setInquiryService] = useState<string>('Plataformas Web');
  const [inquiryContext, setInquiryContext] = useState<string>('');

  const handleSelectService = (serviceName: string) => {
    setInquiryService(serviceName);
    setInquiryContext('');
    navigate('contacto');
  };

  const handleSelectProjectForDiscussion = (projectName: string) => {
    setInquiryContext(projectName);
    navigate('contacto');
  };

  const handleOpenConsultation = () => {
    navigate('contacto');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F8] text-[#2B3242]">
      {/* Barra de navegación (Bundle inicial) */}
      <Header onNavigate={navigate} onOpenConsultation={handleOpenConsultation} activePage={page} />

      {/* Contenido de la página actual */}
      <main className="flex-1">
        {page === 'top' && (
          <>
            {/* Portada: hero + resumen de cada página, con enlace al detalle */}
            <Hero onConsultationClick={handleOpenConsultation} onExploreProjectsClick={() => navigate('proyectos')} />
            <Suspense fallback={<SectionFallback minHeightClass="min-h-[900px]" />}>
              <HomePreviews onNavigate={navigate} />
            </Suspense>
          </>
        )}

        {page === 'servicios' && (
          <Suspense fallback={<SectionFallback minHeightClass="min-h-[600px]" />}>
            <Services onSelectServiceForInquiry={handleSelectService} />
          </Suspense>
        )}

        {page === 'proyectos' && (
          <Suspense fallback={<SectionFallback minHeightClass="min-h-[700px]" />}>
            <CaseStudies onSelectProjectForDiscussion={handleSelectProjectForDiscussion} />
          </Suspense>
        )}

        {page === 'diferencial' && (
          <Suspense fallback={<SectionFallback minHeightClass="min-h-[500px]" />}>
            <Differential />
          </Suspense>
        )}

        {page === 'contacto' && (
          <Suspense fallback={<SectionFallback minHeightClass="min-h-[600px]" />}>
            {/* La key vuelve a montar el formulario con el servicio o proyecto elegido */}
            <Contact
              key={`${inquiryService}|${inquiryContext}`}
              initialService={inquiryService}
              initialProjectContext={inquiryContext}
            />
          </Suspense>
        )}

        {page === 'notfound' && (
          <Suspense fallback={<SectionFallback minHeightClass="min-h-[500px]" />}>
            <NotFound onNavigate={navigate} />
          </Suspense>
        )}
      </main>

      {/* Pie de página */}
      <Suspense fallback={<SectionFallback minHeightClass="min-h-[250px]" />}>
        <Footer onNavigate={navigate} />
      </Suspense>
    </div>
  );
}
