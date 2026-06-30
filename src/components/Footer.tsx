import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Youtube, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-dark text-secondary-beige pt-16 pb-8 border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/logo.png" 
                alt="Logo Gerakan Hasan Peduli" 
                className="w-10 h-10 object-contain brightness-0 invert"
              />
              <span className="font-display text-lg font-bold tracking-tight text-secondary-cream">
                Gerakan Hasan Peduli
              </span>
            </div>
            <p className="text-secondary-sand text-sm max-w-sm leading-relaxed">
              Rumah digital gerakan sosial berbasis komunitas yang menghubungkan kebaikan untuk melahirkan dampak sosial yang amanah, transparan, dan berkelanjutan.
            </p>
            <div className="inline-block px-4 py-2 bg-primary/20 rounded-lg border border-primary/30">
              <span className="font-display italic text-xs tracking-wider text-accent-amber font-medium">
                "Satu Hati, Sejuta Aksi."
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-secondary-cream">
              Program Kebaikan
            </h3>
            <ul className="space-y-2.5 text-sm text-secondary-sand">
              <li>
                <Link to="/programs/santunan-anak-yatim" className="hover:text-accent-amber transition-colors">
                  Santunan Anak Yatim
                </Link>
              </li>
              <li>
                <Link to="/programs/tebar-quran-nusantara" className="hover:text-accent-amber transition-colors">
                  Tebar Qur'an Nusantara
                </Link>
              </li>
              <li>
                <Link to="/programs/jumat-berkah" className="hover:text-accent-amber transition-colors">
                  Gerakan Jum'at Berkah
                </Link>
              </li>
              <li>
                <Link to="/programs/archive" className="hover:text-accent-amber transition-colors">
                  Arsip Program Selesai
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-secondary-cream">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 text-sm text-secondary-sand">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-accent-amber shrink-0" />
                <span>Bandung, Jawa Barat, Indonesia</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent-amber shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent-amber shrink-0" />
                <span>info@hasanpeduli.org</span>
              </li>
            </ul>
            <div className="pt-4 flex items-center space-x-4 text-secondary-sand">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-amber transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-amber transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-amber transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal links */}
        <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row items-center justify-between text-xs text-secondary-sand/65 gap-4">
          <p>&copy; {new Date().getFullYear()} Gerakan Hasan Peduli. Hak Cipta Dilindungi.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-accent-amber transition-colors">Kebijakan Privasi</a>
            <a href="#terms" className="hover:text-accent-amber transition-colors">Syarat & Ketentuan</a>
            <a href="#faq" className="hover:text-accent-amber transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
