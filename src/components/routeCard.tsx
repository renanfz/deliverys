import type { CardDelivery } from '../types/index'
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../index.css'

export const RouteCard = ({ id, city, deliveryes, completeds, progress }: CardDelivery) => {

     /* const [key, setKey] = useState(0) */
     const navigate = useNavigate()


     return (
          <article key={id}
               onClick={() => navigate(`/route?id=${id}&progress=${progress}`)}
               className="max-w-sm p-5 mb-3 bg-[#F6F6F7] rounded-md card-hover shadow-sm hover:cursor-pointer">
               <h2 className="font-bold text-slate-800 mb-4 text-[18px]">{city}</h2>
               <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex-1">
                         <p className="text-lg font-semibold text-(--color-text-secondary)">
                              <span className='font-semibold text-(--color-text-primary)'>{completeds}</span>/{deliveryes}
                         </p>
                         <p className='mt-1 text-(--color-text-secondary)'>Concluídas</p>
                    </div>
                    <div className="flex-1 text-right">
                         <p className="text-lg font-semibold text-(--color-text-primary)">{progress}%</p>
                         <p className="mt-1 text-(--color-text-secondary)">Progresso</p>
                    </div>
               </div>

               <progress
                    value={progress}
                    max="100"
                    className="w-full h-1.5 rounded-full overflow-hidden appearance-none
                             bg-gray-200
                             [&::-webkit-progress-bar]:bg-gray-200
                             [&::-webkit-progress-value]:bg-(--color-primary)
                             [&::-moz-progress-bar]:bg-[(--color-primary)]">
               </progress>


               <div className="flex justify-between items-center mt-3">
                    <a
                         className="font-semibold text-(--color-primary) btn-press"
                    >Abrir rota</a>
                    <ChevronRight color="#518170" />
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