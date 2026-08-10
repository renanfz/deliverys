import { ChevronLeft, CircleCheckBig, FileText, MapPin, Navigation } from "lucide-react";
import { use, useState } from "react";
import { changeStatus, url } from '../services/api'
/* import { useEffect, useState } from "react";
 */import { data, useLocation, useNavigate } from "react-router-dom";
/* import { getDeliverieUnique, url } from '../services/api'
 */
export function DeliveryPage() {

     const location = useLocation()
     const navigate = useNavigate()
     const dataParams = location.state

     /*      const [loading, setLoading] = useState(true)
          const [error, setError] = useState<string | null>(null)
     
          const idReq = location.state?.routeId
          const idDelivery = location.state?.id
      */
     /*      const [id, setId] = useState(0)
          const [dataDelivery, setDataDelivery] = useState<Record<string, any> | null>({})
      */
     function openMap(latitude: number, longitude: number) {
          const urlMap = `https://www.google.com/maps?q=${latitude},${longitude}`;
          window.open(urlMap, '_blank');
     }

     /*      useEffect(() => {
               if (!dataParams.id) return
     
               const fetchData = async () => {
                    try {
                         const delivery = await getDeliverieUnique(url, dataParams.id)
                         setDataDelivery(delivery) // dados daquela entrega
                    } catch (error) {
                         throw new Error('Erro interno')
                    }
               }
               fetchData()
          }, [dataParams]) */

     return (
          // O pai apenas centraliza tudo na tela
          <div className='h-screen w-full flex flex-col items-center p-4'>
               <div className='w-full max-w-[400px]'>

                    <header className="text-left mb-6 ">
                         <a onClick={() => navigate(`/route?id=${dataParams.routeId}`)}
                              className='mx-auto my-auto w-20 h-10'>
                              <ChevronLeft />Rota
                         </a>
                         <p className="text-sm text-slate-500">{dataParams.id} {dataParams.status}</p>
                         <h2 className="font-mono text-lg font-bold text-slate-800">{dataParams.customer}
                         </h2>
                    </header>

                    <div className="">
                         <MapPin color="#000000" />
                         <p>ENDEREÇO</p>
                         <p>{dataParams.address}</p>
                    </div>

                    <div className="">
                         <FileText color="#000000" />
                         <p>NF-E</p>
                         <p>{dataParams.nfe}</p>
                    </div>


                    <section className="flex flex-col items-center">
                         <button>
                              <FileText color="#000000" />Visualizar NFe</button>
                         <button onClick={() => openMap(dataParams.latitude, dataParams.longitude)} type="button">
                              <Navigation color="#000000" />
                              Ver no Google Maps
                         </button>
                         <button
                              onClick={() => changeStatus(url, dataParams.id)}
                              className="flex justify-between mx-1.5">Marcar como entregue</button>
                    </section>
               </div>
          </div>
     )
}

// Buscar: nome, endereco, nfe, valor

/* ┌──────────────────────────────────┐
│ Entrega #03 — Restaurante Central   │
│                                     │
│ 📍 Rua João XX, 120                 │
│                                     │
│ NFe #003452                         │
│ R$ 1.842,50                         │
│                                    │
│ [ Ver itens da NFe ]               │
│ [ Abrir no mapa ]                   │
│ [ ✓ Marcar como entregue ]         │
└──────────────────────────────────┘ */