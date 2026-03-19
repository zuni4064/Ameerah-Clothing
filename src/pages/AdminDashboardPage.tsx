import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import Seo from '@/components/Seo';
import { formatPrice } from '@/data/products';
import { Package, ShoppingBag, Users, TrendingUp, Eye, Trash2, ToggleLeft, ToggleRight, ChevronDown, ChevronRight } from 'lucide-react';

type AdminTab = 'overview' | 'orders' | 'products';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  processing: 'bg-blue-500/20 text-blue-400',
  shipped: 'bg-purple-500/20 text-purple-400',
  delivered: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

// ─── Data Fetchers ────────────────────────────────────────────────────────────
async function fetchOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('name');
  if (error) throw error;
  return data;
}

async function fetchStats() {
  const [ordersRes, productsRes] = await Promise.all([
    supabase.from('orders').select('id, subtotal, status'),
    supabase.from('products').select('id'),
  ]);
  const orders = ordersRes.data ?? [];
  const total = orders.reduce((sum: number, o: any) => sum + parseFloat(o.subtotal), 0);
  const pending = orders.filter((o: any) => o.status === 'pending').length;
  return {
    totalOrders: orders.length,
    totalRevenue: total,
    pendingOrders: pending,
    totalProducts: productsRes.data?.length ?? 0,
  };
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  return (
    <div className="min-h-screen bg-background">
      <Seo title="Admin Dashboard — Ameerah" canonicalPath="/admin" />

      {/* Header */}
      <div className="border-b border-white/10 bg-black/30 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl text-ivory">Admin Dashboard</h1>
            <p className="text-xs text-ivory/50 mt-1 font-body">Ameerah Clothing · Management Portal</p>
          </div>
          <div className="flex gap-2">
            {(['overview', 'orders', 'products'] as AdminTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all border-none cursor-pointer ${
                  activeTab === tab
                    ? 'bg-gold text-black'
                    : 'bg-white/5 text-ivory/60 hover:bg-white/10 hover:text-ivory'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'orders' && <OrdersTab />}
        {activeTab === 'products' && <ProductsTab />}
      </div>
    </div>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab() {
  const { data: stats, isLoading } = useQuery({ queryKey: ['admin-stats'], queryFn: fetchStats });

  const cards = [
    { label: 'Total Orders', value: stats?.totalOrders ?? 0, icon: <Package size={22} />, color: 'text-blue-400' },
    { label: 'Total Revenue', value: formatPrice(stats?.totalRevenue ?? 0), icon: <TrendingUp size={22} />, color: 'text-green-400' },
    { label: 'Pending Orders', value: stats?.pendingOrders ?? 0, icon: <ShoppingBag size={22} />, color: 'text-yellow-400' },
    { label: 'Total Products', value: stats?.totalProducts ?? 0, icon: <Users size={22} />, color: 'text-purple-400' },
  ];

  return (
    <div>
      <h2 className="font-heading text-xl text-ivory mb-6">Store Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <div key={card.label} className="glass-panel p-6 rounded-xl">
            <div className={`mb-3 ${card.color}`}>{card.icon}</div>
            <div className="font-heading text-3xl text-ivory">{isLoading ? '—' : card.value}</div>
            <div className="text-xs text-ivory/50 mt-1 font-body uppercase tracking-wider">{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────
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
      <h2 className="font-heading text-xl text-ivory mb-6">{orders.length} Orders</h2>
      <div className="space-y-3">
        {orders.map((order: any) => (
          <div key={order.id} className="glass-card rounded-lg overflow-hidden">
            {/* Row Header */}
            <div
              className="flex flex-wrap items-center gap-3 p-4 cursor-pointer"
              onClick={() => setExpanded(expanded === order.id ? null : order.id)}
            >
              <span className="text-ivory/40 text-xs">{expanded === order.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
              <span className="font-mono text-xs text-gold font-semibold">{order.id}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_COLORS[order.status] ?? 'bg-white/10 text-ivory/60'}`}>
                {order.status}
              </span>
              <span className="text-ivory/70 text-xs font-body">{order.shipping_first_name} {order.shipping_last_name}</span>
              <span className="ml-auto text-gold font-heading text-sm">{formatPrice(parseFloat(order.subtotal))}</span>
              <span className="text-ivory/40 text-[10px]">{new Date(order.created_at).toLocaleDateString()}</span>
            </div>

            {/* Expanded Details */}
            {expanded === order.id && (
              <div className="border-t border-white/5 p-4 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-ivory/40 text-xs font-body uppercase tracking-wider mb-1">Contact</p>
                    <p className="text-ivory/80">{order.shipping_phone}</p>
                    {order.shipping_email && <p className="text-ivory/60 text-xs">{order.shipping_email}</p>}
                  </div>
                  <div>
                    <p className="text-ivory/40 text-xs font-body uppercase tracking-wider mb-1">Address</p>
                    <p className="text-ivory/80 text-xs">{order.shipping_address1}</p>
                    <p className="text-ivory/60 text-xs">{order.shipping_city}</p>
                  </div>
                  <div>
                    <p className="text-ivory/40 text-xs font-body uppercase tracking-wider mb-1">Payment</p>
                    <p className="text-ivory/80 capitalize">{order.payment_method.replace('_', ' ')}</p>
                  </div>
                </div>

                {order.shipping_notes && (
                  <div className="bg-white/5 rounded p-3 text-xs text-ivory/70">
                    <span className="font-semibold">Note: </span>{order.shipping_notes}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-ivory/50 font-body uppercase tracking-wider self-center mr-2">Update Status:</span>
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                    <button
                      key={s}
                      onClick={() => updateStatus.mutate({ id: order.id, status: s })}
                      className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-wider border-none cursor-pointer transition-colors ${
                        order.status === s ? 'bg-gold text-black' : 'bg-white/10 text-ivory/60 hover:bg-white/20'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                  <button
                    onClick={() => { if (window.confirm('Delete this order?')) deleteOrder.mutate(order.id); }}
                    className="ml-auto text-red-400 hover:text-red-300 bg-transparent border-none cursor-pointer p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Products Tab ─────────────────────────────────────────────────────────────
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
      <div className="flex items-center justify-between mb-6 gap-4">
        <h2 className="font-heading text-xl text-ivory">{products.length} Products</h2>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-ivory font-body text-sm outline-none focus:border-gold/50 w-full max-w-xs"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-ivory/40 text-xs uppercase tracking-wider font-body">Product</th>
              <th className="text-left py-3 px-4 text-ivory/40 text-xs uppercase tracking-wider font-body">Category</th>
              <th className="text-left py-3 px-4 text-ivory/40 text-xs uppercase tracking-wider font-body">Price</th>
              <th className="text-left py-3 px-4 text-ivory/40 text-xs uppercase tracking-wider font-body">Badge</th>
              <th className="text-left py-3 px-4 text-ivory/40 text-xs uppercase tracking-wider font-body">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product: any) => (
              <tr key={product.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-10 h-12 object-cover rounded opacity-80" />
                    <div>
                      <p className="text-ivory font-body text-sm">{product.name}</p>
                      <p className="text-ivory/40 text-xs">{product.tag}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-ivory/60 text-xs">
                  {(product.categories as any)?.name ?? product.category_id}
                </td>
                <td className="py-4 px-4 text-gold font-heading">
                  {formatPrice(parseFloat(product.price))}
                  {product.original_price && (
                    <span className="text-ivory/30 line-through ml-2 text-xs font-body">
                      {formatPrice(parseFloat(product.original_price))}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4">
                  {product.badge && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      product.badge === 'DISABLED' ? 'bg-red-500/20 text-red-400' : 'bg-gold/20 text-gold'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBadge.mutate({ id: product.id, badge: product.badge })}
                      title={product.badge === 'DISABLED' ? 'Enable product' : 'Disable product'}
                      className={`bg-transparent border-none cursor-pointer transition-colors ${
                        product.badge === 'DISABLED' ? 'text-red-400 hover:text-red-300' : 'text-ivory/50 hover:text-ivory'
                      }`}
                    >
                      {product.badge === 'DISABLED' ? <ToggleLeft size={18} /> : <ToggleRight size={18} />}
                    </button>
                    <button
                      onClick={() => { if (window.confirm(`Delete "${product.name}"?`)) deleteProduct.mutate(product.id); }}
                      className="text-red-400/50 hover:text-red-400 bg-transparent border-none cursor-pointer transition-colors"
                    >
                      <Trash2 size={16} />
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

function Spinner() {
  return (
    <div className="py-24 flex justify-center">
      <span className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
