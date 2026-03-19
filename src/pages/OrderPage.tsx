import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Seo from "@/components/Seo";
import { getOrderByIdAsync, formatOrderForWhatsapp } from "@/lib/orders";
import { formatPrice } from "@/data/products";
import { useQuery } from "@tanstack/react-query";

const WHATSAPP_NUMBER = "923001234567";

export default function OrderPage() {
  const { id } = useParams<{ id: string }>();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrderByIdAsync(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-32 text-center text-ivory">
        <span className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin inline-block"></span>
        <p className="font-heading text-xl mt-6">Loading your order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
        <Seo title="Order not found — Ameerah Clothing" canonicalPath="/checkout" />
        <div className="bg-card border border-border p-8 text-center">
          <p className="font-heading text-2xl mb-2">Order not found</p>
          <p className="font-body text-muted-foreground mb-6">
            If you placed an order on another device or cleared browser data, it may not be available here.
          </p>
          <Link
            to="/products"
            className="inline-flex bg-white/5 text-gold-light px-8 py-3 font-body font-semibold uppercase tracking-wider text-sm no-underline hover:bg-white/5-light transition-colors"
          >
            Browse Products →
          </Link>
        </div>
      </div>
    );
  }

  const whatsappText = encodeURIComponent(formatOrderForWhatsapp(order));
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  return (
    <div>
      <Seo
        title={`Order ${order.id} — Ameerah Clothing`}
        description="Your order has been created. Send it to WhatsApp to confirm."
        canonicalPath={`/order/${order.id}`}
      />

      <section className="bg-white/5 py-12 md:py-16 text-center">
        <p className="text-gold text-xs font-body font-semibold uppercase tracking-wider">
          Order created
        </p>
        <h1 className="font-heading text-4xl md:text-5xl mt-2" style={{ color: "white" }}>
          Thank you
        </h1>
        <p className="font-body mt-3" style={{ color: "rgba(255,255,255,0.7)" }}>
          Your order is ready. Send it on WhatsApp to confirm.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
          <div className="bg-card border border-border p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
              <div>
                <p className="font-body text-sm text-muted-foreground">Order ID</p>
                <p className="font-heading text-2xl">{order.id}</p>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-green-600 text-white px-5 py-3 font-body font-semibold uppercase tracking-wider text-xs no-underline hover:bg-green-700 transition-colors"
              >
                Send on WhatsApp →
              </a>
            </div>

            <h2 className="font-heading text-xl mb-4">Items</h2>
            <div className="space-y-4">
              {order.items.map((it) => (
                <div key={`${it.id}-${it.tag}`} className="flex gap-4 border-b border-border pb-4">
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-[70px] h-[90px] object-cover object-top flex-shrink-0"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-sm md:text-base">{it.name}</p>
                    <p className="text-xs text-muted-foreground font-body mt-1">{it.tag}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-body text-sm text-muted-foreground">Qty {it.qty}</p>
                      <p className="font-body font-semibold text-gold">
                        {formatPrice(it.price * it.qty)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-card border border-border p-6 md:p-8 h-fit space-y-5">
            <div>
              <h3 className="font-heading text-xl mb-3">Total</h3>
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-muted-foreground">Subtotal</span>
                <span className="font-heading text-2xl font-semibold">
                  {formatPrice(order.subtotal)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-body mt-2">
                Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : "Bank Transfer"}
              </p>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="font-heading text-lg mb-2">Shipping</h4>
              <p className="font-body text-sm text-muted-foreground">
                {order.shippingDetails.firstName} {order.shippingDetails.lastName}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {order.shippingDetails.phone}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {order.shippingDetails.address1}
                {order.shippingDetails.address2 ? `, ${order.shippingDetails.address2}` : ""}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {order.shippingDetails.city}
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center justify-center w-full bg-white/5 text-gold-light py-3 font-body font-semibold uppercase tracking-wider text-sm no-underline hover:bg-white/5-light transition-colors"
            >
              Continue Shopping →
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}

