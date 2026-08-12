import { useEffect, useState } from 'react'
import { DeliveryItem } from '../components/deliveryItem'
import { getDeliveriesById, getRouteUnique, url } from '../services/api'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import type { Delivery } from '../types/index'

type RouteWithDeliveries = {
     id: string
     city: string
     total: number
     completeds: number
     deliveries: Delivery[]
}

export const RoutePage = () => {
     const [selectedRoute, setSelectedRoute] = useState<RouteWithDeliveries | null>(null)
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState<string | null>(null)
     const [progress, setProgress] = useState<string | null>(null)

     const [searchParams] = useSearchParams()
     const routeId = searchParams.get('id')
     const progressParam = searchParams.get('progress')
     const navigate = useNavigate()

     useEffect(() => {
          setProgress(progressParam)
     }, [progressParam])

     useEffect(() => {
          if (!routeId) {
               setError('Rota inválida')
               setLoading(false)
               return
          }

          const fetchData = async () => {
               try {
                    setLoading(true)
                    const [route, deliveries] = await Promise.all([
                         getRouteUnique(url, routeId),
                         getDeliveriesById(url, routeId),
                    ])

                    if (!route) {
                         setError('Rota não encontrada')
                         return
                    }

                    const validDeliveries = Array.isArray(deliveries) ? deliveries : []
                    const completeds = validDeliveries.filter((item) => item.status !== 'pending').length

                    setSelectedRoute({
                         ...route,
                         deliveries: validDeliveries,
                         total: validDeliveries.length,
                         completeds,
                    })
               } catch (err) {
                    setError('Erro ao carregar dados')
               } finally {
                    setLoading(false)
               }
          }

          fetchData()
     }, [routeId])

     if (loading) return <div>Carregando rota...</div>
     if (error) return <div>{error}</div>
     if (!selectedRoute) return <div>Rota não encontrada</div>

     return (
          <div className='h-screen w-full flex flex-col items-center p-5'>
               <div className='w-full max-w-100'>
                    <header className='text-left mb-6'>
                         <button
                              type='button'
                              onClick={() => navigate('/')}
                              className=' my-auto w-20 h-10 flex text'>
                              <ChevronLeft /> Rotas
                         </button>
                         <h2 className='text-lg font-bold text-slate-800'>{selectedRoute.city}</h2>
                         <p className='text-sm text-slate-500'>
                              {selectedRoute.completeds} / {selectedRoute.total} entregas concluídas
                         </p>
                         <div>
                              <div className="flex justify-between mt-5">
                                   <p>Progresso da rota</p>
                                   <p className='text-(--color-primary) font-medium'>{progress}%</p>
                              </div>
                              <progress
                                   value={progress ?? 0}
                                   max="100"
                                   className="w-full h-1.5 rounded-full overflow-hidden appearance-none
                             bg-gray-200
                             [&::-webkit-progress-bar]:bg-gray-200
                             [&::-webkit-progress-value]:bg-(--color-primary)
                             [&::-moz-progress-bar]:bg-[(--color-primary)]">
                              </progress>
                         </div>
                    </header>
                    {/* Listagem das entregas */}
                    <div className='w-full'>
                         {selectedRoute.deliveries.map((item: Delivery) => (
                              <DeliveryItem
                                   key={item.id}
                                   routeId={routeId ?? ''}
                                   id={item.id}
                                   customer={item.customer}
                                   order={item.order}
                                   address={item.address}
                                   latitude={item.latitude}
                                   longitude={item.longitude}
                                   status={item.status}
                                   nfe={item.nfe}
                              />
                         ))}
                    </div>
               </div>
          </div>
     )
}

