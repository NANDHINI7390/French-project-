import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Check } from 'lucide-react';
import { LOGO_URL } from '../data/storeData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full bg-[#16332A] text-white pt-12 pb-8 border-t border-[#16332A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* 5 Column Grid matching Screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-10">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                <img
                  src={LOGO_URL}
                  alt="EXO ISLAND Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-fraunces text-xl font-bold tracking-tight text-white leading-none block">
                  EXO ISLAND
                </span>
                <span className="text-[9px] font-semibold tracking-[0.25em] text-[#C6A468] uppercase mt-0.5 block">
                  SUPERMARCHÉ
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A8BFAE] font-light leading-relaxed">
              Le meilleur du frais, chaque jour pour vous.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="#facebook"
                aria-label="Facebook EXO ISLAND"
                className="w-7 h-7 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-[#C6A468] hover:text-[#16332A] hover:border-[#C6A468] transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram EXO ISLAND"
                className="w-7 h-7 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-[#C6A468] hover:text-[#16332A] hover:border-[#C6A468] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#tiktok"
                aria-label="TikTok EXO ISLAND"
                className="w-7 h-7 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-[#C6A468] hover:text-[#16332A] hover:border-[#C6A468] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 2.312-4.637c.32 0 .633.05.927.145V9.454a6.34 6.34 0 0 0-.927-.068C6.012 9.386 3.2 12.203 3.2 15.686c0 3.483 2.812 6.3 6.284 6.3 3.473 0 6.285-2.817 6.285-6.3V8.89a8.212 8.212 0 0 0 4.82 1.558V7.003a4.81 4.81 0 0 1-1-.317z"/>
                </svg>
              </a>
              <a
                href="#youtube"
                aria-label="YouTube EXO ISLAND"
                className="w-7 h-7 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-[#C6A468] hover:text-[#16332A] hover:border-[#C6A468] transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: INFOS PRATIQUES */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              INFOS PRATIQUES
            </h4>
            <ul className="space-y-2 text-xs text-[#E2EBE5] font-light">
              <li>
                <a href="#magasins" className="hover:text-[#C6A468] transition-colors">
                  Nos magasins
                </a>
              </li>
              <li>
                <a href="#livraison" className="hover:text-[#C6A468] transition-colors">
                  Livraison
                </a>
              </li>
              <li>
                <a href="#click-collect" className="hover:text-[#C6A468] transition-colors">
                  Click & Collect
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C6A468] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#C6A468] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: MON COMPTE */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              MON COMPTE
            </h4>
            <ul className="space-y-2 text-xs text-[#E2EBE5] font-light">
              <li>
                <a href="#commandes" className="hover:text-[#C6A468] transition-colors">
                  Mes commandes
                </a>
              </li>
              <li>
                <a href="#favoris" className="hover:text-[#C6A468] transition-colors">
                  Mes favoris
                </a>
              </li>
              <li>
                <a href="#adresses" className="hover:text-[#C6A468] transition-colors">
                  Mes adresses
                </a>
              </li>
              <li>
                <a href="#profil" className="hover:text-[#C6A468] transition-colors">
                  Mon profil
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: À PROPOS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              À PROPOS
            </h4>
            <ul className="space-y-2 text-xs text-[#E2EBE5] font-light">
              <li>
                <a href="#qui-sommes-nous" className="hover:text-[#C6A468] transition-colors">
                  Qui sommes-nous ?
                </a>
              </li>
              <li>
                <a href="#engagement" className="hover:text-[#C6A468] transition-colors">
                  Notre engagement
                </a>
              </li>
              <li>
                <a href="#recrutement" className="hover:text-[#C6A468] transition-colors">
                  Recrutement
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#C6A468] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: NEWSLETTER */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              NEWSLETTER
            </h4>
            <p className="text-xs text-[#A8BFAE] font-light leading-relaxed">
              Recevez nos offres et nos bons plans !
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <input
                id="newsletter-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                required
                className="w-full px-3 py-2 rounded-lg bg-[#234d40] text-xs text-white placeholder-[#A8BFAE]/70 border border-white/20 focus:outline-none focus:border-[#C6A468]"
              />
              <button
                id="newsletter-submit-btn"
                type="submit"
                className="w-full py-2 rounded-lg bg-[#C6A468] hover:bg-[#d9b87b] text-[#16332A] text-xs font-bold transition-colors cursor-pointer"
              >
                S'inscrire
              </button>

              {isSubscribed && (
                <div className="text-[11px] text-[#A8BFAE] flex items-center gap-1.5 bg-[#234d40] p-1.5 rounded border border-[#A8BFAE]/20">
                  <Check className="w-3 h-3 text-[#C6A468]" />
                  <span>Inscription confirmée !</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </footer>
  );
};

