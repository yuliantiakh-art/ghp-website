import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Tentang Kami', path: '#about' },
    { name: 'Program Kebaikan', path: '/programs' },
    { name: 'Cerita Kebaikan', path: '/media' },
    { name: 'Relawan', path: '#volunteer' },
    { name: 'Transparansi', path: '#transparency' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('#')) return false;
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-secondary-cream/95 backdrop-blur-md border-b border-secondary-sand/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <Link to="/programs" className="flex items-center space-x-3 group">
            <img 
              src="/images/logo.png" 
              alt="Logo Gerakan Hasan Peduli" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <span className="font-display text-base sm:text-lg font-bold tracking-tight text-primary block leading-none">
                Gerakan Hasan Peduli
              </span>
              <span className="text-[9px] uppercase tracking-widest text-accent-terracotta font-bold mt-1 block">
                Satu Hati, Sejuta Aksi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return link.path.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.path}
                  className="font-medium text-sm text-charcoal/80 hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-medium text-sm transition-colors duration-200 ${
                    active
                      ? 'text-primary font-semibold border-b-2 border-primary pb-1'
                      : 'text-charcoal/80 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/programs"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary text-secondary-cream hover:bg-primary-hover font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
            >
              <span>Ikut Berbagi</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-primary hover:bg-secondary-beige/50 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-secondary-cream border-b border-secondary-sand/30 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            link.path.startsWith('#') ? (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-charcoal hover:bg-secondary-beige/40 hover:text-primary transition-all"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-primary/5 text-primary font-semibold'
                    : 'text-charcoal hover:bg-secondary-beige/40 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            )
          ))}
          <div className="pt-4 px-4">
            <Link
              to="/programs"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-primary text-secondary-cream hover:bg-primary-hover font-medium text-base shadow-sm"
            >
              Ikut Berdonasi
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
