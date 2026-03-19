import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import Seo from '@/components/Seo';
import { formatPrice } from '@/data/products';
import {
  Package, ShoppingBag, TrendingUp, BarChart2,
  Eye, Trash2, ToggleLeft, ToggleRight, ChevronDown, ChevronRight, Search,
} from 'lucide-react';

type AdminTab = 'overview' | 'orders' | 'products';

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  pending:    { bg: 'rgba(220,180,60,.12)',  color: '#d4b04a' },
  processing: { bg: 'rgba(80,140,220,.12)',  color: '#7aaddd' },
  shipped:    { bg: 'rgba(140,80,220,.12)',  color: '#aa88dd' },
  delivered:  { bg: 'rgba(80,180,100,.12)', color: '#7ab884' },
  cancelled:  { bg: 'rgba(220,60,60,.12)',   color: '#d47070' },
};

async function fetchOrders() {
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}
async function fetchProducts() {
  const { data, error } = await supabase.from('products').select('*, categories(name)').order('name');
  if (error) throw error;
  return data;
}
async function fetchStats() {
  const [ordersRes, productsRes] = await Promise.all([
    supabase.from('orders').select('id, subtotal, status'),
    supabase.from('products').select('id'),
  ]);
  const orders  = ordersRes.data ?? [];
  const total   = orders.reduce((s: number, o: any) => s + parseFloat(o.subtotal), 0);
  const pending = orders.filter((o: any) => o.status === 'pending').length;
  return {
    totalOrders:    orders.length,
    totalRevenue:   total,
    pendingOrders:  pending,
    totalProducts:  productsRes.data?.length ?? 0,
  };
}

