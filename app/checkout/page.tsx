"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import { useIsMobile } from "@/hooks/useBreakpoint";

const SHIPPING_COST = 25;

type Method = "delivery" | "pickup";

interface AddressForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [method, setMethod] = useState<Method>("delivery");
  const [form, setForm] = useState<AddressForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    suburb: "",
    state: "VIC",
    postcode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (items.length === 0) router.replace("/shop");
  }, [items, router]);

  // Suppress unused clearCart lint — cart is cleared on success page
  void clearCart;

  const shipping = method === "delivery" ? SHIPPING_COST : 0;
  const orderTotal = total + shipping;

  const addressComplete =
    method === "pickup" ||
    (form.firstName &&
      form.lastName &&
      form.email &&
      form.address &&
      form.suburb &&
      form.postcode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressComplete) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          method,
          address: method === "delivery" ? form : null,
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      if (!data.url) throw new Error("No redirect URL from payment provider");
      window.location.href = data.url;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1rem",
    border: "1px solid rgba(14,13,9,0.15)",
    borderRadius: "0.5rem",
    fontSize: "0.9375rem",
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    background: "#fff",
    color: "#0E0D09",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ background: "#F8F4EE", minHeight: "100vh" }}>
      <Nav />
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding:
            "clamp(7rem,12vw,9rem) clamp(1.5rem,4vw,4rem) 5rem",
        }}
      >
        <Link
          href="/shop"
          style={{
            fontSize: "0.8125rem",
            color: "#5C5B54",
            textDecoration: "none",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: "var(--font-inter),system-ui,sans-serif",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "2.5rem",
          }}
        >
          ← Continue Shopping
        </Link>

        <h1
          style={{
            fontFamily: "var(--font-cormorant),Georgia,serif",
            fontSize: "clamp(2.5rem,6vw,4rem)",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            color: "#0E0D09",
            margin: "0 0 3rem",
            lineHeight: 0.95,
          }}
        >
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr min(380px,100%)",
              gap: isMobile ? "2rem" : "3rem",
              alignItems: "start",
            }}
          >
            {/* Left — delivery method + address */}
            <div>
              {/* Delivery method */}
              <div style={{ marginBottom: "2.5rem" }}>
                <p
                  style={{
                    fontSize: "0.625rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#C4813A",
                    marginBottom: "1.25rem",
                    fontFamily:
                      "var(--font-inter),system-ui,sans-serif",
                    fontWeight: 500,
                  }}
                >
                  Delivery Method
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.875rem",
                  }}
                >
                  {(
                    [
                      {
                        id: "delivery" as Method,
                        label: "Delivery",
                        sub: "$25 flat rate · AU-wide",
                        icon: "📦",
                      },
                      {
                        id: "pickup" as Method,
                        label: "Local Pickup",
                        sub: "Free · Fraser Rise VIC",
                        icon: "🏪",
                      },
                    ] as {
                      id: Method;
                      label: string;
                      sub: string;
                      icon: string;
                    }[]
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setMethod(opt.id)}
                      style={{
                        padding: "1.25rem",
                        border: `2px solid ${
                          method === opt.id
                            ? "#2D5A16"
                            : "rgba(14,13,9,0.12)"
                        }`,
                        borderRadius: "0.875rem",
                        background:
                          method === opt.id
                            ? "rgba(45,90,22,0.06)"
                            : "#fff",
                        cursor: "pointer",
                        textAlign: "left",
                        transition:
                          "border-color 0.2s, background 0.2s",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.25rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {opt.icon}
                      </div>
                      <div
                        style={{
                          fontSize: "0.9375rem",
                          fontWeight: 600,
                          color: "#0E0D09",
                          fontFamily:
                            "var(--font-inter),system-ui,sans-serif",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {opt.label}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8125rem",
                          color: "#5C5B54",
                          fontFamily:
                            "var(--font-inter),system-ui,sans-serif",
                        }}
                      >
                        {opt.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pickup info banner */}
              {method === "pickup" && (
                <div
                  style={{
                    padding: "1.5rem",
                    background: "rgba(45,90,22,0.06)",
                    borderRadius: "0.875rem",
                    borderLeft: "3px solid #2D5A16",
                    marginBottom: "2rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#1A3A0A",
                      fontFamily:
                        "var(--font-inter),system-ui,sans-serif",
                      marginBottom: "0.375rem",
                    }}
                  >
                    Pickup Location
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#5C5B54",
                      fontFamily:
                        "var(--font-inter),system-ui,sans-serif",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    8 Climate St, Fraser Rise VIC 3336
                    <br />
                    Tue – Sun · 10:00 AM – 7:00 PM
                    <br />
                    +61 468 324 309
                  </p>
                </div>
              )}

              {/* Delivery address form */}
              {method === "delivery" && (
                <div>
                  <p
                    style={{
                      fontSize: "0.625rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#C4813A",
                      marginBottom: "1.25rem",
                      fontFamily:
                        "var(--font-inter),system-ui,sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Delivery Address
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                      gap: "0.875rem",
                    }}
                  >
                    <input
                      style={inputStyle}
                      placeholder="First name"
                      required
                      value={form.firstName}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          firstName: e.target.value,
                        }))
                      }
                    />
                    <input
                      style={inputStyle}
                      placeholder="Last name"
                      required
                      value={form.lastName}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          lastName: e.target.value,
                        }))
                      }
                    />
                    <input
                      suppressHydrationWarning
                      style={{
                        ...inputStyle,
                        gridColumn: isMobile ? "1" : "1/-1",
                      }}
                      type="email"
                      placeholder="Email address"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          email: e.target.value,
                        }))
                      }
                    />
                    <input
                      style={{
                        ...inputStyle,
                        gridColumn: isMobile ? "1" : "1/-1",
                      }}
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          phone: e.target.value,
                        }))
                      }
                    />
                    <input
                      style={{
                        ...inputStyle,
                        gridColumn: isMobile ? "1" : "1/-1",
                      }}
                      placeholder="Street address"
                      required
                      value={form.address}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          address: e.target.value,
                        }))
                      }
                    />
                    <input
                      style={inputStyle}
                      placeholder="Suburb"
                      required
                      value={form.suburb}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          suburb: e.target.value,
                        }))
                      }
                    />
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0.875rem",
                      }}
                    >
                      <select
                        style={{ ...inputStyle, cursor: "pointer" }}
                        value={form.state}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            state: e.target.value,
                          }))
                        }
                      >
                        {[
                          "ACT",
                          "NSW",
                          "NT",
                          "QLD",
                          "SA",
                          "TAS",
                          "VIC",
                          "WA",
                        ].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                      <input
                        style={inputStyle}
                        placeholder="Postcode"
                        required
                        maxLength={4}
                        value={form.postcode}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            postcode: e.target.value.replace(
                              /\D/g,
                              ""
                            ),
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Contact details for pickup */}
              {method === "pickup" && (
                <div>
                  <p
                    style={{
                      fontSize: "0.625rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#C4813A",
                      marginBottom: "1.25rem",
                      fontFamily:
                        "var(--font-inter),system-ui,sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Contact Details
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                      gap: "0.875rem",
                    }}
                  >
                    <input
                      style={inputStyle}
                      placeholder="First name"
                      required
                      value={form.firstName}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          firstName: e.target.value,
                        }))
                      }
                    />
                    <input
                      style={inputStyle}
                      placeholder="Last name"
                      required
                      value={form.lastName}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          lastName: e.target.value,
                        }))
                      }
                    />
                    <input
                      suppressHydrationWarning
                      style={{
                        ...inputStyle,
                        gridColumn: isMobile ? "1" : "1/-1",
                      }}
                      type="email"
                      placeholder="Email address"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          email: e.target.value,
                        }))
                      }
                    />
                    <input
                      style={{
                        ...inputStyle,
                        gridColumn: isMobile ? "1" : "1/-1",
                      }}
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right — order summary */}
            <div
              style={{
                background: "#fff",
                borderRadius: "1.25rem",
                padding: "2rem",
                border: "1px solid rgba(14,13,9,0.08)",
                position: isMobile ? "static" : "sticky",
                top: "100px",
              }}
            >
              <p
                style={{
                  fontSize: "0.625rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#C4813A",
                  marginBottom: "1.5rem",
                  fontFamily: "var(--font-inter),system-ui,sans-serif",
                  fontWeight: 500,
                }}
              >
                Order Summary
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          fontFamily:
                            "var(--font-inter),system-ui,sans-serif",
                          color: "#0E0D09",
                          margin: 0,
                          fontWeight: 500,
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "#A0A097",
                          margin: "0.125rem 0 0",
                          fontFamily:
                            "var(--font-inter),system-ui,sans-serif",
                        }}
                      >
                        {item.unit} × {item.quantity}
                      </p>
                    </div>
                    <span
                      style={{
                        fontFamily:
                          "var(--font-cormorant),Georgia,serif",
                        fontSize: "1.125rem",
                        fontWeight: 500,
                        color: "#0E0D09",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(14,13,9,0.08)",
                  paddingTop: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.625rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "#5C5B54",
                      fontFamily:
                        "var(--font-inter),system-ui,sans-serif",
                    }}
                  >
                    Subtotal
                  </span>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "#0E0D09",
                      fontFamily:
                        "var(--font-inter),system-ui,sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "#5C5B54",
                      fontFamily:
                        "var(--font-inter),system-ui,sans-serif",
                    }}
                  >
                    {method === "delivery"
                      ? "Shipping (AU-wide)"
                      : "Local Pickup"}
                  </span>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color:
                        method === "pickup" ? "#2D5A16" : "#0E0D09",
                      fontFamily:
                        "var(--font-inter),system-ui,sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {method === "delivery"
                      ? `$${SHIPPING_COST.toFixed(2)}`
                      : "Free"}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "0.625rem",
                    borderTop: "1px solid rgba(14,13,9,0.08)",
                    marginTop: "0.25rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#0E0D09",
                      fontFamily:
                        "var(--font-inter),system-ui,sans-serif",
                    }}
                  >
                    Total
                  </span>
                  <span
                    style={{
                      fontFamily:
                        "var(--font-cormorant),Georgia,serif",
                      fontSize: "1.75rem",
                      fontWeight: 500,
                      color: "#2D5A16",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    ${orderTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {error && (
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "#c0392b",
                    fontFamily:
                      "var(--font-inter),system-ui,sans-serif",
                    marginBottom: "1rem",
                    padding: "0.75rem",
                    background: "rgba(192,57,43,0.08)",
                    borderRadius: "0.5rem",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={
                  loading || !addressComplete || items.length === 0
                }
                style={{
                  width: "100%",
                  padding: "1.125rem",
                  background: loading ? "#5C5B54" : "#0E0D09",
                  color: "#F8F4EE",
                  border: "none",
                  borderRadius: "100px",
                  fontSize: "0.875rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-inter),system-ui,sans-serif",
                  transition: "background 0.2s",
                }}
              >
                {loading
                  ? "Redirecting to payment…"
                  : `Pay $${orderTotal.toFixed(2)} securely`}
              </button>

              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#A0A097",
                  fontFamily: "var(--font-inter),system-ui,sans-serif",
                  textAlign: "center",
                  marginTop: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.375rem",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                Secured by Stripe
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
