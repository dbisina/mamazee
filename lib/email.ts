import 'server-only'
import nodemailer from 'nodemailer'

const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = Number(process.env.SMTP_PORT ?? '465')
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const FROM = process.env.SMTP_FROM_EMAIL ?? 'Mamazee <orders@mamazee.com.au>'

const transporter =
  SMTP_HOST && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    : null

interface OrderConfirmationItem {
  name: string
  quantity: number
}

interface OrderConfirmationInput {
  to: string
  customerName: string
  orderId: string
  amountTotal: number
  currency: string
  deliveryMethod: string
  shippingAddress: string
  items: OrderConfirmationItem[]
}

function formatAmount(cents: number, currency: string) {
  return `$${(cents / 100).toFixed(2)} ${currency.toUpperCase()}`
}

export async function sendOrderConfirmationEmail(order: OrderConfirmationInput) {
  if (!transporter) {
    console.warn('[email] SMTP_HOST/SMTP_USER/SMTP_PASS not set — skipping order confirmation email')
    return
  }

  const itemRows = order.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0;color:#0E0D09;">${i.name}</td><td style="padding:6px 0;text-align:right;color:#5C5B54;">×${i.quantity}</td></tr>`
    )
    .join('')

  const html = `
    <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#0E0D09;">
      <h1 style="font-size:1.5rem;font-weight:600;margin:0 0 0.5rem;">Thanks for your order, ${order.customerName}!</h1>
      <p style="color:#5C5B54;font-size:0.9375rem;line-height:1.6;">
        We've received your order <strong>#${order.orderId.slice(-8).toUpperCase()}</strong> and we're getting it ready.
      </p>
      <table style="width:100%;border-collapse:collapse;margin:1.5rem 0;border-top:1px solid #eee;border-bottom:1px solid #eee;">
        ${itemRows}
      </table>
      <p style="font-size:0.9375rem;"><strong>Total:</strong> ${formatAmount(order.amountTotal, order.currency)}</p>
      <p style="font-size:0.9375rem;"><strong>${order.deliveryMethod === 'delivery' ? 'Delivery to' : 'Pickup at'}:</strong> ${order.shippingAddress}</p>
      <p style="color:#5C5B54;font-size:0.8125rem;margin-top:2rem;">— The Mamazee team</p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: FROM,
      to: order.to,
      subject: `Order confirmed — #${order.orderId.slice(-8).toUpperCase()}`,
      html,
    })
  } catch (err) {
    console.error('[email] failed to send order confirmation:', err)
  }
}
