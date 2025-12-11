import React from "react";
import { ArrowRight, MessageSquare, Activity } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section
      id="anasayfa"
      // DEĞİŞİKLİK BURADA:
      // 'pt-20': Mobilde navbarın (h-16) altında kalmaması için içeriği aşağı iter.
      // 'md:pt-0': Masaüstünde ekran geniş olduğu için ortalama sorunu olmaz, paddingi sıfırlarız.
      className="relative w-full h-screen flex items-center justify-center bg-white pt-20 md:pt-0"
    >
      {/* --- ARKA PLAN EFEKTLERİ --- */}
      <div className="absolute inset-0 z-0">
        {/* Temsili görsel: Trafik akışı / Hız / Şeritler */}
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          alt="Trafik Akışı Arka Plan"
          className="w-full h-full object-cover opacity-20"
        />
        {/* Görsel üzerine beyaz overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent"></div>
      </div>

      {/* --- DİNAMİK ŞERİT ÇİZGİLERİ --- */}
      <div className="absolute inset-0 z-0 flex justify-center items-center opacity-10 pointer-events-none">
        <div className="w-[120%] h-px bg-blue-500 transform -rotate-12 translate-y-32"></div>
        <div className="w-[120%] h-px bg-blue-500 transform -rotate-12 translate-y-48"></div>
        <div className="w-[120%] h-px bg-blue-500 transform -rotate-12 translate-y-64"></div>
      </div>

      {/* --- İÇERİK ALANI --- */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Üst Rozet */}
        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-8 shadow-sm animate-fade-in-up">
          <Activity size={16} className="text-blue-600" />
          <span className="text-blue-800 text-sm font-semibold tracking-wide uppercase">
            Yapay Zeka Destekli Trafik Yönetimi
          </span>
        </div>

        {/* Ana Başlık */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
          Akıllı Şerit <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
            Takip Sistemi
          </span>
        </h1>

        {/* Alt Açıklama */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          <span className="font-semibold text-gray-800">Naim Süleymanoğlu Bulvarı</span>’nda 
          trafik yoğunluğunu gerçek zamanlı optimize eden, akışı hızlandıran ve güvenliği artıran 
          yapay zekâ tabanlı şerit yönetim çözümü.
        </p>

        {/* Buton Grubu */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#problem&cozum"
            className="
              group flex items-center justify-center space-x-2 
              bg-blue-600 text-white px-8 py-4 rounded-xl 
              font-semibold text-lg shadow-lg shadow-blue-600/20 
              hover:bg-blue-700 hover:scale-105 hover:shadow-blue-600/30 
              transition-all duration-300 w-full sm:w-auto
            "
          >
            <span>Projeyi İncele</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#geri-bildirimler"
            className="
              flex items-center justify-center space-x-2 
              bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl 
              font-medium text-lg shadow-sm 
              hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 
              transition-all duration-300 w-full sm:w-auto
            "
          >
            <MessageSquare size={20} />
            <span>Geri Bildirim Gönder</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;