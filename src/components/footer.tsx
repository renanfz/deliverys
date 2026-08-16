import { useState, useEffect } from "react";
import { Wrench } from "lucide-react";

export default function Footer() {
     const [showCredits, setShowCredits] = useState(false);

     useEffect(() => {
          let timer: ReturnType<typeof setTimeout>;
          if (showCredits) {
               timer = setTimeout(() => setShowCredits(false), 3000); // 3 segundos
          }
          return () => clearTimeout(timer);
     }, [showCredits]);

     return (
          <footer className="w-full bg-gray-100 text-gray-700 py-4 flex items-center mt-10 ">
               <div className="relative flex items-center">
                    <button
                         onClick={() => setShowCredits(true)}
                         className="flex items-center focus:outline-none"
                    >
                         <Wrench className="h-6 w-6 text-gray-500 hover:text-gray-700 transition-colors" />
                    </button>

                    {showCredits && (
                         <span
                              className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 w-42.5 shadow-lg transition-opacity duration-300 ${showCredits ? "opacity-100" : "opacity-0"
                                   }`}
                         >
                              Desenvolvido por Renan ©
                         </span>
                    )}
               </div>
          </footer>
     );
}
