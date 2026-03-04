import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

export const getStripeSession = async ({
  priceId,
  domainUrl,
  customerId,
}: {
  priceId: string;
  domainUrl: string;
  customerId: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "payment",
    billing_address_collection: "auto",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${domainUrl}/portal?success=true`,
    cancel_url: `${domainUrl}/portal?canceled=true`,
    payment_intent_data: {
      metadata: {
        customerId,
      },
    },
  });
  return session;
};

export const createPaymentIntent = async ({
  amount,
  currency = "cad",
  metadata = {},
}: {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
}) => {
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
    metadata,
    automatic_payment_methods: {
      enabled: true,
    },
  });
};

export const createCustomer = async ({
  email,
  name,
  phone,
}: {
  email: string;
  name: string;
  phone?: string;
}) => {
  return await stripe.customers.create({
    email,
    name,
    phone,
  });
};

export const retrievePaymentIntent = async (paymentIntentId: string) => {
  return await stripe.paymentIntents.retrieve(paymentIntentId);
};

export const constructEvent = async (
  payload: string | Buffer,
  signature: string,
  secret: string
) => {
  return stripe.webhooks.constructEvent(payload, signature, secret);
};
