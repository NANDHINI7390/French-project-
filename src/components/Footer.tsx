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
    <footer className="w-full bg-[#16332A] text-[#F8F4EA] pt-12 border-t border-[#C6A468]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#C6A468] bg-white p-0.5 shadow-md flex items-center justify-center">
                <img
                  src={LOGO_URL}
                  alt="EXO ISLAND Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-fraunces text-2xl font-bold tracking-tight text-[#F8F4EA] leading-none block">
                  EXO ISLAND
                </span>
                <span className="text-[10px] font-semibold tracking-[0.25em] text-[#C6A468] uppercase mt-0.5 block">
                  SUPERMARCHÉ
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A8BFAE] font-light max-w-sm leading-relaxed">
              Le meilleur du frais chaque jour. Retrouvez les saveurs du monde entier et nos produits artisanaux à Goussainville et Sarcelles.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="#facebook"
                aria-label="Facebook EXO ISLAND"
                className="w-8 h-8 rounded-full bg-[#234d40] text-[#F8F4EA] flex items-center justify-center hover:bg-[#C6A468] hover:text-[#16332A] transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram EXO ISLAND"
                className="w-8 h-8 rounded-full bg-[#234d40] text-[#F8F4EA] flex items-center justify-center hover:bg-[#C6A468] hover:text-[#16332A] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube EXO ISLAND"
                className="w-8 h-8 rounded-full bg-[#234d40] text-[#F8F4EA] flex items-center justify-center hover:bg-[#C6A468] hover:text-[#16332A] transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#C6A468]">
              INFOS PRATIQUES
            </h4>
            <ul className="space-y-1.5 text-xs text-[#F8F4EA]/80 font-light">
              <li>
                <a href="#magasins" className="hover:text-[#C6A468] transition-colors">
                  Nos supermarchés
                </a>
              </li>
              <li>
                <a href="#livraison" className="hover:text-[#C6A468] transition-colors">
                  Livraison à domicile
                </a>
              </li>
              <li>
                <a href="#click-collect" className="hover:text-[#C6A468] transition-colors">
                  Click & Collect 2h
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C6A468] transition-colors">
                  Boucherie & Traiteur
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#C6A468]">
              SERVICES CLIENTS
            </h4>
            <ul className="space-y-1.5 text-xs text-[#F8F4EA]/80 font-light">
              <li>
                <a href="#commandes" className="hover:text-[#C6A468] transition-colors">
                  Suivre ma commande
                </a>
              </li>
              <li>
                <a href="#favoris" className="hover:text-[#C6A468] transition-colors">
                  Mes favoris
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#C6A468] transition-colors">
                  Contacter le service client
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#C6A468] transition-colors">
                  Foire aux questions
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#C6A468]">
              NEWSLETTER
            </h4>
            <p className="text-xs text-[#A8BFAE] font-light leading-relaxed">
              Recevez nos meilleures offres et arrivages du marché chaque semaine.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="relative flex items-center">
                <input
                  id="newsletter-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email..."
                  required
                  className="w-full pl-3 pr-20 py-2 rounded-lg bg-[#234d40] text-xs text-white placeholder-[#A8BFAE]/60 border border-white/10 focus:outline-none focus:border-[#C6A468]"
                />
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  className="absolute right-1 px-2.5 py-1 rounded bg-[#C6A468] text-[#16332A] text-xs font-bold hover:bg-[#DFCA9B] transition-colors"
                >
                  OK
                </button>
              </div>

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

      {/* Bottom Bar matching Reference HTML */}
      <div className="px-4 sm:px-8 py-3 bg-[#0f241d] text-[10px] text-[#A8BFAE]/70 uppercase tracking-[0.25em] flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-white/5">
        <span>© 2024-2026 EXO ISLAND FRANCE — L'EXCELLENCE AU QUOTIDIEN</span>
        <span className="font-semibold text-[#C6A468]">LIVRAISON OFFERTE DÈS 40€</span>
      </div>
    </footer>
  );
};