const Spinner = () => (
  <div className="py-32 flex justify-center">
    <div className="w-8 h-8 rounded-full animate-spin" style={{ border: '2px solid rgba(180,140,90,.2)', borderTopColor: 'hsl(var(--gold))' }} />
  </div>
);

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<AdminTab>('overview');

  return (
    <div className="min-h-screen">
      <Seo title="Admin Dashboard — Ameerah" canonicalPath="/admin" />

      {/* Header */}
      <div
        className="sticky top-0 z-50"
        style={{ background: 'rgba(6,5,4,.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,.06)' }}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-xl font-light" style={{ color: 'hsl(var(--ivory))' }}>
              Admin Dashboard
            </h1>
            <p className="font-body text-[10.5px] mt-0.5" style={{ color: 'rgba(255,255,255,.3)' }}>
              Ameerah Clothing · Management Portal
            </p>
          </div>
          <div className="flex gap-2">
            {(['overview', 'orders', 'products'] as AdminTab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-4 py-2 font-body text-[10.5px] font-semibold uppercase tracking-[.14em] transition-all border-none cursor-pointer"
                style={{
                  background: tab === t ? 'hsl(var(--gold))' : 'rgba(255,255,255,.05)',
                  color:      tab === t ? '#0a0805' : 'rgba(255,255,255,.5)',
                }}
                onMouseEnter={e => { if (tab !== t) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,.09)'; }}
                onMouseLeave={e => { if (tab !== t) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,.05)'; }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-10">
        {tab === 'overview'  && <OverviewTab />}
        {tab === 'orders'    && <OrdersTab />}
        {tab === 'products'  && <ProductsTab />}
      </div>
    </div>
  );
}

/* ─── Overview ─── */
function OverviewTab() {
  const { data: stats, isLoading } = useQuery({ queryKey: ['admin-stats'], queryFn: fetchStats });

  const cards = [
    { label: 'Total Orders',    value: stats?.totalOrders ?? 0,            icon: <Package   size={20} strokeWidth={1.3} />, color: '#7aaddd' },
    { label: 'Total Revenue',   value: formatPrice(stats?.totalRevenue ?? 0), icon: <TrendingUp size={20} strokeWidth={1.3} />, color: '#7ab884' },
    { label: 'Pending Orders',  value: stats?.pendingOrders ?? 0,          icon: <ShoppingBag size={20} strokeWidth={1.3} />, color: '#d4b04a' },
    { label: 'Total Products',  value: stats?.totalProducts ?? 0,          icon: <BarChart2  size={20} strokeWidth={1.3} />, color: '#aa88dd' },
  ];

  return (
    <div>
      <p className="font-body text-[10.5px] font-semibold uppercase tracking-[.2em] mb-6" style={{ color: 'hsl(var(--gold))' }}>
        Store Overview
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <div
            key={card.label}
            className="p-6"
            style={{ background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.07)' }}
          >
            <div className="mb-4" style={{ color: card.color }}>{card.icon}</div>
            <div className="font-heading text-3xl font-light" style={{ color: 'hsl(var(--ivory))' }}>
              {isLoading ? '—' : card.value}
            </div>
            <div className="font-body text-[10px] uppercase tracking-[.14em] mt-1.5" style={{ color: 'rgba(255,255,255,.38)' }}>
              {card.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Orders ─── */
function OrdersTab() {
  const qc = useQueryClient();
  const { data: orders = [], isLoading } = useQuery({ queryKey: ['admin-orders'], queryFn: fetchOrders });
  const [expanded, setExpanded] = useState<string | null>(null);

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('orders').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-orders'] }),
  });

  const deleteOrder = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('orders').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-orders'] }),
  });

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="font-body text-[10.5px] font-semibold uppercase tracking-[.2em]" style={{ color: 'hsl(var(--gold))' }}>
          {orders.length} Orders
        </p>
      </div>
      <div className="space-y-2">
        {orders.map((order: any) => {
          const st = STATUS_STYLES[order.status] ?? { bg: 'rgba(255,255,255,.07)', color: 'rgba(255,255,255,.5)' };
          return (
            <div
              key={order.id}
              className="overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,.07)', background: 'rgba(255,255,255,.02)' }}
            >
              <div
                className="flex flex-wrap items-center gap-3 px-5 py-4 cursor-pointer hover:bg-white/[0.025] transition-colors"
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              >
                <span style={{ color: 'rgba(255,255,255,.3)' }}>
                  {expanded === order.id ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                </span>
                <span className="font-mono text-[11px]" style={{ color: 'hsl(var(--gold))' }}>
                  {order.id.slice(0, 8)}…
                </span>
                <span
                  className="px-2.5 py-0.5 font-body text-[9.5px] font-semibold uppercase tracking-[.1em] rounded-full"
                  style={{ background: st.bg, color: st.color }}
                >
                  {order.status}
                </span>
                <span className="font-body text-xs" style={{ color: 'rgba(255,255,255,.6)' }}>
                  {order.shipping_first_name} {order.shipping_last_name}
                </span>
                <span className="ml-auto font-heading text-base font-light" style={{ color: 'hsl(var(--gold))' }}>
                  {formatPrice(parseFloat(order.subtotal))}
                </span>
                <span className="font-body text-[10px]" style={{ color: 'rgba(255,255,255,.3)' }}>
                  {new Date(order.created_at).toLocaleDateString()}
                </span>
              </div>

              {expanded === order.id && (
                <div className="px-5 pb-5 space-y-4" style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 text-sm">
                    <div>
                      <p className="font-body text-[9.5px] uppercase tracking-[.14em] mb-1" style={{ color: 'rgba(255,255,255,.3)' }}>Contact</p>
                      <p className="font-body text-[12.5px]" style={{ color: 'rgba(255,255,255,.7)' }}>{order.shipping_phone}</p>
                    </div>
                    <div>
                      <p className="font-body text-[9.5px] uppercase tracking-[.14em] mb-1" style={{ color: 'rgba(255,255,255,.3)' }}>Address</p>
                      <p className="font-body text-[12px]" style={{ color: 'rgba(255,255,255,.6)' }}>{order.shipping_address1}, {order.shipping_city}</p>
                    </div>
                    <div>
                      <p className="font-body text-[9.5px] uppercase tracking-[.14em] mb-1" style={{ color: 'rgba(255,255,255,.3)' }}>Payment</p>
                      <p className="font-body text-[12.5px] capitalize" style={{ color: 'rgba(255,255,255,.7)' }}>
                        {order.payment_method?.replace('_', ' ')}
                      </p>
                    </div>
                  </div>

                  {order.shipping_notes && (
                    <p
                      className="font-body text-xs italic p-3"
                      style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)', color: 'rgba(255,255,255,.5)' }}
                    >
                      Note: {order.shipping_notes}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="font-body text-[9.5px] uppercase tracking-[.14em] self-center mr-1" style={{ color: 'rgba(255,255,255,.3)' }}>
                      Status:
                    </span>
                    {['pending','processing','shipped','delivered','cancelled'].map(s => (
                      <button
                        key={s}
                        onClick={() => updateStatus.mutate({ id: order.id, status: s })}
                        className="px-3 py-1.5 font-body text-[9.5px] font-semibold uppercase tracking-[.1em] border-none cursor-pointer transition-colors"
                        style={{
                          background: order.status === s ? 'hsl(var(--gold))' : 'rgba(255,255,255,.07)',
                          color:      order.status === s ? '#0a0805' : 'rgba(255,255,255,.5)',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                    <button
                      onClick={() => { if (window.confirm('Delete this order?')) deleteOrder.mutate(order.id); }}
                      className="ml-auto p-1.5 bg-transparent border-none cursor-pointer transition-colors"
                      style={{ color: 'rgba(220,60,60,.5)' }}
                      onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(220,60,60,.8)'}
                      onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(220,60,60,.5)'}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Products ─── */
function ProductsTab() {
  const qc = useQueryClient();
  const { data: products = [], isLoading } = useQuery({ queryKey: ['admin-products'], queryFn: fetchProducts });
  const [search, setSearch] = useState('');

  const toggleBadge = useMutation({
    mutationFn: async ({ id, badge }: { id: string; badge: string | null }) => {
      const newBadge = badge === 'DISABLED' ? null : 'DISABLED';
      const { error } = await supabase.from('products').update({ badge: newBadge }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-products'] }),
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-products'] }),
  });

  const filtered = products.filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.tag.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <p className="font-body text-[10.5px] font-semibold uppercase tracking-[.2em]" style={{ color: 'hsl(var(--gold))' }}>
          {products.length} Products
        </p>
        <div className="relative">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,.3)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products…"
            className="field pl-9 w-full max-w-[240px]"
            style={{ paddingLeft: '2.25rem' }}
          />
        </div>
      </div>

      <div
        className="overflow-x-auto"
        style={{ border: '1px solid rgba(255,255,255,.07)' }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
              {['Product','Category','Price','Badge','Actions'].map(h => (
                <th
                  key={h}
                  className="text-left py-3.5 px-5 font-body text-[9.5px] font-semibold uppercase tracking-[.16em]"
                  style={{ color: 'rgba(255,255,255,.3)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((product: any) => (
              <tr
                key={product.id}
                className="transition-colors hover:bg-white/[0.02]"
                style={{ borderBottom: '1px solid rgba(255,255,255,.04)' }}
              >
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-11 overflow-hidden flex-shrink-0" style={{ border: '1px solid rgba(255,255,255,.08)' }}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-body text-[12.5px]" style={{ color: 'rgba(255,255,255,.75)' }}>{product.name}</p>
                      <p className="font-body text-[10.5px] mt-0.5" style={{ color: 'rgba(255,255,255,.3)' }}>{product.tag}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-5 font-body text-[11.5px]" style={{ color: 'rgba(255,255,255,.4)' }}>
                  {(product.categories as any)?.name ?? '—'}
                </td>
                <td className="py-4 px-5">
                  <span className="font-heading text-sm font-light" style={{ color: 'hsl(var(--gold))' }}>
                    {formatPrice(parseFloat(product.price))}
                  </span>
                  {product.original_price && (
                    <span className="font-body text-[10.5px] line-through ml-2" style={{ color: 'rgba(255,255,255,.25)' }}>
                      {formatPrice(parseFloat(product.original_price))}
                    </span>
                  )}
                </td>
                <td className="py-4 px-5">
                  {product.badge && (
                    <span
                      className="px-2 py-0.5 font-body text-[9px] font-semibold uppercase tracking-[.1em] rounded-full"
                      style={{
                        background: product.badge === 'DISABLED' ? 'rgba(220,60,60,.1)' : 'rgba(180,140,90,.12)',
                        color:      product.badge === 'DISABLED' ? '#d47070' : 'hsl(var(--gold))',
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                </td>
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleBadge.mutate({ id: product.id, badge: product.badge })}
                      title={product.badge === 'DISABLED' ? 'Enable' : 'Disable'}
                      className="bg-transparent border-none cursor-pointer transition-colors"
                      style={{ color: product.badge === 'DISABLED' ? 'rgba(220,60,60,.6)' : 'rgba(255,255,255,.35)' }}
                    >
                      {product.badge === 'DISABLED'
                        ? <ToggleLeft  size={16} />
                        : <ToggleRight size={16} />
                      }
                    </button>
                    <button
                      onClick={() => { if (window.confirm(`Delete "${product.name}"?`)) deleteProduct.mutate(product.id); }}
                      className="bg-transparent border-none cursor-pointer transition-colors"
                      style={{ color: 'rgba(220,60,60,.4)' }}
                      onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(220,60,60,.8)'}
                      onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(220,60,60,.4)'}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}