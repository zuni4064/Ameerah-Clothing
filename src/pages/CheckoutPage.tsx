import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "@/components/Seo";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { createOrderId, saveOrderAsync, type PaymentMethod } from "@/lib/orders";
import Reveal from "@/components/motion/Reveal";

const checkoutSchema = z.object({
  firstName:     z.string().min(2, "First name is required"),
  lastName:      z.string().min(2, "Last name is required"),
  phone:         z.string().min(7, "Phone is required"),
  email:         z.string().email("Enter a valid email").optional().or(z.literal("")),
  city:          z.string().min(2, "City is required"),
  address1:      z.string().min(5, "Address is required"),
  address2:      z.string().optional(),
  notes:         z.string().optional(),
  paymentMethod: z.enum(["cod", "bank_transfer"]),
});
type CheckoutForm = z.infer<typeof checkoutSchema>;

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <label
    className="font-body text-[10.5px] font-medium uppercase tracking-[.14em] mb-1.5 block"
    style={{ color: 'rgba(255,255,255,.4)' }}
  >
    {children}
  </label>
);

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? (
    <p className="font-body text-[11px] mt-1" style={{ color: 'rgba(220,60,60,.8)' }}>
      {msg}
    </p>
  ) : null;

export default function CheckoutPage() {
  const navigate        = useNavigate();
  const { cart, clearCart } = useCart();
  const { user }        = useAuth();

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "cod" },
  });

  const paymentMethod = watch('paymentMethod');

  const onSubmit = handleSubmit(async values => {
    if (!cart.length) return;
    const orderId = createOrderId();
    try {
      await saveOrderAsync({
        id: orderId,
        items: cart,
        subtotal,
        paymentMethod: values.paymentMethod as PaymentMethod,
        userId: user?.id,
        shippingDetails: {
          firstName: values.firstName,
          lastName:  values.lastName,
          phone:     values.phone,
          email:     values.email || undefined,
          city:      values.city,
          address1:  values.address1,
          address2:  values.address2 || undefined,
          notes:     values.notes || undefined,
        },
      });
      clearCart();
      navigate(`/order/${orderId}`, { replace: true });
    } catch {
      alert("Failed to submit order. Please try again.");
    }
  });

  return (
    <div>
      <Seo title="Checkout — Ameerah Clothing" canonicalPath="/checkout" />

      {/* Header */}
      <section className="relative pt-16 pb-14 text-center overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: '50%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(180,140,90,.35), transparent)' }}
        />
        <Reveal>
          <span
            className="font-body text-[9.5px] font-semibold uppercase tracking-[.24em] block mb-3"
            style={{ color: 'hsl(var(--gold))' }}
          >
            Secure Checkout
          </span>
          <h1
            className="font-heading font-light"
            style={{ fontSize: 'clamp(32px,4.5vw,52px)', color: 'hsl(var(--ivory))' }}
          >
            Complete Your Order
          </h1>
        </Reveal>
      </section>

      <section className="max-w-[1200px] mx-auto px-5 md:px-10 pb-24">
        {cart.length === 0 ? (
          <Reveal>
            <div
              className="p-16 text-center"
              style={{ border: '1px solid rgba(255,255,255,.07)' }}
            >
              <p className="font-heading text-2xl font-light mb-3" style={{ color: 'hsl(var(--ivory))' }}>
                Your bag is empty
              </p>
              <p className="font-body text-sm mb-8" style={{ color: 'rgba(255,255,255,.35)' }}>
                Add items to your bag to continue.
              </p>
              <button onClick={() => navigate('/products')} className="btn-outline px-8 py-3 rounded-sm">
                Browse Products →
              </button>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

            {/* Left: Form */}
            <div className="space-y-6">
              <div
                className="p-6 md:p-8"
                style={{ background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.07)' }}
              >
                <h2
                  className="font-heading text-[22px] font-light mb-6"
                  style={{ color: 'hsl(var(--ivory))' }}
                >
                  Shipping Details
                </h2>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel>First Name</FieldLabel>
                      <input {...register('firstName')} className="field" placeholder="Ayesha" />
                      <FieldError msg={errors.firstName?.message} />
                    </div>
                    <div>
                      <FieldLabel>Last Name</FieldLabel>
                      <input {...register('lastName')} className="field" placeholder="Khan" />
                      <FieldError msg={errors.lastName?.message} />
                    </div>
                    <div>
                      <FieldLabel>Phone</FieldLabel>
                      <input {...register('phone')} className="field" placeholder="+92 3xx xxxxxxx" />
                      <FieldError msg={errors.phone?.message} />
                    </div>
                    <div>
                      <FieldLabel>Email (optional)</FieldLabel>
                      <input type="email" {...register('email')} className="field" placeholder="you@email.com" />
                      <FieldError msg={errors.email?.message} />
                    </div>
                    <div>
                      <FieldLabel>City</FieldLabel>
                      <input {...register('city')} className="field" placeholder="Lahore" />
                      <FieldError msg={errors.city?.message} />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel>Address</FieldLabel>
                      <input {...register('address1')} className="field" placeholder="House / Street / Area" />
                      <FieldError msg={errors.address1?.message} />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel>Apartment / Landmark (optional)</FieldLabel>
                      <input {...register('address2')} className="field" placeholder="Apartment, floor, landmark" />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel>Order Notes (optional)</FieldLabel>
                      <textarea
                        {...register('notes')}
                        className="field min-h-[90px] resize-y"
                        placeholder="Sizing, stitching, delivery instructions…"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <FieldLabel>Payment Method</FieldLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {[
                        { value: 'cod',           label: 'Cash on Delivery',  icon: '💵' },
                        { value: 'bank_transfer',  label: 'Bank Transfer',     icon: '🏦' },
                      ].map(opt => (
                        <label
                          key={opt.value}
                          className="flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all"
                          style={{
                            background: paymentMethod === opt.value ? 'rgba(180,140,90,.08)' : 'transparent',
                            border:     paymentMethod === opt.value ? '1px solid rgba(180,140,90,.35)' : '1px solid rgba(255,255,255,.1)',
                          }}
                        >
                          <input
                            type="radio"
                            value={opt.value}
                            {...register('paymentMethod')}
                            className="sr-only"
                          />
                          <span className="text-lg">{opt.icon}</span>
                          <span className="font-body text-sm" style={{ color: 'rgba(255,255,255,.75)' }}>
                            {opt.label}
                          </span>
                          {paymentMethod === opt.value && (
                            <span
                              className="ml-auto w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: 'hsl(var(--gold))', color: '#0a0805' }}
                            >
                              <span style={{ fontSize: '9px' }}>✓</span>
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="btn-gold w-full py-4 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Placing Order…' : 'Place Order →'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Order Summary */}
              <div
                className="p-6 md:p-8"
                style={{ background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.07)' }}
              >
                <h2
                  className="font-heading text-[22px] font-light mb-5"
                  style={{ color: 'hsl(var(--ivory))' }}
                >
                  Order Summary
                </h2>
                <div className="space-y-4">
                  {cart.map(item => (
                    <div
                      key={`${item.id}-${item.tag}`}
                      className="flex gap-4 pb-4"
                      style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}
                    >
                      <div
                        className="w-[62px] h-[82px] flex-shrink-0 overflow-hidden"
                        style={{ border: '1px solid rgba(255,255,255,.07)' }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-heading text-sm font-light"
                          style={{ color: 'hsl(var(--ivory))' }}
                        >
                          {item.name}
                        </p>
                        <p
                          className="font-body text-[11px] mt-0.5"
                          style={{ color: 'rgba(255,255,255,.35)' }}
                        >
                          {item.tag}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span
                            className="font-body text-[11px]"
                            style={{ color: 'rgba(255,255,255,.35)' }}
                          >
                            Qty {item.qty}
                          </span>
                          <span
                            className="font-body text-sm font-semibold"
                            style={{ color: 'hsl(var(--gold))' }}
                          >
                            {formatPrice(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Total */}
            <aside className="h-fit sticky top-24">
              <div
                className="p-6"
                style={{ background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.07)' }}
              >
                <h3
                  className="font-heading text-lg font-light mb-5"
                  style={{ color: 'hsl(var(--ivory))' }}
                >
                  Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-body text-xs uppercase tracking-[.14em]" style={{ color: 'rgba(255,255,255,.4)' }}>
                      Subtotal
                    </span>
                    <span
                      className="font-heading text-2xl font-light"
                      style={{ color: 'hsl(var(--ivory))' }}
                    >
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-xs uppercase tracking-[.14em]" style={{ color: 'rgba(255,255,255,.4)' }}>
                      Delivery
                    </span>
                    <span
                      className="font-body text-xs"
                      style={{ color: subtotal >= 3000 ? '#6bb87c' : 'rgba(255,255,255,.4)' }}
                    >
                      {subtotal >= 3000 ? 'Free' : 'Calculated at delivery'}
                    </span>
                  </div>
                </div>

                <div
                  className="mt-4 pt-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,.07)' }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-body text-xs uppercase tracking-[.14em]" style={{ color: 'rgba(255,255,255,.55)' }}>
                      Total
                    </span>
                    <span
                      className="font-heading text-2xl font-light"
                      style={{ color: 'hsl(var(--gold))' }}
                    >
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>

                <p
                  className="font-body text-[10.5px] mt-5 leading-relaxed"
                  style={{ color: 'rgba(255,255,255,.28)' }}
                >
                  🚚 Free delivery on orders above PKR 3,000
                </p>

                <button
                  onClick={() => navigate('/products')}
                  className="btn-ghost w-full py-3 rounded-sm mt-5 text-[10.5px] tracking-[.12em]"
                >
                  Continue Shopping
                </button>
              </div>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}