
import { useEffect, useState } from 'react'
import { RouteCard } from '../components/routeCard'
import { calculateDeliverys, url } from '../services/api'
import { Package } from 'lucide-react'
import '../index.css'

export const RoutesPage = () => {
     const [routesData, setRoutesData] = useState<any[]>([])
     const [routeActive, setRouteActive] = useState(0)

     useEffect(() => {
          const total = routesData.reduce((acc, route) => acc + route.completeds, 0);
          setRouteActive(total);
     }, [routesData]); // Executa sempre que os dados das rotas mudarem


     useEffect(() => {
          const fetchData = async () => {
               const data = await calculateDeliverys(url)
               setRoutesData(data)
          }
          fetchData()
     }, [])

     const dataFormatada = new Date().toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long'
     });
     const dateFormated = dataFormatada.replace(/(^\w|\s\w)/g, m => m.toUpperCase())

     return (
          <div className="h-screen w-full flex flex-col items-center p-5">
               <div className="w-full max-w-100">
                    <header className="mb-10 ">
                         <p className='font-medium text-[var(--color-text-secondary)]'>{dateFormated}</p>
                         <h1 className="font-bold text-[1.7rem] leading-8.5 py-2">Controle de Entregas</h1>
                         <p className='text-[var(--color-text-secondary)]'>Rotas do dia</p>
                    </header>
                    <hr className='mb-8 border-t border-[var(--color-border)]' />
                    <div className='bg-gray-100 flex w-full p-4 rounded-[var(--radius-md)] justify-between items-center'>
                         <Package color="#737373" />Total de entregas    15/20{ }
                    </div>
                    <p className='py-5 text-[var(--color-text-secondary)] font-medium'>{ routeActive} 3 ROTAS ATIVAS</p>
                    {routesData.map((route) => (
                         <RouteCard
                              key={route.id}
                              id={route.id}
                              city={route.city}
                              deliveryes={route.total}
                              completeds={route.completeds}
                              progress={route.progress} routeId={''} />
                    ))}
               </div>
          </div>

     )
}