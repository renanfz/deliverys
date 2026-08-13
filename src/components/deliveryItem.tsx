import type { Delivery } from '../types/index'
import { Check, Circle, CircleCheck } from "lucide-react"
import { useNavigate } from "react-router-dom"


export const DeliveryItem = ({ id, customer, order, routeId, address, nfe, latitude, longitude, status }: Delivery) => {
     const navigate = useNavigate()

     return (
          <article
               onClick={() => navigate('/delivery', { state: { id, customer, order, routeId, address, nfe, latitude, longitude, status } })}

               className="flex items-center rounded-lg bg-[#F6F6F7] p-3 mb-2 w-full ">
               <span
                    className={`flex text-sm font-mono text-slate-600 mr-4  h-8 w-8 items-center justify-center rounded-sm ${status === 'pending' ? 'bg-gray-200' : 'bg-(--color-primary-light)'}`}>{order}
               </span>
               <p className="text-base font-normal text-slate-800">{customer}</p>
               <span className='flex ml-auto'>
                    {status === 'pending' ? <Circle color="#ababab" /> : <CircleCheck color="#16A34A" />}
               </span>
          </article>
     )
}

/* ┌──────────────────────────────────┐
│ Bom Repouso                       │
│ 7/12 entregas concluídas          │
│                                    │
│ ┌────────────────────────────────┐│
│ │   📍  📍                        ││
│ │        📍         📍            ││
│ │   📍                            ││
│ └────────────────────────────────┘│
│                                    │
│ ✓ 01 Mercado São João              │
│ ✓ 02 Bar do Zé                     │
│ → 03 Restaurante Central           │
│ ○ 04 Mercado Avenida               │
│ ○ 05 Padaria X                     │
└──────────────────────────────────┘ */