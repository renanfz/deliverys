
import { useEffect, useState } from 'react'
import { RouteCard } from '../components/routeCard'
import { calculateDeliverys, url } from '../services/api'
import { Package } from 'lucide-react'

export const RoutesPage = () => {
     const [routesData, setRoutesData] = useState<any[]>([])
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

     let calculate = routesData.map(item => item)
     console.log(calculate)
     return (
          <div className="h-screen w-full flex flex-col items-center p-5">
               <div className="w-full max-w-100">
                    <header className="mb-10 ">
                         <p className='font-medium text-gray-400'>{dateFormated}</p>
                         <h1 className="font-bold text-[1.9rem] leading-8.5 py-2">Controle de <br />Entregas</h1>
                         <p className='text-gray-500'>Rotas do dia</p>
                    </header>
                    <hr className='mb-8 text-gray-200' />
                    <div className='bg-gray-100 flex w-full p-4 rounded-lg justify-between'>
                         <Package color="#737373" />Total de entregas    15/20{ }
                    </div>
                    <p className='py-5 text-gray-400 font-medium'>{ } 3 ROTAS ATIVAS</p>
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