/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { CaseStudies } from './components/CaseStudies';
import { Differential } from './components/Differential';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

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
      {/* Barra de navegación técnica */}
      <Header
        onNavigate={scrollToSection}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Contenido principal */}
      <main className="flex-1">
        {/* 1. Hero con esquemático de arquitectura e identidad de ingeniería */}
        <Hero
          onConsultationClick={handleOpenConsultation}
          onExploreProjectsClick={() => scrollToSection('proyectos')}
        />

        {/* 2. Servicios: Tres líneas con jerarquía real y lenguaje concreto */}
        <Services onSelectServiceForInquiry={handleSelectService} />

        {/* 3. Casos de éxito reales: Activación de Marca Nacional, DuoVarietta, CoreIT */}
        <CaseStudies onSelectProjectForDiscussion={handleSelectProjectForDiscussion} />

        {/* 4. Cómo trabajo / Perfil diferencial: ingeniería eléctrica + software + IA */}
        <Differential />

        {/* 5. Contacto: Simple, directo y sin campos innecesarios */}
        <Contact
          initialService={inquiryService}
          initialProjectContext={inquiryContext}
        />
      </main>

      {/* Pie de página con colofón técnico */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
