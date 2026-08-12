import { useState } from 'react'
import {
  ArrowLeft,
  MapPin,
  FileText,
  CheckCircle2,
  Circle,
  ChevronRight,
  Package,
  Navigation,
  X,
  Truck,
  Clock,
} from 'lucide-react'

// ─── Data ───────────────────────────────────────────────────────────────────

type DeliveryStatus = 'delivered' | 'next' | 'pending'

interface NfeProduct {
  name: string
  qty: number
  unit: string
  value: number
}

interface Nfe {
  number: string
  series: string
  issueDate: string
  products: NfeProduct[]
  total: number
}

interface Delivery {
  id: string
  routeId: string
  number: number
  client: string
  address: string
  neighborhood: string
  city: string
  nfe: Nfe
  status: DeliveryStatus
}

interface Route {
  id: string
  city: string
  region: string
  deliveries: string[]
}

const NFE_DATA: Record<string, Nfe> = {
  'NF-001': {
    number: '000.045.291',
    series: '001',
    issueDate: '06/08/2026',
    products: [
      { name: 'Cerveja Pilsen 600ml', qty: 24, unit: 'un', value: 288.0 },
      { name: 'Refrigerante Cola 2L', qty: 12, unit: 'un', value: 96.0 },
      { name: 'Água Mineral 500ml', qty: 48, unit: 'un', value: 72.0 },
    ],
    total: 456.0,
  },
  'NF-002': {
    number: '000.045.292',
    series: '001',
    issueDate: '06/08/2026',
    products: [
      { name: 'Cerveja IPA 350ml', qty: 48, unit: 'un', value: 384.0 },
      { name: 'Energético 473ml', qty: 24, unit: 'un', value: 216.0 },
    ],
    total: 600.0,
  },
  'NF-003': {
    number: '000.045.293',
    series: '001',
    issueDate: '06/08/2026',
    products: [
      { name: 'Suco de Uva 1L', qty: 36, unit: 'un', value: 252.0 },
      { name: 'Refrigerante Limão 2L', qty: 24, unit: 'un', value: 192.0 },
      { name: 'Água com Gás 500ml', qty: 48, unit: 'un', value: 96.0 },
      { name: 'Isotônico 500ml', qty: 12, unit: 'un', value: 84.0 },
    ],
    total: 624.0,
  },
  'NF-004': {
    number: '000.045.294',
    series: '001',
    issueDate: '06/08/2026',
    products: [
      { name: 'Cerveja Pilsen 350ml', qty: 120, unit: 'un', value: 480.0 },
      { name: 'Refrigerante Guaraná 2L', qty: 12, unit: 'un', value: 108.0 },
    ],
    total: 588.0,
  },
  'NF-005': {
    number: '000.045.295',
    series: '001',
    issueDate: '06/08/2026',
    products: [
      { name: 'Vodka 1L', qty: 6, unit: 'un', value: 210.0 },
      { name: 'Refrigerante Tônica 350ml', qty: 24, unit: 'un', value: 96.0 },
    ],
    total: 306.0,
  },
  'NF-006': {
    number: '000.045.296',
    series: '001',
    issueDate: '06/08/2026',
    products: [
      { name: 'Vinho Tinto 750ml', qty: 12, unit: 'un', value: 360.0 },
      { name: 'Vinho Branco 750ml', qty: 6, unit: 'un', value: 168.0 },
    ],
    total: 528.0,
  },
  'NF-007': {
    number: '000.045.297',
    series: '001',
    issueDate: '06/08/2026',
    products: [
      { name: 'Cerveja Weiss 500ml', qty: 24, unit: 'un', value: 312.0 },
      { name: 'Suco de Laranja 1L', qty: 12, unit: 'un', value: 96.0 },
    ],
    total: 408.0,
  },
  'NF-008': {
    number: '000.045.298',
    series: '001',
    issueDate: '06/08/2026',
    products: [
      { name: 'Água Mineral 1,5L', qty: 24, unit: 'un', value: 72.0 },
      { name: 'Chá Gelado 1L', qty: 24, unit: 'un', value: 144.0 },
    ],
    total: 216.0,
  },
  'NF-009': {
    number: '000.045.299',
    series: '001',
    issueDate: '06/08/2026',
    products: [
      { name: 'Cerveja Dark 600ml', qty: 12, unit: 'un', value: 180.0 },
      { name: 'Aperol 700ml', qty: 4, unit: 'un', value: 176.0 },
    ],
    total: 356.0,
  },
  'NF-010': {
    number: '000.045.300',
    series: '001',
    issueDate: '06/08/2026',
    products: [
      { name: 'Cerveja Pilsen 600ml', qty: 48, unit: 'un', value: 576.0 },
      { name: 'Refrigerante Cola 2L', qty: 24, unit: 'un', value: 192.0 },
      { name: 'Energético 473ml', qty: 12, unit: 'un', value: 108.0 },
    ],
    total: 876.0,
  },
  'NF-011': {
    number: '000.045.301',
    series: '001',
    issueDate: '06/08/2026',
    products: [
      { name: 'Gin 750ml', qty: 6, unit: 'un', value: 294.0 },
      { name: 'Água Tônica 350ml', qty: 24, unit: 'un', value: 96.0 },
    ],
    total: 390.0,
  },
  'NF-012': {
    number: '000.045.302',
    series: '001',
    issueDate: '06/08/2026',
    products: [
      { name: 'Cerveja Pilsen 350ml', qty: 72, unit: 'un', value: 288.0 },
      { name: 'Refrigerante Guaraná 350ml', qty: 24, unit: 'un', value: 72.0 },
    ],
    total: 360.0,
  },
}

