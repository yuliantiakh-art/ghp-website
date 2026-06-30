import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProgramsLanding } from './pages/ProgramsLanding';
import { ProgramDetail } from './pages/ProgramDetail';
import { ProgramsArchive } from './pages/ProgramsArchive';
import { MediaLanding } from './pages/MediaLanding';
import { MediaDetail } from './pages/MediaDetail';
import { MediaArchive } from './pages/MediaArchive';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-secondary-cream text-charcoal selection:bg-primary/10 selection:text-primary">
        {/* Navigation Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            {/* Direct landing on programs page for GHP prototype */}
            <Route path="/" element={<Navigate to="/programs" replace />} />
            
            {/* Programs Modules */}
            <Route path="/programs" element={<ProgramsLanding />} />
            <Route path="/programs/archive" element={<ProgramsArchive />} />
            <Route path="/programs/:slug" element={<ProgramDetail />} />
            
            {/* Media Modules */}
            <Route path="/media" element={<MediaLanding />} />
            <Route path="/media/archive" element={<MediaArchive />} />
            <Route path="/media/:slug" element={<MediaDetail />} />

            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/programs" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating WhatsApp Action Button */}
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
};

export default App;
