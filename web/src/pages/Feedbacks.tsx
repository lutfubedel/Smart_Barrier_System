import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Send, User, Mail, MessageSquare, CheckCircle2 } from "lucide-react";

const Feedbacks: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending"); // Yükleniyor durumuna geç

    const serviceID = import.meta.env.VITE_SERVICE_ID;
    const templateID = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    if (form.current) {
      emailjs
        .sendForm(serviceID, templateID, form.current, publicKey)
        .then(() => {
          // BAŞARILI:
          setStatus("success"); // Ekranda "Teşekkürler" bileşenini göster
          if (form.current) form.current.reset(); // Formu temizle

          // 3 saniye sonra formu tekrar eski haline getir ki yeni mesaj atılabilsin
          setTimeout(() => setStatus("idle"), 3000);
        })
        .catch((error) => {
          // HATA:
          console.error("EmailJS Error:", error);
          // Hata durumunda kullanıcı tekrar deneyebilsin diye butonu aktif et
          setStatus("idle");
          // İsteğe bağlı: alert("Bir hata oluştu.");
        });
    }
  };

  return (
    <section id="geri-bildirimler" className="py-10 2xl:py-20 bg-white relative overflow-hidden">
      
      {/* Arka plan dekoratif daireler */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none opacity-50"></div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen">
        
        {/* --- BAŞLIK ALANI --- */}
        <div className="text-center mb-8 2xl:mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 mt-4">
            Görüşlerinizi Paylaşın
          </h2>
          <p className="text-sm lg:text-base text-gray-600 max-w-lg mx-auto">
            Projenin gelişim sürecini toplumla birlikte yürütüyoruz. Fikirleriniz bizim için değerli.
          </p>
        </div>

        {/* --- FORM KARTI --- */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-8">
          
          {status === "success" ? (
            // --- BAŞARILI GÖNDERİM EKRANI (MEVCUT YAPI) ---
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Teşekkürler!</h3>
              <p className="text-gray-600">Geri bildiriminiz bize ulaştı. Değerli görüşleriniz için teşekkür ederiz.</p>
            </div>
          ) : (
            // --- FORM EKRANI ---
            <form ref={form} onSubmit={sendEmail} className="space-y-4 lg:space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* İsim Alanı */}
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs lg:text-sm font-medium text-gray-700 ml-1">
                    Adınız
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="user_name"
                      required
                      className="block w-full pl-10 pr-3 py-2.5 lg:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm lg:text-base bg-gray-50/30 hover:bg-white"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                </div>

                {/* E-posta Alanı */}
                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs lg:text-sm font-medium text-gray-700 ml-1">
                    E-posta
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="user_email"
                      required
                      className="block w-full pl-10 pr-3 py-2.5 lg:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm lg:text-base bg-gray-50/30 hover:bg-white"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Mesaj Alanı */}
              <div className="space-y-1">
                <label htmlFor="message" className="text-xs lg:text-sm font-medium text-gray-700 ml-1">
                  Görüşleriniz <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    name="user_message"
                    required
                    rows={4}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm lg:text-base bg-gray-50/30 hover:bg-white resize-none"
                    placeholder="Proje hakkındaki düşüncelerinizi, önerilerinizi veya sorularınızı buraya yazabilirsiniz..."
                  ></textarea>
                </div>
              </div>

              {/* Gönder Butonu */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="
                    w-full flex items-center justify-center space-x-2 
                    bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400
                    text-white font-semibold 
                    py-3 lg:py-3.5 rounded-lg 
                    shadow-md hover:shadow-lg active:scale-[0.98] 
                    transition-all duration-200
                  "
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Gönder</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

        {/* --- DİPNOT --- */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Kişisel verileriniz KVKK kapsamında korunmaktadır ve sadece proje geri bildirimi için kullanılacaktır.
        </p>

      </div>
    </section>
  );
};

export default Feedbacks;