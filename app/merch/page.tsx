"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import BackHomeButton from "@/app/components/BackHomeButton";

type MerchItem = {
  name: string;
  description: string;
  price: string;
  priceValue: number;
  image: string;
};

type CartItem = MerchItem & { qty: number };

const merchItems: MerchItem[] = [
  {
    name: "Designer Enzo Raincoat",
    description: "So you can not only stay dry while on walks, but be stylish too.",
    price: "$24.99",
    priceValue: 24.99,
    image: "/images/merch/raincoat.jpg",
  },
  {
    name: "Stick",
    description: "Enzo's #1 rated toy.",
    price: "$9.99",
    priceValue: 9.99,
    image: "/images/merch/stick.jpg",
  },
  {
    name: "Enzo Plushie",
    description: "Cuddly plush version of Enzo himself.",
    price: "$14.99",
    priceValue: 14.99,
    image: "/images/merch/plushie.jpg",
  },
  {
    name: "Pawtographed Poster",
    description: "Signed photo of Enzo looking majestic.",
    price: "$99.99",
    priceValue: 99.99,
    image: "/images/merch/enzoSigned.jpg",
  },
  {
    name: "Enzo Signature Scent™",
    description: "Notes of grass, dirt, and victory.",
    price: "$49.99",
    priceValue: 49.99,
    image: "/images/merch/perfumee.jpg",
  },
  {
    name: "Tennis Ball 3-Pack",
    description: "Squeaks. Comforts. Disappears.",
    price: "$9.99",
    priceValue: 9.99,
    image: "/images/merch/tennis.jpg",
  },
];

function safeJsonParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export default function MerchPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [modalItem, setModalItem] = useState<MerchItem | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // ✅ animation state
  const [justAdded, setJustAdded] = useState<Record<string, boolean>>({});
  const [cartPulse, setCartPulse] = useState(false);

  // Load localStorage after mount (avoids SSR/hydration issues)
  useEffect(() => {
    setCart(safeJsonParse<CartItem[]>(localStorage.getItem("cart"), []));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalItem(null);
    };
    if (modalItem) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalItem]);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return merchItems;
    return merchItems.filter((item) => item.name.toLowerCase().includes(q));
  }, [search]);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.priceValue * item.qty, 0),
    [cart]
  );

  const addToCart = (item: MerchItem) => {
    const qty = Math.max(1, quantities[item.name] || 1);

    setCart((prev) => {
      const existing = prev.find((x) => x.name === item.name);
      if (existing) {
        return prev.map((x) => (x.name === item.name ? { ...x, qty: x.qty + qty } : x));
      }
      return [...prev, { ...item, qty }];
    });

    // reset qty input
    setQuantities((prev) => ({ ...prev, [item.name]: 1 }));

    // ✅ button "Added" feedback
    setJustAdded((prev) => ({ ...prev, [item.name]: true }));
    window.setTimeout(() => {
      setJustAdded((prev) => ({ ...prev, [item.name]: false }));
    }, 900);

    // ✅ cart pulse highlight
    setCartPulse(true);
    window.setTimeout(() => setCartPulse(false), 450);
  };

  const updateCartQty = (itemName: string, newQty: number) => {
    const qty = Number.isFinite(newQty) ? newQty : 1;
    setCart((prev) =>
      prev
        .map((item) => (item.name === itemName ? { ...item, qty } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (itemName: string) => {
    setCart((prev) => prev.filter((item) => item.name !== itemName));
  };

  const clearCart = () => setCart([]);

  const fakeCheckout = () => {
    alert("Checkout is closed. Enzo ate the payment processor. 🐶💳");
  };

  return (
    <main className="space-y-8">
      <BackHomeButton />

      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Merch <span className="text-secondary">🛍️</span>
        </h1>
        <p className="text-foreground/70">
          Not a real store. Just vibes. (Enzo accepts payment in head pats.)
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search merch..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-(--primary)/40 sm:max-w-sm"
        />

        <div className="text-sm text-foreground/70">
          Showing <span className="font-semibold">{filteredItems.length}</span> item(s)
        </div>
      </div>

      {/* Items grid */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => {
          const qty = quantities[item.name] || 1;
          const added = !!justAdded[item.name];

          return (
            <div
              key={item.name}
              className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-(--shadow)"
            >
              <button
                type="button"
                className="relative aspect-square w-full"
                onClick={() => setModalItem(item)}
                title="View"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </button>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-sm text-foreground/70">{item.description}</p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3">
                  <span className="text-base font-extrabold">{item.price}</span>

                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) =>
                      setQuantities((prev) => ({
                        ...prev,
                        [item.name]: Math.max(1, parseInt(e.target.value || "1", 10)),
                      }))
                    }
                    className="w-16 rounded-full border border-border bg-background px-3 py-2 text-sm"
                  />

                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className={[
                      "rounded-full px-4 py-2 text-sm font-semibold text-white transition",
                      "active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-(--primary)/35",
                      added ? "bg-emerald-600 scale-[1.03]" : "bg-secondary hover:brightness-95",
                    ].join(" ")}
                  >
                    {added ? "Added ✓" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Cart */}
      <section
        className={[
          "rounded-3xl border border-border bg-card p-6 shadow-(--shadow) transition",
          cartPulse ? "ring-2 ring-(--primary)/35 scale-[1.01]" : "",
        ].join(" ")}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold">Cart</h2>

          <div className="flex items-center gap-3">
            <span className="text-sm text-foreground/70">{cart.length} item type(s)</span>

            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {cart.length === 0 ? (
          <p className="mt-4 text-foreground/60">Your cart is empty. Enzo is disappointed.</p>
        ) : (
          <div className="mt-5 space-y-4">
            {cart.map((item) => (
              <div
                key={item.name}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold">{item.name}</p>
                  <p className="text-sm text-foreground/60">
                    ${item.priceValue.toFixed(2)} each
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    value={item.qty}
                    onChange={(e) =>
                      updateCartQty(item.name, parseInt(e.target.value || "0", 10))
                    }
                    className="w-20 rounded-full border border-border bg-background px-3 py-2 text-sm"
                  />

                  <span className="w-24 text-right font-semibold">
                    ${(item.qty * item.priceValue).toFixed(2)}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.name)}
                    className="rounded-full border border-border bg-background px-3 py-2 text-sm"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-border pt-4">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-extrabold">${total.toFixed(2)}</p>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={fakeCheckout}
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-foreground transition hover:brightness-95 active:scale-[0.99]"
              >
                Checkout (fake)
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Modal */}
      {modalItem && (
        <div
          className="fixed inset-0 z-999 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
          onClick={() => setModalItem(null)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card shadow-(--shadow)"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square">
              <Image
                src={modalItem.image}
                alt={modalItem.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 640px"
              />
            </div>

            <div className="space-y-3 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold">{modalItem.name}</h3>
                  <p className="mt-1 text-foreground/70">{modalItem.description}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setModalItem(null)}
                  className="rounded-full border border-border bg-background px-3 py-2 text-sm"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-lg font-extrabold">{modalItem.price}</p>
                <span className="rounded-full bg-(--primary)/25 px-3 py-1 text-xs font-medium">
                  totally real pricing
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