const DELIVERIES: Delivery[] = [
  {
    id: 'd1', routeId: 'r1', number: 1, client: 'Bar do Zé', nfe: NFE_DATA['NF-001'],
    address: 'Rua das Flores, 142', neighborhood: 'Centro', city: 'Campinas', status: 'delivered',
  },
  {
    id: 'd2', routeId: 'r1', number: 2, client: 'Restaurante Sabor & Arte', nfe: NFE_DATA['NF-002'],
    address: 'Av. Brasil, 890', neighborhood: 'Vila Nova', city: 'Campinas', status: 'delivered',
  },
  {
    id: 'd3', routeId: 'r1', number: 3, client: 'Distribuidora Central', nfe: NFE_DATA['NF-003'],
    address: 'Rua Tiradentes, 55', neighborhood: 'Bom Retiro', city: 'Campinas', status: 'delivered',
  },
  {
    id: 'd4', routeId: 'r1', number: 4, client: 'Mercado São João', nfe: NFE_DATA['NF-004'],
    address: 'Alameda Santos, 331', neighborhood: 'Jardins', city: 'Campinas', status: 'delivered',
  },
  {
    id: 'd5', routeId: 'r1', number: 5, client: 'Choperia Boa Vista', nfe: NFE_DATA['NF-005'],
    address: 'Rua XV de Novembro, 78', neighborhood: 'Centro', city: 'Campinas', status: 'delivered',
  },
  {
    id: 'd6', routeId: 'r1', number: 6, client: 'Adega do Vinho', nfe: NFE_DATA['NF-006'],
    address: 'Rua Boa Vista, 204', neighborhood: 'Cambuí', city: 'Campinas', status: 'delivered',
  },
  {
    id: 'd7', routeId: 'r1', number: 7, client: 'Empório Artesanal', nfe: NFE_DATA['NF-007'],
    address: 'Rua Costa e Silva, 12', neighborhood: 'Cambuí', city: 'Campinas', status: 'delivered',
  },
  {
    id: 'd8', routeId: 'r1', number: 8, client: 'Lanchonete Expresso', nfe: NFE_DATA['NF-008'],
    address: 'Av. Orosimbo Maia, 500', neighborhood: 'Centro', city: 'Campinas', status: 'next',
  },
  {
    id: 'd9', routeId: 'r1', number: 9, client: 'Pub Irlandês', nfe: NFE_DATA['NF-009'],
    address: 'Rua Iguatemi, 88', neighborhood: 'Vila Itapura', city: 'Campinas', status: 'pending',
  },
  {
    id: 'd10', routeId: 'r1', number: 10, client: 'Restaurante Bella Nápoli', nfe: NFE_DATA['NF-010'],
    address: 'Rua Conceição, 211', neighborhood: 'Botafogo', city: 'Campinas', status: 'pending',
  },
  {
    id: 'd11', routeId: 'r1', number: 11, client: 'Gin House Club', nfe: NFE_DATA['NF-011'],
    address: 'Rua Barão de Jaguara, 730', neighborhood: 'Centro', city: 'Campinas', status: 'pending',
  },
  {
    id: 'd12', routeId: 'r1', number: 12, client: 'Bar Retrô', nfe: NFE_DATA['NF-012'],
    address: 'Rua Ferreira Penteado, 19', neighborhood: 'Centro', city: 'Campinas', status: 'pending',
  },
  {
    id: 'd13', routeId: 'r2', number: 1, client: 'Bar da Esquina', nfe: NFE_DATA['NF-001'],
    address: 'Rua Prudente de Moraes, 45', neighborhood: 'Centro', city: 'Sumaré', status: 'delivered',
  },
  {
    id: 'd14', routeId: 'r2', number: 2, client: 'Armazém Rural', nfe: NFE_DATA['NF-003'],
    address: 'Av. Mathias Prado, 789', neighborhood: 'Jd. das Flores', city: 'Sumaré', status: 'delivered',
  },
  {
    id: 'd15', routeId: 'r2', number: 3, client: 'Mercearia do Bairro', nfe: NFE_DATA['NF-004'],
    address: 'Rua das Palmeiras, 102', neighborhood: 'Novo Horizonte', city: 'Sumaré', status: 'next',
  },
  {
    id: 'd16', routeId: 'r2', number: 4, client: 'Restaurante Sabores', nfe: NFE_DATA['NF-005'],
    address: 'Rua São Paulo, 334', neighborhood: 'Centro', city: 'Sumaré', status: 'pending',
  },
  {
    id: 'd17', routeId: 'r2', number: 5, client: 'Petiscaria do Léo', nfe: NFE_DATA['NF-006'],
    address: 'Av. Industrial, 88', neighborhood: 'Jd. Paraíso', city: 'Sumaré', status: 'pending',
  },
  {
    id: 'd18', routeId: 'r2', number: 6, client: 'Pizzaria Bella Vista', nfe: NFE_DATA['NF-002'],
    address: 'Rua Duque de Caxias, 210', neighborhood: 'Vila Real', city: 'Sumaré', status: 'pending',
  },
  {
    id: 'd19', routeId: 'r3', number: 1, client: 'Supermercado Central', nfe: NFE_DATA['NF-007'],
    address: 'Av. Anhanguera, 2.100', neighborhood: 'Centro', city: 'Paulínia', status: 'delivered',
  },
  {
    id: 'd20', routeId: 'r3', number: 2, client: 'Bar & Grill Pantanal', nfe: NFE_DATA['NF-008'],
    address: 'Rua das Acácias, 55', neighborhood: 'Nova Paulínia', city: 'Paulínia', status: 'delivered',
  },
  {
    id: 'd21', routeId: 'r3', number: 3, client: 'Churrascaria Gaúcho', nfe: NFE_DATA['NF-009'],
    address: 'Rod. Santos Dumont, 3.400', neighborhood: 'Jd. Novo', city: 'Paulínia', status: 'delivered',
  },
  {
    id: 'd22', routeId: 'r3', number: 4, client: 'Empório Santa Cruz', nfe: NFE_DATA['NF-010'],
    address: 'Rua Rio Grande, 120', neighborhood: 'Centro', city: 'Paulínia', status: 'next',
  },
  {
    id: 'd23', routeId: 'r3', number: 5, client: 'Taberna Medieval', nfe: NFE_DATA['NF-011'],
    address: 'Av. Severino Pereira, 604', neighborhood: 'Vila São Pedro', city: 'Paulínia', status: 'pending',
  },
  {
    id: 'd24', routeId: 'r3', number: 6, client: 'Boteco do Juca', nfe: NFE_DATA['NF-012'],
    address: 'Rua São Bento, 17', neighborhood: 'Jardim Primavera', city: 'Paulínia', status: 'pending',
  },
  {
    id: 'd25', routeId: 'r3', number: 7, client: 'Café da Praça', nfe: NFE_DATA['NF-001'],
    address: 'Praça do Rosário, 3', neighborhood: 'Centro', city: 'Paulínia', status: 'pending',
  },
  {
    id: 'd26', routeId: 'r3', number: 8, client: 'Adega Imperial', nfe: NFE_DATA['NF-002'],
    address: 'Rua das Orquídeas, 88', neighborhood: 'Jd. Maracanã', city: 'Paulínia', status: 'pending',
  },
]

