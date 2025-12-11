import React from "react";
import { Camera, Cpu, GitMerge, Smartphone } from "lucide-react";

const HowToWork: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: Camera,
      title: "Veri Toplama",
      desc: "Radarlar ve kameralar araç sayısını tespit eder.", // Metinleri de bir tık kısalttım sığması için
    },
    {
      id: 2,
      icon: Cpu,
      title: "Yapay Zeka Analizi",
      desc: "Veriler işlenir, yoğunluk farkı hesaplanır.",
    },
    {
      id: 3,
      icon: GitMerge,
      title: "Dinamik Yönetim",
      desc: "Şerit yönü yoğunluğa göre otomatik değişir.",
    },
    {
      id: 4,
      icon: Smartphone,
      title: "Sürücü Bilgilendirme",
      desc: "Durum sürücülere uygulama ile iletilir.",
    },
  ];

  return (
    <section id="nasil-calisir" className="py-8 lg:py-12 bg-white overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* --- BAŞLIK --- */}
        {/* Margin değerleri düşürüldü (mb-8) */}
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Sistem Nasıl İşliyor?
          </h2>
          <p className="text-sm lg:text-base text-gray-600 max-w-2xl mx-auto">
            Veriden aksiyona giden 4 adımlı akıllı süreç.
          </p>
        </div>

        {/* --- ANA İÇERİK --- */}
        {/* Gap değeri düşürüldü (gap-6) */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8">
          
          {/* --- SOL TARA: ADIMLAR (2x2 GRID) --- */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className="
                    relative flex flex-col items-center text-center 
                    p-5 lg:p-6 
                    rounded-xl border border-gray-300 
                    hover:border-blue-100 hover:shadow-lg hover:-translate-y-1
                    transition-all duration-300 bg-gray-50/50 group
                  "
                >
                  {/* İkon Kutusu: Boyutlar laptop için ideal hale getirildi (w-12 h-12) */}
                  <div className="
                    w-12 h-12 lg:w-14 lg:h-14 
                    bg-white border border-blue-100 rounded-xl 
                    flex items-center justify-center shadow-sm mb-3 
                    group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-300
                  ">
                    <step.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  {/* Adım Numarası */}
                  <span className="
                    absolute top-2 right-3 
                    text-4xl lg:text-5xl 
                    font-black text-gray-300 opacity-40 
                    group-hover:text-blue-300 transition-colors duration-300 select-none
                    
                  ">
                    {step.id}
                  </span>

                  <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-500 leading-relaxed px-1">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* --- SAĞ TARAF: SİMÜLASYON ALANI --- */}
          {/* Min-height düşürüldü, flex ile sol tarafın boyuna eşitlenmesi sağlandı */}
          <div className="w-full lg:w-1/2 min-h-[300px] lg:min-h-auto">
            <div className="w-full h-full bg-gray-900 rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-800 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              
              <div className="absolute w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -top-10 -right-10 pointer-events-none"></div>

              <div className="relative z-10 border border-dashed border-gray-700 rounded-xl p-6 w-full h-full flex flex-col items-center justify-center bg-gray-800/30">
                
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_12px_#22c55e]"></div>
                </div>
                
                <h4 className="text-lg lg:text-xl font-bold text-white mb-2">
                  Canlı Simülasyon
                </h4>
                <p className="text-gray-400 text-xs lg:text-sm max-w-xs mx-auto">
                  Yapay zeka destekli şerit yönetim simülasyonu bu alanda görüntülenecektir.
                </p>
                
                <span className="mt-6 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                  Development Mode
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowToWork;