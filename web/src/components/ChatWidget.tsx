import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2, AlertCircle } from 'lucide-react';

// Mesaj tipi
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  isError?: boolean;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Merhaba! Size nasıl yardımcı olabilirim?", sender: 'bot' }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const fetchGeminiResponse = async (userMessage: string) => {
    setIsLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("API Anahtarı bulunamadı! .env dosyasını kontrol edin.");
      }

      const modelName = "gemini-2.5-flash"; 
      
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: userMessage }]
          }]
        })
      });

      const data = await response.json();

      // Hata Kontrolü
      if (!response.ok) {
        console.error("API Hatası Detayı:", data);
        throw new Error(data.error?.message || `Hata Kodu: ${response.status}`);
      }

      if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
        throw new Error("Cevap alınamadı (Güvenlik filtresi veya boş yanıt).");
      }

      const botReply = data.candidates[0].content.parts[0].text;

      setMessages(prev => [
        ...prev,
        { id: Date.now(), text: botReply, sender: 'bot' }
      ]);

    } catch (error: any) {
      console.error("Chat Hatası:", error);
      
      let errorMessage = "Bağlantı sorunu.";
      // Kullanıcıya hatayı açıkça söyleyelim ki çözelim
      if (error.message.includes("not found")) {
        errorMessage = "Model bulunamadı. Lütfen F12 > Console ekranındaki geçerli model listesini kontrol edin.";
      } else {
        errorMessage = error.message;
      }

      setMessages(prev => [
        ...prev,
        { 
          id: Date.now(), 
          text: `⚠️ ${errorMessage}`, 
          sender: 'bot',
          isError: true 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');

    setMessages(prev => [
      ...prev,
      { id: Date.now(), text: userText, sender: 'user' }
    ]);

    await fetchGeminiResponse(userText);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end font-sans">
      
      {/* --- CHAT PENCERESİ --- */}
      <div
        className={`
          transition-all duration-300 ease-in-out transform origin-bottom-right
          ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}
          bg-white w-full sm:w-96 h-[500px] max-h-[80vh] rounded-2xl shadow-2xl border border-gray-200 flex flex-col mb-4 overflow-hidden
        `}
      >
        {/* Header */}
        <div className="bg-blue-600 p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2 text-white">
            <Bot size={24} />
            <div className="flex flex-col">
                <h3 className="font-semibold text-sm">AI Asistan</h3>
                <span className="text-xs text-blue-100 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Online
                </span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mesaj Alanı */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[80%] p-3 rounded-2xl text-sm shadow-sm
                  ${msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : msg.isError 
                      ? 'bg-red-50 text-red-600 border border-red-200 rounded-tl-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}
                `}
              >
                {msg.isError && (
                    <div className="flex items-center gap-1 mb-1 font-bold text-xs uppercase tracking-wider">
                        <AlertCircle size={12} /> Hata
                    </div>
                )}
                {msg.text}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-xs text-gray-500">Düşünüyor...</span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Alanı */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Mesajınızı yazın..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm disabled:bg-gray-50 disabled:text-gray-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* --- AÇMA/KAPAMA BUTONU (FAB) --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105
          ${isOpen ? 'bg-red-500 hover:bg-red-600 rotate-90' : 'bg-blue-600 hover:bg-blue-700'}
          text-white flex items-center justify-center
        `}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

    </div>
  );
};

export default ChatWidget;