const ROUTES: Route[] = [
  {
    id: 'r1',
    city: 'Campinas',
    region: 'Região Leste',
    deliveries: DELIVERIES.filter((d) => d.routeId === 'r1').map((d) => d.id),
  },
  {
    id: 'r2',
    city: 'Sumaré',
    region: 'Região Norte',
    deliveries: DELIVERIES.filter((d) => d.routeId === 'r2').map((d) => d.id),
  },
  {
    id: 'r3',
    city: 'Paulínia',
    region: 'Região Sul',
    deliveries: DELIVERIES.filter((d) => d.routeId === 'r3').map((d) => d.id),
  },
]

// ─── Navigation types ────────────────────────────────────────────────────────

type Screen = 'routes' | 'route' | 'delivery'

interface NavState {
  screen: Screen
  routeId?: string
  deliveryId?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtCurrency(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function getRouteStats(routeId: string, deliveries: Delivery[]) {
  const routeDeliveries = deliveries.filter((d) => d.routeId === routeId)
  const total = routeDeliveries.length
  const completed = routeDeliveries.filter((d) => d.status === 'delivered').length
  return { total, completed }
}

// ─── Design System Components ────────────────────────────────────────────────

// StatusBadge
function StatusBadge({ status }: { status: DeliveryStatus }) {
  if (status === 'delivered') {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '3px 10px',
          borderRadius: 99,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.02em',
          backgroundColor: '#DCFCE7',
          color: '#15803D',
        }}
      >
        Entregue
      </span>
    )
  }
  if (status === 'next') {
    return (
      <span
        className="badge-pulse"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '3px 10px',
          borderRadius: 99,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.02em',
          backgroundColor: '#FEF9C3',
          color: '#A16207',
        }}
      >
        Próxima
      </span>
    )
  }
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '3px 10px',
        borderRadius: 99,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.02em',
        backgroundColor: '#F1F5F9',
        color: '#64748B',
      }}
    >
      Pendente
    </span>
  )
}

