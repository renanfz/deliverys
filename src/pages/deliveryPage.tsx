import { ChevronLeft, CircleCheckBig, FileText, MapPin, Navigation } from "lucide-react";
import { use, useEffect, useState } from "react";
import { changeStatus, getDeliverieUnique, url } from '../services/api'
/* import { useEffect, useState } from "react";
 */import { data, useLocation, useNavigate } from "react-router-dom";
/* import { getDeliverieUnique, url } from '../services/api'
 */
export function DeliveryPage() {

     const location = useLocation()
     const navigate = useNavigate()

     const [loading, setLoading] = useState(true)
     const [error, setError] = useState<string | null>(null)

     const idReq = location.state?.id
     const [status, setStatus] = useState(false)
     const [dataDelivery, setDataDelivery] = useState<Record<string, any> | null>({})

     
     useEffect(() => {

          const fetchData = async () => {
               try {
                    setLoading(true)
                    const delivery = await getDeliverieUnique(url, idReq)
                    setDataDelivery(delivery) // dados daquela entrega
                    setStatus(delivery.status)
               } catch (error) {
                    setError('Nao deu certo :(')
               } finally {
                    setLoading(false)
               }
          }
          fetchData()
     }, [idReq, status])
     
     if(loading) return <div>Carregando...</div>
     if(error) return <div>{error}</div>
     
     function openMap(latitude: number, longitude: number) {
          const urlMap = `https://www.google.com/maps?q=${latitude},${longitude}`;
          window.open(urlMap, '_blank');
     }

     return (
          // O pai apenas centraliza tudo na tela
          <div className='h-screen w-full flex flex-col items-center p-4'>
               <div className='w-full max-w-[400px]'>
                    <p>{idReq}</p>
                    <header className="text-left mb-6 ">
                         <a onClick={() => navigate(`/route?id=${dataDelivery?.routeId}`)}
                              className='mx-auto my-auto w-20 h-10'>
                              <ChevronLeft />Rota
                         </a>
                         <p className="text-sm text-slate-500">{dataDelivery?.id} {dataDelivery?.status}</p>
                         <h2 className="font-mono text-lg font-bold text-slate-800">{dataDelivery?.customer}
                         </h2>
                    </header>

                    <div className="">
                         <MapPin color="#000000" />
                         <p>ENDEREÇO</p>
                         <p>{dataDelivery?.address}</p>
                    </div>

                    <div className="">
                         <FileText color="#000000" />
                         <p>NF-E</p>
                         <p>{dataDelivery?.nfe}</p>
                    </div>


                    <section className="flex flex-col items-center">
                         <button>
                              <FileText color="#000000" />Visualizar NFe</button>
                         <button onClick={() => openMap(dataDelivery?.latitude, dataDelivery?.longitude)} type="button">
                              <Navigation color="#000000" />
                              Ver no Google Maps
                         </button>
                         <button
                              onClick={() => {
                                   changeStatus(url, dataDelivery?.id);
                                   setStatus(true);
                                   setInterval(() => {
                                        navigate(`/route?id=${dataDelivery?.routeId}`)
                                   }, 1000);
                              }}
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