import React, { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll algılama
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menü linkleri
  const navLinks = [
    { id: "anasayfa", label: "Ana Sayfa" },
    { id: "problem&cozum", label: "Problem & Çözüm" },
    { id: "nasil-calisir", label: "Nasıl Çalışır ?" },
    { id: "yenilikci-yonleri", label: "Yenilikçi Yönler" },
    { id: "geri-bildirimler", label: "Geri Bildirim" },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b
        ${
          scrolled || menuOpen
            ? "bg-white shadow-md border-gray-200"
            : "bg-white/80 backdrop-blur-md border-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* --- LOGO ALANI --- */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <img
              src="./icon.png"
              alt="Logo"
              className="h-10 w-10 rounded object-cover shadow-sm"
            />
            <span className="text-gray-900 font-bold text-xl tracking-wide">
              Akıllı Şerit Sistemi
            </span>
          </div>

          {/* --- MASAÜSTÜ MENÜ --- */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`
                  text-md font-medium transition-colors duration-200
                  ${
                    activeSection === item.id
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* --- SAĞ AKSİYON BUTONU --- */}
          <div className="hidden md:flex items-center">
            <a
              href="#iletisim"
              className="
                flex items-center space-x-2 px-4 py-2 rounded-md
                bg-blue-600 hover:bg-blue-700
                text-white text-md font-medium
                shadow-sm hover:shadow-md
                transition-all duration-200
              "
            >
              <MessageCircle size={16} />
              <span>İletişim</span>
            </a>
          </div>

          {/* --- MOBİL MENÜ BUTONU --- */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2 focus:outline-none"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBİL MENÜ İÇERİĞİ --- */}
      <div
        className={`
          md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out shadow-lg
          ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className={`
                block px-3 py-3 rounded-md text-base font-medium
                ${
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#iletisim"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center mt-4 px-3 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm"
          >
            İletişime Geç
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;