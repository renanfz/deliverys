

export const url = `http://localhost:3000`

export async function getRoutes(url: string) {

     try {
          const response = await fetch(`${url}/routes`)
          if (!response.ok) {
               throw new Error('Deu pt')
          }

          const data = await response.json()
          return data
     } catch (error) {
          console.log('nao deu certo!')
          return []
     }

}

export async function getRouteUnique(url: string, id: string | number) {

     try {
          const response = await fetch(`${url}/routes/${id}`)
          if (!response.ok) {
               throw new Error('Deu pt')
          }

          const data = await response.json()
          return data
     } catch (error) {
          console.log('nao deu certo!')
          return null
     }

}

export async function getDeliveriesById(url: string, routeId: string | number) {
     // Pegar entregas de determinada Rota
     try {
          const response = await fetch(`${url}/deliveries?routeId=${routeId}`,)
          if (!response.ok) {
               throw new Error('Deu pt')
          }

          const data = await response.json()
          return data
     } catch (error) {
          console.log('nao deu certo!')
          return []
     }

}

export async function getDeliverieUnique(url: string, id: string | number) {
     // Pegar uma unica entrega
     try {
          const response = await fetch(`${url}/deliveries/${id}`)
          if (!response.ok) {
               throw new Error('Deu pt')
          }

          const data = await response.json()
          return data
     } catch (error) {
          console.log('nao deu certo!')
          return null
     }

}

export async function calculateDeliverys(url: string) {
     try {
          // Busca todas as rotas
          const routes = await getRoutes(url)

          // Busca todas as entregas de cada rota em paralelo
          const deliveriesArrays = await Promise.all(
               routes.map((route: any) => getDeliveriesById(url, route.id))
          )

          // Monta os dados finais
          const data = routes.map((route: any, index: number) => {
               const deliveries = Array.isArray(deliveriesArrays[index]) ? deliveriesArrays[index] : []
               let total = deliveries.length
               let completeds = deliveries.filter((d: any) => d.status !== 'pending').length
               return {
                    id: route.id,
                    city: route.city,
                    total: total,
                    completeds: completeds,
                    progress: Math.floor((completeds / total) * 100)
               }
          })

          // Retorna os dados para quem chamou a função
          return data
     } catch (error) {
          console.error('Erro ao buscar rotas e entregas', error)
          return [] // retorna vazio em caso de erro
     }
}


export async function changeStatus(url: string, id: string | number) {

     try {
          const response = await fetch(`${url}/deliveries/${id}`, {
               method: 'PATCH',
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ status: "completed" })
          })
          if (!response.ok) {
               throw new Error('Erro ao alterar status')
          }
          const data = await response.json()
          return data
     } catch (error) {
          console.info('erro')
     }


}

console.log(await changeStatus(url, 1))



/* fetch("https://api.rh.com/funcionarios/321", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ telefone: "+55 11 99999-8888" })
}) */




















/* 
GET  /routes                     → lista de rotas @
GET  /routes/:routeId            → uma rota @
GET  /routes/:routeId/deliveries → entregas daquela rota @
GET  /deliveries/:id             → uma entrega (tela de detalhe)
PATCH /deliveries/:id            → { status: "delivered" }
 */

