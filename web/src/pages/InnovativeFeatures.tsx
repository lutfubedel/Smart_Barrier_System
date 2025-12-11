import React from "react";
import { Sparkles, ScanEye, BrainCircuit, Smartphone, Leaf } from "lucide-react";

const InnovativeFeatures: React.FC = () => {
  const features = [
    {
      id: 1,
      icon: Sparkles,
      title: "Türkiye'de Bir İlk",
      desc: "Ülkemizde ilk kez uygulanacak olan 'Dinamik Şerit Yönetim Modeli' ile trafik mühendisliğinde yeni bir dönem başlatıyoruz.",
    },
    {
      id: 2,
      icon: ScanEye,
      title: "Hibrit Sensör Teknolojisi",
      desc: "Tek bir kaynağa bağlı kalmadan, Kamera ve Radar verilerinin füzyonu (birleşimi) ile hatasız, anlık trafik analizi.",
    },
    {
      id: 3,
      icon: BrainCircuit,
      title: "Yapay Zeka Optimizasyonu",
      desc: "Trafik yoğunluğunu tahmin eden ve şeritleri gerçek zamanlı (real-time) yöneten gelişmiş yapay zeka algoritmaları.",
    },
    {
      id: 4,
      icon: Smartphone,
      title: "BursaKart Entegrasyonu",
      desc: "Sürücüler, şerit durumlarını ve trafik uyarılarını doğrudan BursaKart mobil uygulaması üzerinden takip edebilir.",
    },
    {
      id: 5,
      icon: Leaf,
      title: "Eko-Dostu ve Tasarruflu",
      desc: "Dur-kalk trafiğini azaltarak ciddi oranda yakıt tasarrufu sağlar ve karbon emisyonunu minimuma indirir.",
    },
  ];

  return (
    <section id="yenilikci-yonleri" className="py-12 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 min-h-screen">
        
        {/* --- BAŞLIK ALANI --- */}
        <div className="text-center mb-6 lg:mb-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            Bizi Farklı Kılan Nedir?
          </h2>
          <p className="text-sm lg:text-base text-gray-600 max-w-2xl mx-auto">
            Projenin teknolojik gücünü ve şehre katacağı yenilikçi değerleri keşfedin.
          </p>
        </div>

        {/* --- KARTLAR GRID --- */}
        {/* justify-center: Son satırdaki kartların ortalanmasını sağlar (özellikle 5 kart olduğu için) */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-4">
          
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="
                w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]
                bg-white rounded-xl p-4 lg:p-6
                border border-gray-100 shadow-sm
                hover:shadow-xl hover:-translate-y-1 hover:border-blue-100
                transition-all duration-300 group
                flex flex-col items-start
              "
            >
              {/* İkon */}
              <div className="
                w-10 h-10 lg:w-12 lg:h-12 
                bg-blue-50 rounded-lg 
                flex items-center justify-center mb-3
                group-hover:bg-blue-600 transition-colors duration-300
              ">
                <feature.icon className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Başlık */}
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>

              {/* Açıklama */}
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>

        {/* --- ALT MESAJ --- */}
        <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                <Leaf size={14} />
                Sürdürülebilir Şehirler İçin Akıllı Çözüm
            </span>
        </div>

      </div>
    </section>
  );
};

export default InnovativeFeatures;