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
               className="max-w-sm rounded-lg bg-[#F6F6F7] p-4 mb-3">
               <h2 className="text-base font-bold text-slate-800 mb-2">{city}</h2>
               <div className="">
                    <p className="mt-1 text-sm text-slate-500"> {completeds} / {deliveryes}</p>
                    <p className='mt-1 text-sm text-slate-500'>Concluídas</p>
               </div>
               <div className="">
                    {progress}%
                    <p>Progresso</p> 
               </div>
               <progress value={progress} max={100}>{}</progress>
               <a
                    className="mt-4 inline-flex w-fit items-center justify-center rounded-lg py-2.5 text-sm font-semibold text-black transition-colors hover:text-blue-600"
               >Abrir rota <ChevronRight color="#000000" /></a>
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