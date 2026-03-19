import type { CartItem } from "@/contexts/CartContext";
import { supabase } from "@/lib/supabase";

export type ShippingDetails = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  city: string;
  address1: string;
  address2?: string;
  notes?: string;
};

export type PaymentMethod = "cod" | "bank_transfer";

export type Order = {
  id: string;
  status: string;
  user_id?: string;
  createdAtIso: string;
  items: CartItem[];
  subtotal: number;
  shippingDetails: ShippingDetails;
  paymentMethod: PaymentMethod;
};

export function createOrderId() {
  const rand = Math.random().toString(16).slice(2, 8).toUpperCase();
  return `AM-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${rand}`;
}

export async function saveOrderAsync(orderData: {
  id: string;
  subtotal: number;
  paymentMethod: PaymentMethod;
  shippingDetails: ShippingDetails;
  items: CartItem[];
  userId?: string;
}) {
  try {
    // 1. Insert the main order record
    const { data: orderResult, error: orderError } = await supabase
      .from("orders")
      .insert({
        id: orderData.id,
        user_id: orderData.userId || null,
        status: "pending",
        subtotal: orderData.subtotal,
        payment_method: orderData.paymentMethod,
        shipping_first_name: orderData.shippingDetails.firstName,
        shipping_last_name: orderData.shippingDetails.lastName,
        shipping_phone: orderData.shippingDetails.phone,
        shipping_email: orderData.shippingDetails.email || null,
        shipping_city: orderData.shippingDetails.city,
        shipping_address1: orderData.shippingDetails.address1,
        shipping_address2: orderData.shippingDetails.address2 || null,
        shipping_notes: orderData.shippingDetails.notes || null,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Insert out all order_items
    const orderItemsPayload = orderData.items.map((item) => ({
      order_id: orderData.id,
      product_id: item.id,
      quantity: item.qty,
      price_at_purchase: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItemsPayload);

    if (itemsError) {
      console.error("Failed to insert order items:", itemsError);
      // Depending on strictness, we could delete the main order or just log the error.
      throw itemsError;
    }

    return orderResult;
  } catch (error) {
    console.error("Order save error:", error);
    throw error;
  }
}

export async function getOrderByIdAsync(id: string): Promise<Order | null> {
  // Fetch order + associated items + product details
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        id,
        quantity,
        price_at_purchase,
        product_id,
        products (
          name,
          image,
          tag
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Failed to fetch order:", error);
    return null;
  }

  // Parse result into our local Order type
  const items: CartItem[] = data.order_items.map((it: any) => ({
    id: it.product_id,
    name: it.products?.name || "Unknown Product",
    price: parseFloat(it.price_at_purchase),
    image: it.products?.image || "",
    tag: it.products?.tag || "",
    qty: it.quantity,
  }));

  return {
    id: data.id,
    user_id: data.user_id,
    status: data.status,
    createdAtIso: data.created_at,
    items,
    subtotal: parseFloat(data.subtotal),
    paymentMethod: data.payment_method as PaymentMethod,
    shippingDetails: {
      firstName: data.shipping_first_name,
      lastName: data.shipping_last_name,
      phone: data.shipping_phone,
      email: data.shipping_email,
      city: data.shipping_city,
      address1: data.shipping_address1,
      address2: data.shipping_address2,
      notes: data.shipping_notes,
    },
  };
}

export function formatOrderForWhatsapp(order: Order) {
  const lines = [
    `Assalam-o-Alaikum, I want to place an order.`,
    ``,
    `Order ID: ${order.id}`,
    `Payment: ${order.paymentMethod === "cod" ? "Cash on Delivery" : "Bank Transfer"}`,
    ``,
    `Items:`,
    ...order.items.map(
      (it) => `- ${it.name} (${it.tag}) x${it.qty} — PKR ${(it.price * it.qty).toLocaleString()}`,
    ),
    ``,
    `Subtotal: PKR ${order.subtotal.toLocaleString()}`,
    ``,
    `Ship to:`,
    `${order.shippingDetails.firstName} ${order.shippingDetails.lastName}`,
    `${order.shippingDetails.phone}${order.shippingDetails.email ? ` · ${order.shippingDetails.email}` : ""}`,
    `${order.shippingDetails.address1}${order.shippingDetails.address2 ? `, ${order.shippingDetails.address2}` : ""}`,
    `${order.shippingDetails.city}`,
    order.shippingDetails.notes ? `` : undefined,
    order.shippingDetails.notes ? `Notes: ${order.shippingDetails.notes}` : undefined,
  ].filter(Boolean) as string[];

  return lines.join("\n");
}
