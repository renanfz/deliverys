import { ChevronLeft, FileText, MapPin, Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { changeStatus, getDeliverieUnique, url } from '../services/api'
/* import { useEffect, useState } from "react";
 */import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "../components/spinner";
/* import { getDeliverieUnique, url } from '../services/api'
 */
export function DeliveryPage() {
     const location = useLocation()
     const navigate = useNavigate()

     const [loading, setLoading] = useState(true)
     const [updatingStatus, setUpdatingStatus] = useState(false)
     const [error, setError] = useState<string | null>(null)

     const idReq = location.state?.id

     const [dataDelivery, setDataDelivery] =
          useState<Record<string, any> | null>(null)

     useEffect(() => {
          const fetchData = async () => {
               try {
                    setLoading(true)
                    setError(null)

                    const delivery = await getDeliverieUnique(url, idReq)

                    setDataDelivery(delivery)

               } catch (error) {
                    setError('Não foi possível carregar a entrega.')
               } finally {
                    setLoading(false)
               }
          }

          fetchData()
     }, [idReq])


     async function handleChangeStatus() {
          if (!dataDelivery?.id || updatingStatus) return

          try {
               setUpdatingStatus(true)
               setError(null)

               await changeStatus(url, dataDelivery.id)

               setDataDelivery(prev => ({
                    ...prev!,
                    status: 'completed'
               }))

          } catch (error) {
               setError('Não foi possível atualizar a entrega.')
          } finally {
               setUpdatingStatus(false)
          }
     }


     function openMap(latitude: number, longitude: number) {
          const urlMap = `https://www.google.com/maps?q=${latitude},${longitude}`
          window.open(urlMap, '_blank')
     }


     if (loading) {
          return (
               <div className="h-screen flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-700 rounded-full animate-spin" />
               </div>
          )
     }

     if (error) {
          return (
               <div className="h-screen flex items-center justify-center p-5">
                    <p>{error}</p>
               </div>
          )
     }

     if (!dataDelivery) {
          return (
               <div className="h-screen flex items-center justify-center">
                    <p>Entrega não encontrada.</p>
               </div>
          )
     }


     return (
          <div className="h-screen w-full flex flex-col items-center p-4">
               <div className="w-full max-w-[400px]">

                    <header className="text-left mb-6">

                         <a
                              onClick={() => navigate(`/route?id=${dataDelivery.routeId}`)}
                              className="my-auto w-20 h-10 flex text gap-1 cursor-pointer"
                         >
                              <ChevronLeft />
                              Rota
                         </a>

                         <span className="text-sm text-slate-500 p-3 py-2 rounded-sm bg-gray-100 font-medium w-fit mr-1.5">
                              {dataDelivery.id}
                         </span>

                         <span
                              className={`text-sm text-slate-500 p-3 py-1 rounded-sm w-fit
                              ${dataDelivery.status === 'pending'
                                   ? 'bg-gray-100'
                                   : 'bg-(--color-primary-light) text-(--color-primary)'
                              }`}
                         >
                              {dataDelivery.status}
                         </span>

                         <h2 className="text-[20px] font-bold text-slate-800 py-5">
                              {dataDelivery.customer}
                         </h2>

                    </header>


                    <div className="bg-gray-100 p-4 flex items-center gap-3 rounded-md shadow-sm mb-3">

                         <MapPin className="text-black w-6 h-6" />

                         <div className="flex flex-col">

                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                   Endereço
                              </p>

                              <p className="text-sm font-medium text-gray-800">
                                   {dataDelivery.address}
                              </p>

                         </div>

                    </div>


                    <div className="bg-gray-100 p-4 flex items-center gap-3 rounded-md shadow-sm">

                         <FileText color="#000000" />

                         <div className="flex flex-col">

                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                   NF-E
                              </p>

                              <p className="text-sm font-medium text-gray-800">
                                   {dataDelivery.nfe}
                              </p>

                         </div>

                    </div>


                    <section className="flex items-center gap-3 w-full max-w-md mt-3 justify-between">

                         <button
                              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-sm justify-center w-full"
                         >
                              <FileText className="text-black w-5 h-5" />

                              <span className="text-sm font-medium text-gray-800">
                                   Visualizar NFe
                              </span>
                         </button>


                         <button
                              onClick={() =>
                                   openMap(
                                        dataDelivery.latitude,
                                        dataDelivery.longitude
                                   )
                              }
                              type="button"
                              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-sm justify-center w-full"
                         >
                              <Navigation className="text-black w-5 h-5" />

                              <span className="text-sm font-medium text-gray-800">
                                   Google Maps
                              </span>
                         </button>

                    </section>


                    <button
                         onClick={handleChangeStatus}
                         disabled={
                              updatingStatus ||
                              dataDelivery.status !== 'pending'
                         }
                         className="fixed bottom-0 right-0 left-0 mx-auto my-5 px-6 z-50 w-fit flex justify-center items-center gap-2 bg-(--color-primary) shadow-md p-4 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >

                         {updatingStatus ? (
                              <>
                                   <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                   Atualizando...
                              </>
                         ) : dataDelivery.status === 'pending' ? (
                              'Marcar como entregue'
                         ) : (
                              'Entrega concluída'
                         )}

                    </button>

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