
import { useEffect, useState } from 'react'
import { RouteCard } from '../components/routeCard'
import { calculateDeliverys, url } from '../services/api'
import { Package } from 'lucide-react'
import '../index.css'
import Footer from '../components/footer'

export const RoutesPage = () => {
     const [routesData, setRoutesData] = useState<any[]>([])
     const [routeActive, setRouteActive] = useState(0)
     const [totalDeliverys, setTotalDeliverys] = useState(0)
     const [completedDeliverys, setCompletedDeliverys] = useState(0)

     const [loading, setLoading] = useState(true)
     const [slowLoading, setSlowLoading] = useState(false)

     useEffect(() => {
          const activeRoutesCount = routesData.filter(item => item.progress > 0 && item.progress < 100).length
          setRouteActive(activeRoutesCount)

          const totalDeliveries = routesData.reduce((sum, item) => sum + item.total, 0)
          setTotalDeliverys(totalDeliveries)

          const completedDeliveries = routesData.reduce((sum, item) => sum + item.completeds, 0)
          setCompletedDeliverys(completedDeliveries)

     }, [routesData]);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const data = await calculateDeliverys(url)
                    setRoutesData(data)
               } finally {
                    setLoading(false)
               }

          }
          fetchData()
     }, [])

     useEffect(() => {
          const timer = setTimeout(() => {
               /* loading && setSlowLoading(true) */
               if (loading) { setSlowLoading(true) }
          }, 5000)
          return () => clearTimeout(timer)
     }, [loading])

     /*      const calculateRoutesActive = () => {
     
          } */

/*      const dataFormatada = new Date().toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long'
     });
     const dateFormated = dataFormatada.replace(/(^\w|\s\w)/g, m => m.toUpperCase())
 */
     return (
          <>
               <div className="min-h-screen w-full flex flex-col items-center p-3">
                    <div className="w-full max-w-sm flex flex-col grow">
                         <header className="mb-3 flex flex-col items-start">
                              {/* <p className='font-medium text-(--color-text-secondary)'>{dateFormated}</p> */}
                              <div className="flex items-center gap-1.5">
                                   <img
                                        src="./public/logo-rotab.png"
                                        alt=""
                                        width={55}
                                        className="rounded-full"
                                   />
                                   <div>
                                        <h1 className="font-bold text-[1.5rem] leading-6.5 font-mono">
                                             Rota B
                                        </h1>
                                        <span className="text-(--color-text-secondary)">
                                             Controle de Entregas
                                        </span>
                                   </div>
                              </div>
                              {/* <p className='text-(--color-text-secondary)'>Rotas do dia</p> */}
                         </header>

                         <hr className="mb-8 border-t border-(--color-border)" />

                         {/* Conteúdo principal */}
                         <main className="grow">
                              <div
                                   className={`bg-gray-100 flex w-full max-w-sm p-4 rounded-md justify-between items-center shadow-sm ${loading && "hidden"}
                                        `}
                              >
                                   <Package color="#737373" />Total de entregas {completedDeliverys} /{" "}
                                   {totalDeliverys}
                              </div>

                              <p
                                   className={`py-5 text-(--color-text-secondary) font-bold ${loading && "hidden"
                                        }`}
                              >
                                   {routeActive} ROTAS ATIVAS
                              </p>

                              {loading && (
                                   <div className="my-5 flex items-center gap-1.5">
                                        <span className="text-3xl">◌</span>
                                        {slowLoading
                                             ? "A primeira carga pode levar alguns segundos"
                                             : "Carregando rotas..."}
                                   </div>
                              )}

                              {routesData.map((route) => (
                                   <RouteCard
                                        key={route.id}
                                        id={route.id}
                                        city={route.city}
                                        deliveryes={route.total}
                                        completeds={route.completeds}
                                        progress={route.progress}
                                        routeId={""}
                                   />
                              ))}
                         </main>
                         <Footer />
                    </div>
               </div>
          </>
     );


}