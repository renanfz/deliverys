import { useState } from 'react';
import type { CardDelivery } from '../types/index'
import { ChevronRight, SquareArrowOutUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RouteCard = ({ id, city, deliveryes, completeds, progress }: CardDelivery) => {

     /* const [key, setKey] = useState(0) */
     const navigate = useNavigate()


     return (
          <article key={id}
               onClick={() => navigate(`/route?id=${id}&progress=${progress}`)}
               className="max-w-sm rounded-xl p-5 mb-3 bg-[#F6F6F7]">
               <h2 className="font-bold text-slate-800 mb-4 text-[1.4rem]">{city}</h2>
               <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex-1">
                         <p className="text-lg font-semibold text-slate-400">
                              <span className='font-semibold text-black text-2xl'>{completeds}</span>/{deliveryes}
                         </p>
                         <p className='mt-1 text-slate-500'>Concluídas</p>
                    </div>
                    <div className="flex-1 text-right">
                         <p className="text-lg font-semibold text-slate-800">{progress}%</p>
                         <p className="mt-1 text-slate-500">Progresso</p>
                    </div>
               </div>

               <progress
                    value="65"
                    max="100"
                    className="w-full h-1.5 rounded-full overflow-hidden appearance-none
                   bg-gray-200 
                   [&::-webkit-progress-bar]:bg-gray-200
                   [&::-webkit-progress-value]:bg-[#16A34A]
                   [&::-moz-progress-bar]:bg-[#16A34A]">
               </progress>


               <div className="flex justify-between items-center mt-3">
                    <a
                         className="font-semibold text-[#16A34A]"
                    >Abrir rota</a>
                    <ChevronRight color="#16A34A" />
               </div>
          </article>
     )

}

/* 
┌──────────────────────────────────┐
│ Controle de Entregas             │
│                                  |
│ 📍 Bom Repouso                   
│    12 entregas · 7 concluídas    │
│    [ Abrir rota ]                │
│                                  │
│ 📍 Pouso Alegre                 
│    18 entregas · 0 concluídas     
│    [ Abrir rota ]                 
└──────────────────────────────────┘
*/