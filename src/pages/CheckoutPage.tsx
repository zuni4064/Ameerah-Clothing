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

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(7, "Phone is required"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  city: z.string().min(2, "City is required"),
  address1: z.string().min(5, "Address is required"),
  address2: z.string().optional(),
  notes: z.string().optional(),
  paymentMethod: z.enum(["cod", "bank_transfer"]),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "cod",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    if (cart.length === 0) return;

    const orderId = createOrderId();
    const paymentMethod = values.paymentMethod as PaymentMethod;

    try {
      await saveOrderAsync({
        id: orderId,
        items: cart,
        subtotal,
        paymentMethod,
        userId: user?.id,
        shippingDetails: {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          email: values.email || undefined,
          city: values.city,
          address1: values.address1,
          address2: values.address2 || undefined,
          notes: values.notes || undefined,
        },
      });

      clearCart();
      navigate(`/order/${orderId}`, { replace: true });
    } catch (error) {
      console.error("Order creation failed", error);
      alert("Failed to submit order. Please try again.");
    }
  });

  return (
    <div>
      <Seo
        title="Checkout — Ameerah Clothing"
        description="Review your order and proceed to checkout."
        canonicalPath="/checkout"
      />

      <section className="bg-white/5 py-12 md:py-16 text-center">
        <h1 className="font-heading text-4xl md:text-5xl" style={{ color: "white" }}>
          Checkout
        </h1>
        <p className="font-body mt-2" style={{ color: "rgba(255,255,255,0.6)" }}>
          Review your items and place your order
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
        {cart.length === 0 ? (
          <div className="bg-card border border-border p-8 text-center">
            <p className="font-heading text-2xl mb-2">Your cart is empty</p>
            <p className="font-body text-muted-foreground mb-6">
              Add items to your cart to continue.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-white/5 text-gold-light px-8 py-3 font-body font-semibold uppercase tracking-wider text-sm border-none cursor-pointer hover:bg-white/5-light transition-colors"
            >
              Browse Products →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
            <div className="space-y-6">
              <div className="bg-card border border-border p-6 md:p-8">
                <h2 className="font-heading text-2xl mb-6">Shipping Details</h2>
                <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm text-foreground mb-1 block">First Name</label>
                    <input
                      {...register("firstName")}
                      className="w-full border border-border px-4 py-3 font-body text-sm focus:border-gold outline-none bg-transparent"
                      placeholder="First name"
                    />
                    {errors.firstName ? (
                      <p className="mt-1 text-xs font-body text-destructive">{errors.firstName.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className="font-body text-sm text-foreground mb-1 block">Last Name</label>
                    <input
                      {...register("lastName")}
                      className="w-full border border-border px-4 py-3 font-body text-sm focus:border-gold outline-none bg-transparent"
                      placeholder="Last name"
                    />
                    {errors.lastName ? (
                      <p className="mt-1 text-xs font-body text-destructive">{errors.lastName.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className="font-body text-sm text-foreground mb-1 block">Phone</label>
                    <input
                      {...register("phone")}
                      className="w-full border border-border px-4 py-3 font-body text-sm focus:border-gold outline-none bg-transparent"
                      placeholder="+92 3xx xxxxxxx"
                    />
                    {errors.phone ? (
                      <p className="mt-1 text-xs font-body text-destructive">{errors.phone.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className="font-body text-sm text-foreground mb-1 block">Email (optional)</label>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full border border-border px-4 py-3 font-body text-sm focus:border-gold outline-none bg-transparent"
                      placeholder="you@email.com"
                    />
                    {errors.email ? (
                      <p className="mt-1 text-xs font-body text-destructive">{errors.email.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className="font-body text-sm text-foreground mb-1 block">City</label>
                    <input
                      {...register("city")}
                      className="w-full border border-border px-4 py-3 font-body text-sm focus:border-gold outline-none bg-transparent"
                      placeholder="Lahore"
                    />
                    {errors.city ? (
                      <p className="mt-1 text-xs font-body text-destructive">{errors.city.message}</p>
                    ) : null}
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-body text-sm text-foreground mb-1 block">Address</label>
                    <input
                      {...register("address1")}
                      className="w-full border border-border px-4 py-3 font-body text-sm focus:border-gold outline-none bg-transparent"
                      placeholder="House / Street / Area"
                    />
                    {errors.address1 ? (
                      <p className="mt-1 text-xs font-body text-destructive">{errors.address1.message}</p>
                    ) : null}
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-body text-sm text-foreground mb-1 block">Apartment / Landmark (optional)</label>
                    <input
                      {...register("address2")}
                      className="w-full border border-border px-4 py-3 font-body text-sm focus:border-gold outline-none bg-transparent"
                      placeholder="Apartment, floor, landmark"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-body text-sm text-foreground mb-1 block">Order Notes (optional)</label>
                    <textarea
                      {...register("notes")}
                      className="w-full border border-border px-4 py-3 font-body text-sm focus:border-gold outline-none bg-transparent min-h-[100px] resize-y"
                      placeholder="Sizing, stitching, delivery instructions..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-body text-sm text-foreground mb-2 block">Payment Method</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <label className="flex items-center gap-2 border border-border px-4 py-3 cursor-pointer hover:border-gold">
                        <input type="radio" value="cod" {...register("paymentMethod")} />
                        <span className="font-body text-sm">Cash on Delivery</span>
                      </label>
                      <label className="flex items-center gap-2 border border-border px-4 py-3 cursor-pointer hover:border-gold">
                        <input type="radio" value="bank_transfer" {...register("paymentMethod")} />
                        <span className="font-body text-sm">Bank Transfer</span>
                      </label>
                    </div>
                    {errors.paymentMethod ? (
                      <p className="mt-1 text-xs font-body text-destructive">{errors.paymentMethod.message}</p>
                    ) : null}
                  </div>
                  <div className="md:col-span-2">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-white/5 text-gold-light py-3.5 font-body font-semibold uppercase tracking-wider text-sm border-none cursor-pointer hover:bg-white/5-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Placing Order..." : "Place Order →"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-card border border-border p-6 md:p-8">
                <h2 className="font-heading text-2xl mb-6">Order Summary</h2>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.tag}`} className="flex gap-4 border-b border-border pb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[70px] h-[90px] object-cover object-top flex-shrink-0"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-heading text-sm md:text-base">{item.name}</p>
                        <p className="text-xs text-muted-foreground font-body mt-1">{item.tag}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="font-body text-sm text-muted-foreground">Qty {item.qty}</p>
                          <p className="font-body font-semibold text-gold">
                            {formatPrice(item.price * item.qty)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="bg-card border border-border p-6 md:p-8 h-fit">
              <h3 className="font-heading text-xl mb-4">Total</h3>
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-muted-foreground">Subtotal</span>
                <span className="font-heading text-2xl font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground font-body mt-3">
                🚚 Free delivery on orders above PKR 3,000
              </p>
              <button
                onClick={() => navigate("/products")}
                className="w-full mt-6 bg-transparent border border-border text-foreground py-3 font-body text-sm cursor-pointer hover:bg-white/5 transition-colors"
              >
                Continue Shopping
              </button>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}

