/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

// Code splitting: Secciones inferiores cargadas asíncronamente para despejar el hilo principal en el primer pintado
const Services = lazy(() => import('./components/Services').then((m) => ({ default: m.Services })));
const CaseStudies = lazy(() => import('./components/CaseStudies').then((m) => ({ default: m.CaseStudies })));
const Differential = lazy(() => import('./components/Differential').then((m) => ({ default: m.Differential })));
const Contact = lazy(() => import('./components/Contact').then((m) => ({ default: m.Contact })));
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
  const [inquiryService, setInquiryService] = useState<string>('Plataformas Web');
  const [inquiryContext, setInquiryContext] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setInquiryService(serviceName);
    setInquiryContext('');
    scrollToSection('contacto');
  };

  const handleSelectProjectForDiscussion = (projectName: string) => {
    setInquiryContext(projectName);
    scrollToSection('contacto');
  };

  const handleOpenConsultation = () => {
    scrollToSection('contacto');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F8] text-[#2B3242]">
      {/* Barra de navegación técnica (Bundle inicial) */}
      <Header
        onNavigate={scrollToSection}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Contenido principal */}
      <main className="flex-1">
        {/* 1. Hero con esquemático de arquitectura e identidad de ingeniería (Bundle inicial, visible en 1er frame) */}
        <Hero
          onConsultationClick={handleOpenConsultation}
          onExploreProjectsClick={() => scrollToSection('proyectos')}
        />

        {/* Secciones debajo del primer pantallazo cargadas en segundo plano con Suspense */}
        <Suspense fallback={<SectionFallback minHeightClass="min-h-[600px]" />}>
          {/* 2. Servicios: Tres líneas con jerarquía real y lenguaje concreto */}
          <Services onSelectServiceForInquiry={handleSelectService} />
        </Suspense>

        <Suspense fallback={<SectionFallback minHeightClass="min-h-[700px]" />}>
          {/* 3. Casos de éxito y propuestas técnicas */}
          <CaseStudies onSelectProjectForDiscussion={handleSelectProjectForDiscussion} />
        </Suspense>

        <Suspense fallback={<SectionFallback minHeightClass="min-h-[500px]" />}>
          {/* 4. Cómo trabajo / Perfil diferencial */}
          <Differential />
        </Suspense>

        <Suspense fallback={<SectionFallback minHeightClass="min-h-[600px]" />}>
          {/* 5. Contacto: Simple y directo */}
          <Contact
            initialService={inquiryService}
            initialProjectContext={inquiryContext}
          />
        </Suspense>
      </main>

      {/* Pie de página */}
      <Suspense fallback={<SectionFallback minHeightClass="min-h-[250px]" />}>
        <Footer onNavigate={scrollToSection} />
      </Suspense>
    </div>
  );
}
