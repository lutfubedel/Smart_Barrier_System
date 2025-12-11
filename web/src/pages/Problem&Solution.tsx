import React from "react";
import { 
  AlertTriangle, 
  Clock, 
  ShieldAlert, 
  Camera, 
  Cpu, 
  Smartphone, 
  ArrowRight 
} from "lucide-react";

const ProblemSolution: React.FC = () => {
  return (
    <section id="problem&cozum" className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        
        {/* --- BAŞLIK --- */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Neden İhtiyaç Duyduk?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Geleneksel trafik yönetiminin tıkandığı noktada, teknoloji devreye giriyor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center relative">
          
          {/* --- ORTA OK (Sadece Masaüstü) --- */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg border border-gray-100 text-blue-500">
             <ArrowRight size={24} />
          </div>

          {/* --- SOL: SORUNLAR (PROBLEM) --- */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-red-100 relative group hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-400 rounded-t-2xl"></div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-red-100 p-2 rounded-lg mr-3">
                <AlertTriangle className="text-red-600" size={24} />
              </span>
              Mevcut Sorunlar
            </h3>

            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="mt-1 min-w-[20px]">
                  <Clock size={20} className="text-red-400" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Trafik Düzensizliği</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Özellikle iş giriş-çıkış saatlerinde Naim Süleymanoğlu Bulvarı'nda akış durma noktasına geliyor.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mt-1 min-w-[20px]">
                  <ShieldAlert size={20} className="text-red-400" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Güvenlik ve Verimsizlik</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Şeritlerin verimsiz kullanımı kazalara davetiye çıkarıyor ve bekleme sürelerini artırıyor.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mt-1 min-w-[20px]">
                  <AlertTriangle size={20} className="text-red-400" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Tahmin Edilemeyen Yoğunluk</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Anlık trafik dalgalanmaları sürücüler için öngörülemez bir ortam oluşturuyor ve karar almayı zorlaştırıyor.
                  </p>
                </div>
              </li>
            </ul>

          </div>

          {/* --- SAĞ: ÇÖZÜMLER (SOLUTION) --- */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-blue-50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-t-2xl"></div>

            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-blue-100 p-2 rounded-lg mr-3">
                <Cpu className="text-blue-600" size={24} />
              </span>
              Akıllı Çözümümüz
            </h3>

            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="mt-1 min-w-[20px]">
                   <Camera size={20} className="text-blue-500" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Radar & Görüntü İşleme</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Kameralardan alınan veriler YOLO modelleri ile işlenerek anlık araç yoğunluğu %99 doğrulukla ölçülür.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mt-1 min-w-[20px]">
                   <ArrowRight size={20} className="text-blue-500" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Otomatik Şerit Dağılımı</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Sistem yoğunluğa göre şeritleri dinamik olarak açar veya kapatır, trafiği rahatlatır.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mt-1 min-w-[20px]">
                   <Smartphone size={20} className="text-blue-500" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sürücü Bildirim Sistemi</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Mobil uygulama entegrasyonu ile sürücüler rota ve şerit durumu hakkında önceden uyarılır.
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;