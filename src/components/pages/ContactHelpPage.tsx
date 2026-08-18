import React, { useState } from 'react';
import { FAQ_ITEMS, STORES } from '../../data/storeData';
import {
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Mail,
  Phone,
  MessageSquare,
  Check,
  Send,
  MapPin,
  Clock,
} from 'lucide-react';

interface ContactHelpPageProps {
  onNavigateHome: () => void;
  onNavigateStores: () => void;
}

export const ContactHelpPage: React.FC<ContactHelpPageProps> = ({
  onNavigateHome,
  onNavigateStores,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('all');

  // Contact Form state
  const [formData, setFormData] = useState({
    subject: 'Question sur une commande en cours',
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const categories = ['all', ...Array.from(new Set(FAQ_ITEMS.map((f) => f.category)))];

  const filteredFaqs =
    selectedFaqCategory === 'all'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((f) => f.category === selectedFaqCategory);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.message) {
      setIsSent(true);
      setFormData({
        subject: 'Question sur une commande en cours',
        fullName: '',
        email: '',
        phone: '',
        message: '',
      });
      setTimeout(() => setIsSent(false), 6000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F4EA] py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Fil d'ariane" className="flex items-center gap-2 text-xs text-[#232420]/60 mb-6">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#16332A] transition-colors cursor-pointer font-medium"
          >
            Accueil
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#16332A] font-bold">Contact & Aide (FAQ)</span>
        </nav>

        {/* Hero Header */}
        <div className="bg-[#16332A] text-white rounded-3xl p-6 sm:p-10 mb-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#C6A468]/20 border border-[#C6A468]/30 px-3 py-1 rounded-full text-xs text-[#E7CF9B] font-bold tracking-wider uppercase mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#C6A468]" />
              <span>Assistance Client 7j/7</span>
            </div>

            <h1 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              Besoin d'aide ? <span className="italic text-[#C6A468] font-normal">Contactez-nous</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#A8BFAE] font-light leading-relaxed">
              Consultez notre foire aux questions ou envoyez un message directement à notre service client pour toute question concernant vos commandes, produits ou magasins.
            </p>
          </div>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D5] shadow-xs text-center">
            <div className="w-12 h-12 rounded-xl bg-[#FAF7F0] text-[#16332A] flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-[#C6A468]" />
            </div>
            <h3 className="font-fraunces font-bold text-base text-[#16332A] mb-1">
              Service Client Téléphonique
            </h3>
            <span className="font-mono-price font-bold text-sm text-[#16332A] block mb-1">
              01 34 50 12 12
            </span>
            <span className="text-[11px] text-gray-500">Du lundi au samedi : 8h00 - 20h00</span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D5] shadow-xs text-center">
            <div className="w-12 h-12 rounded-xl bg-[#FAF7F0] text-[#16332A] flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-[#C6A468]" />
            </div>
            <h3 className="font-fraunces font-bold text-base text-[#16332A] mb-1">
              Courrier Électronique
            </h3>
            <span className="font-semibold text-xs text-[#16332A] block mb-1">
              contact@exoisland.fr
            </span>
            <span className="text-[11px] text-gray-500">Réponse garantie sous 24h ouvrées</span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D5] shadow-xs text-center">
            <div className="w-12 h-12 rounded-xl bg-[#FAF7F0] text-[#16332A] flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-[#C6A468]" />
            </div>
            <h3 className="font-fraunces font-bold text-base text-[#16332A] mb-1">
              Accueil en Magasin
            </h3>
            <span className="text-xs font-semibold text-[#16332A] block mb-1">
              Goussainville & Sarcelles
            </span>
            <button
              onClick={onNavigateStores}
              className="text-[11px] text-[#6B2E3B] font-bold hover:underline"
            >
              Voir les adresses et horaires →
            </button>
          </div>
        </div>

        {/* Main Grid: FAQ (7 cols) + Contact Form (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* FAQ Accordion Section (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="font-fraunces text-2xl font-bold text-[#16332A] mb-2">
                Foire Aux Questions (FAQ)
              </h2>
              <p className="text-xs text-[#232420]/70 font-light">
                Trouvez les réponses instantanées aux questions les plus fréquentes.
              </p>
            </div>

            {/* FAQ Category filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFaqCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedFaqCategory === cat
                      ? 'bg-[#16332A] text-white shadow-md'
                      : 'bg-white text-[#232420] border border-[#E8E2D5] hover:border-[#16332A]'
                  }`}
                >
                  {cat === 'all' ? 'Toutes les questions' : cat}
                </button>
              ))}
            </div>

            {/* Accordion list */}
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-[#E8E2D5] overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-[#FAF7F0] transition-colors"
                    >
                      <span className="font-fraunces font-bold text-sm text-[#16332A]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#C6A468] transition-transform duration-300 flex-shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-[#232420]/80 leading-relaxed font-light border-t border-gray-100 pt-3 animate-in fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form Section (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-[#C6A468]" />
                <h3 className="font-fraunces text-xl font-bold text-[#16332A]">
                  Envoyez-nous un message
                </h3>
              </div>
              <p className="text-xs text-[#232420]/70 font-light mb-6">
                Nos équipes vous répondent sous 24h ouvrées.
              </p>

              <form onSubmit={handleSubmitContact} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#16332A] block mb-1.5">Sujet de votre demande *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                  >
                    <option value="Question sur une commande en cours">Question sur une commande en cours</option>
                    <option value="Disponibilité d'un produit en magasin">Disponibilité d'un produit en magasin</option>
                    <option value="Service Après-Vente ou Réclamation">Service Après-Vente ou Réclamation</option>
                    <option value="Demande service traiteur / Commande spéciale">Demande service traiteur / Commande spéciale</option>
                    <option value="Autre question">Autre question</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#16332A] block mb-1.5">Nom et Prénom *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    placeholder="Ex: Jean Dupont"
                    className="w-full p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#16332A] block mb-1.5">Adresse email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="Ex: jean.dupont@email.fr"
                    className="w-full p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#16332A] block mb-1.5">Numéro de téléphone (optionnel)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ex: 06 12 34 56 78"
                    className="w-full p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#16332A] block mb-1.5">Votre message *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="Décrivez votre demande en détail..."
                    className="w-full p-3 rounded-xl bg-[#FAF7F0] border border-[#16332A]/20 focus:outline-none focus:border-[#C6A468]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#16332A] hover:bg-[#234d40] text-white font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#C6A468]" />
                  <span>Envoyer mon message</span>
                </button>

                {isSent && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                    <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <span>Votre message a été envoyé avec succès ! Nous vous répondrons très rapidement.</span>
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
