type DeliveryStatus = "pending" | "delivered"

export type CardDelivery = {
  id: number | string
  city?: string
  deliveryes?: number
  completeds?: number
  routeId: number | string
  progress?: number
}

type NfeItem = {
  name: string
  quantity: number
}

type Nfe = {
  number: string
  value: number
  items: NfeItem[]
}

export type Delivery = {
  id: string
  routeId?: string
  order: number
  customer: string
  address: string
  latitude: string
  longitude: string
  status: DeliveryStatus
  nfe: Nfe
  progress?: string | null
}

/* type Route = {
  id: string
  city: string
  date: string
}

// Derivado no frontend, nunca vem da API:
type RouteProgress = {
  total: number
  completed: number
  currentDeliveryId: string | null   // primeira "pending" por order
}

type headerRoute = {
  id: number
  city: string
  completeds: number
  pendings: number
} */