// Checkbox
function DeliveryCheckbox({ status }: { status: DeliveryStatus }) {
  if (status === 'delivered') {
    return (
      <span className="check-animate" style={{ color: '#16A34A', display: 'flex' }}>
        <CheckCircle2 size={22} strokeWidth={2} />
      </span>
    )
  }
  if (status === 'next') {
    return (
      <span style={{ color: '#D4AC0D', display: 'flex' }}>
        <Clock size={20} strokeWidth={2} />
      </span>
    )
  }
  return (
    <span style={{ color: '#CBD5E1', display: 'flex' }}>
      <Circle size={20} strokeWidth={1.5} />
    </span>
  )
}

// ProgressBar
function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total > 0 ? (completed / total) * 100 : 0
  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>
          Progresso da rota
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#16A34A' }}>
          {Math.round(pct)}%
        </span>
      </div>
      <div
        style={{
          width: '100%',
          height: 6,
          borderRadius: 99,
          backgroundColor: '#F1F5F9',
          overflow: 'hidden',
        }}
      >
        <div
          className="progress-fill"
          style={{
            height: '100%',
            borderRadius: 99,
            backgroundColor: '#16A34A',
            width: `${pct}%`,
          }}
        />
      </div>
    </div>
  )
}

// ─── Screen: Routes ───────────────────────────────────────────────────────────

function RouteCard({
  route,
  deliveries,
  onOpen,
}: {
  route: Route
  deliveries: Delivery[]
  onOpen: () => void
}) {
  const { total, completed } = getRouteStats(route.id, deliveries)
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const allDone = completed === total

  return (
    <button
      onClick={onOpen}
      className="card-hover btn-press"
      style={{
        width: '100%',
        textAlign: 'left',
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: 16,
        padding: '20px 20px 16px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#94A3B8',
              marginBottom: 4,
            }}
          >
            {route.region}
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
            {route.city}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: allDone ? '#DCFCE7' : '#F8FAFC',
            color: allDone ? '#16A34A' : '#64748B',
            flexShrink: 0,
          }}
        >
          {allDone ? <CheckCircle2 size={20} strokeWidth={2} /> : <Truck size={18} strokeWidth={1.75} />}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 20 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', lineHeight: 1 }}>
            {completed}
            <span style={{ fontSize: 15, color: '#94A3B8', fontWeight: 500 }}>/{total}</span>
          </div>
          <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Concluídas</div>
        </div>
        <div
          style={{
            width: 1,
            backgroundColor: '#F1F5F9',
            alignSelf: 'stretch',
          }}
        />
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', lineHeight: 1 }}>
            {pct}
            <span style={{ fontSize: 15, color: '#94A3B8', fontWeight: 500 }}>%</span>
          </div>
          <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Progresso</div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: '100%',
          height: 4,
          borderRadius: 99,
          backgroundColor: '#F1F5F9',
          overflow: 'hidden',
        }}
      >
        <div
          className="progress-fill"
          style={{
            height: '100%',
            borderRadius: 99,
            backgroundColor: allDone ? '#16A34A' : '#16A34A',
            width: `${pct}%`,
          }}
        />
      </div>

      {/* CTA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: -4,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#16A34A',
          }}
        >
          Abrir rota
        </span>
        <ChevronRight size={18} strokeWidth={2} color="#16A34A" />
      </div>
    </button>
  )
}

function RoutesScreen({
  routes,
  deliveries,
  onNavigate,
}: {
  routes: Route[]
  deliveries: Delivery[]
  onNavigate: (nav: NavState) => void
}) {
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  const totalDeliveries = deliveries.length
  const completedDeliveries = deliveries.filter((d) => d.status === 'delivered').length

  return (
    <div className="slide-in-left" style={{ minHeight: '100%', backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <div
        style={{
          padding: '56px 24px 24px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #F1F5F9',
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: '#94A3B8',
            fontWeight: 500,
            textTransform: 'capitalize',
            marginBottom: 4,
          }}
        >
          {today}
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#0F172A', margin: 0, lineHeight: 1.2 }}>
          Controle de Entregas
        </h1>
        <p style={{ fontSize: 14, color: '#64748B', margin: '6px 0 0', fontWeight: 400 }}>
          Rotas do dia
        </p>
      </div>

      {/* Summary bar */}
      <div
        style={{
          margin: '20px 24px',
          padding: '14px 18px',
          backgroundColor: '#F8FAFC',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #F1F5F9',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Package size={16} strokeWidth={1.75} color="#64748B" />
          <span style={{ fontSize: 13, color: '#64748B' }}>Total de entregas</span>
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>
          {completedDeliveries}
          <span style={{ color: '#94A3B8', fontWeight: 500 }}>/{totalDeliveries}</span>
        </span>
      </div>

      {/* Route cards */}
      <div style={{ padding: '0 24px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 4 }}>
          {routes.length} rotas ativas
        </div>
        {routes.map((route) => (
          <RouteCard
            key={route.id}
            route={route}
            deliveries={deliveries}
            onOpen={() => onNavigate({ screen: 'route', routeId: route.id })}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Screen: Route detail ─────────────────────────────────────────────────────

function DeliveryItem({
  delivery,
  onOpen,
}: {
  delivery: Delivery
  onOpen: () => void
}) {
  const isNext = delivery.status === 'next'
  const isDone = delivery.status === 'delivered'

  return (
    <button
      onClick={onOpen}
      className="btn-press"
      style={{
        width: '100%',
        textAlign: 'left',
        background: isNext ? '#FAFFF6' : '#FFFFFF',
        border: isNext ? '1.5px solid #BBF7D0' : '1px solid #F1F5F9',
        borderRadius: 12,
        padding: '14px 16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        opacity: isDone ? 0.65 : 1,
      }}
    >
      {/* Number */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDone ? '#DCFCE7' : isNext ? '#BBF7D0' : '#F8FAFC',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: isDone ? '#15803D' : isNext ? '#15803D' : '#94A3B8',
          }}
        >
          {delivery.number}
        </span>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#0F172A',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textDecoration: isDone ? 'line-through' : 'none',
            textDecorationColor: '#CBD5E1',
          }}
        >
          {delivery.client}
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#94A3B8',
            marginTop: 2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {delivery.address}
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
        <DeliveryCheckbox status={delivery.status} />
        {isNext && (
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#16A34A',
            }}
          >
            Próxima
          </span>
        )}
      </div>
    </button>
  )
}

function RouteScreen({
  route,
  deliveries,
  onBack,
  onNavigate,
}: {
  route: Route
  deliveries: Delivery[]
  onBack: () => void
  onNavigate: (nav: NavState) => void
}) {
  const routeDeliveries = deliveries.filter((d) => d.routeId === route.id)
  const { total, completed } = getRouteStats(route.id, deliveries)

  return (
    <div className="slide-in-right" style={{ minHeight: '100%', backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <div
        style={{
          padding: '52px 24px 20px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #F1F5F9',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <button
          onClick={onBack}
          className="btn-press"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            padding: '0 0 16px',
            cursor: 'pointer',
            color: '#16A34A',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={18} strokeWidth={2} />
          Rotas
        </button>

        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 2 }}>
          {route.region}
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', margin: '0 0 2px' }}>
          {route.city}
        </h2>
        <div style={{ fontSize: 14, color: '#64748B' }}>
          <span style={{ fontWeight: 700, color: '#0F172A' }}>{completed}</span>/{total} entregas concluídas
        </div>

        {/* Progress */}
        <div style={{ marginTop: 16 }}>
          <ProgressBar completed={completed} total={total} />
        </div>
      </div>

      {/* Delivery list */}
      <div style={{ padding: '16px 24px 40px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {routeDeliveries.map((d) => (
          <DeliveryItem
            key={d.id}
            delivery={d}
            onOpen={() => onNavigate({ screen: 'delivery', routeId: route.id, deliveryId: d.id })}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Screen: Delivery detail ──────────────────────────────────────────────────

function NfeModal({
  nfe,
  onClose,
}: {
  nfe: Nfe
  onClose: () => void
}) {
  return (
    <div
      className="backdrop-in"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 100,
        padding: '0 0 0',
      }}
    >
      <div
        className="modal-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 480,
          backgroundColor: '#FFFFFF',
          borderRadius: '20px 20px 0 0',
          padding: '0 0 40px',
          maxHeight: '85vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Modal handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
          <div style={{ width: 36, height: 4, borderRadius: 99, backgroundColor: '#E2E8F0' }} />
        </div>

        {/* Modal header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '12px 20px 16px',
            borderBottom: '1px solid #F1F5F9',
          }}
        >
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 2 }}>
              Nota Fiscal Eletrônica
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#0F172A' }}>
              NF-e {nfe.number}
            </div>
            <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>
              Série {nfe.series} · Emitida em {nfe.issueDate}
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn-press"
            style={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              border: '1px solid #E5E7EB',
              background: '#F8FAFC',
              cursor: 'pointer',
              color: '#64748B',
              flexShrink: 0,
            }}
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Products */}
        <div style={{ padding: '16px 20px', flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 12 }}>
            Produtos
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {nfe.products.map((product, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: i < nfe.products.length - 1 ? '1px solid #F8FAFC' : 'none',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#0F172A' }}>{product.name}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 1 }}>
                    {product.qty} {product.unit}
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', flexShrink: 0 }}>
                  {fmtCurrency(product.value)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div
          style={{
            margin: '0 20px',
            padding: '14px 16px',
            backgroundColor: '#F8FAFC',
            borderRadius: 12,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #F1F5F9',
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: '#64748B' }}>Valor Total</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#16A34A' }}>{fmtCurrency(nfe.total)}</span>
        </div>

        {/* Close button */}
        <div style={{ padding: '16px 20px 0' }}>
          <button
            onClick={onClose}
            className="btn-press"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 12,
              border: '1px solid #E5E7EB',
              background: '#F8FAFC',
              color: '#64748B',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

function DeliveryScreen({
  delivery,
  deliveries,
  onBack,
  onMarkDelivered,
}: {
  delivery: Delivery
  deliveries: Delivery[]
  onBack: () => void
  onMarkDelivered: (id: string) => void
}) {
  const [showNfe, setShowNfe] = useState(false)
  const isDone = delivery.status === 'delivered'

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${delivery.address}, ${delivery.neighborhood}, ${delivery.city}`)}`

  return (
    <>
      <div
        className="slide-in-right"
        style={{
          minHeight: '100%',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: 96,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '52px 24px 20px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #F1F5F9',
          }}
        >
          <button
            onClick={onBack}
            className="btn-press"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              padding: '0 0 16px',
              cursor: 'pointer',
              color: '#16A34A',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            <ArrowLeft size={18} strokeWidth={2} />
            Rota
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 4,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isDone ? '#DCFCE7' : '#F8FAFC',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: isDone ? '#15803D' : '#64748B' }}>
                {delivery.number}
              </span>
            </div>
            <StatusBadge status={delivery.status} />
          </div>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#0F172A',
              margin: '4px 0 0',
              lineHeight: 1.2,
            }}
          >
            {delivery.client}
          </h2>
        </div>

        {/* Details */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Address */}
          <div
            style={{
              padding: '14px 16px',
              backgroundColor: '#F8FAFC',
              borderRadius: 12,
              border: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
            }}
          >
            <MapPin size={16} strokeWidth={1.75} color="#64748B" style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 2 }}>
                Endereço
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#0F172A' }}>
                {delivery.address}
              </div>
              <div style={{ fontSize: 13, color: '#64748B' }}>
                {delivery.neighborhood} · {delivery.city}
              </div>
            </div>
          </div>

          {/* NFe number */}
          <div
            style={{
              padding: '14px 16px',
              backgroundColor: '#F8FAFC',
              borderRadius: 12,
              border: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <FileText size={16} strokeWidth={1.75} color="#64748B" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 2 }}>
                NF-e
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#0F172A' }}>
                {delivery.nfe.number}
              </div>
              <div style={{ fontSize: 12, color: '#64748B' }}>
                Emitida em {delivery.nfe.issueDate} · Série {delivery.nfe.series}
              </div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#16A34A' }}>
              {fmtCurrency(delivery.nfe.total)}
            </div>
          </div>
        </div>

        {/* Secondary actions */}
        <div style={{ padding: '0 24px', display: 'flex', gap: 10 }}>
          <button
            onClick={() => setShowNfe(true)}
            className="btn-press"
            style={{
              flex: 1,
              padding: '13px',
              borderRadius: 12,
              border: '1px solid #E5E7EB',
              background: '#FFFFFF',
              color: '#0F172A',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <FileText size={15} strokeWidth={2} />
            Visualizar NFe
          </button>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press"
            style={{
              flex: 1,
              padding: '13px',
              borderRadius: 12,
              border: '1px solid #E5E7EB',
              background: '#FFFFFF',
              color: '#0F172A',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              textDecoration: 'none',
            }}
          >
            <Navigation size={15} strokeWidth={2} />
            Google Maps
          </a>
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 480,
          padding: '12px 24px 32px',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #F1F5F9',
          zIndex: 20,
        }}
      >
        <button
          onClick={() => !isDone && onMarkDelivered(delivery.id)}
          className="btn-press"
          disabled={isDone}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: 14,
            border: 'none',
            background: isDone ? '#DCFCE7' : '#16A34A',
            color: isDone ? '#15803D' : '#FFFFFF',
            fontSize: 15,
            fontWeight: 700,
            cursor: isDone ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            letterSpacing: '-0.01em',
            transition: 'background 200ms ease',
          }}
        >
          <CheckCircle2 size={20} strokeWidth={2.5} />
          {isDone ? 'Entrega concluída' : 'Marcar como entregue'}
        </button>
      </div>

      {/* NFe Modal */}
      {showNfe && <NfeModal nfe={delivery.nfe} onClose={() => setShowNfe(false)} />}
    </>
  )
}

// ─── App root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [nav, setNav] = useState<NavState>({ screen: 'routes' })
  const [deliveries, setDeliveries] = useState<Delivery[]>(DELIVERIES)

  const handleNavigate = (next: NavState) => {
    setNav(next)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleMarkDelivered = (id: string) => {
    setDeliveries((prev) => {
      const updated = prev.map((d) => {
        if (d.id === id) return { ...d, status: 'delivered' as DeliveryStatus }
        return d
      })

      // Recalculate "next" for the route
      const routeId = prev.find((d) => d.id === id)?.routeId
      if (!routeId) return updated

      let foundNext = false
      return updated.map((d) => {
        if (d.routeId !== routeId) return d
        if (d.status === 'delivered') return d
        if (!foundNext) {
          foundNext = true
          return { ...d, status: 'next' as DeliveryStatus }
        }
        return { ...d, status: 'pending' as DeliveryStatus }
      })
    })

    // Navigate back to route after short delay
    setTimeout(() => {
      setNav((prev) => ({ screen: 'route', routeId: prev.routeId }))
    }, 600)
  }

  const currentRoute = nav.routeId ? ROUTES.find((r) => r.id === nav.routeId) : undefined
  const currentDelivery = nav.deliveryId ? deliveries.find((d) => d.id === nav.deliveryId) : undefined

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        maxWidth: 480,
        margin: '0 auto',
        position: 'relative',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {nav.screen === 'routes' && (
        <RoutesScreen routes={ROUTES} deliveries={deliveries} onNavigate={handleNavigate} />
      )}
      {nav.screen === 'route' && currentRoute && (
        <RouteScreen
          route={currentRoute}
          deliveries={deliveries}
          onBack={() => handleNavigate({ screen: 'routes' })}
          onNavigate={handleNavigate}
        />
      )}
      {nav.screen === 'delivery' && currentDelivery && (
        <DeliveryScreen
          delivery={currentDelivery}
          deliveries={deliveries}
          onBack={() => handleNavigate({ screen: 'route', routeId: nav.routeId })}
          onMarkDelivered={handleMarkDelivered}
        />
      )}
    </div>
  )
}
