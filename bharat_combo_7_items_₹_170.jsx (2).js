import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, IndianRupee, ShieldCheck, Truck, BadgeCheck, MapPin } from "lucide-react";

function useRoute() {
  const [route, setRoute] = useState(() => (typeof window !== 'undefined' ? window.location.hash.replace('#', '') || '/' : '/'));
  React.useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  const navigate = (path) => {
    if (typeof window !== 'undefined') window.location.hash = path;
  };
  return { route, navigate };
}

const Chakra = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12">
    <circle cx="50" cy="50" r="46" fill="none" stroke="#0F62FE" strokeWidth="6" />
    {[...Array(24)].map((_, i) => (
      <line key={i} x1="50" y1="50" x2={50 + 42 * Math.cos((i * 15 * Math.PI) / 180)} y2={50 + 42 * Math.sin((i * 15 * Math.PI) / 180)} stroke="#0F62FE" strokeWidth="3" />
    ))}
  </svg>
);

const Stat = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 bg-white/70 backdrop-blur rounded-2xl px-4 py-3 shadow-sm border">
    <Icon className="w-5 h-5" />
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  </div>
);

const ReviewCard = ({ name, text }) => (
  <motion.div whileHover={{ y: -2 }} className="rounded-2xl p-4 bg-white shadow-sm border">
    <div className="flex items-center gap-1 text-yellow-500 mb-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-current" />
      ))}
    </div>
    <p className="text-gray-800 leading-relaxed text-sm">“{text}”</p>
    <div className="mt-2 text-xs text-gray-500">— {name}</div>
  </motion.div>
);

const PizzaImage = () => (
  <img
    src="https://images.unsplash.com/photo-1548365328-9f547fb0952e?q=80&w=1200&auto=format&fit=crop"
    alt="Fresh pizzas"
    className="w-full h-44 md:h-56 object-cover rounded-2xl shadow-md"
    loading="lazy"
  />
);

const DrinkImage = () => (
  <img
    src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200&auto=format&fit=crop"
    alt="Chilled drink"
    className="w-full h-44 md:h-56 object-cover rounded-2xl shadow-md"
    loading="lazy"
  />
);

function Landing({ onCheckPincode, navigate }) {
  const [pin, setPin] = useState("");
  const price = 170;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FF671F]/10 via-white to-[#046A38]/10">
      <header className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Chakra />
          <div className="leading-tight">
            <div className="font-extrabold tracking-wide text-lg md:text-xl">BHARAT</div>
            <div className="text-xs text-gray-600">Cool • Trusted • Indian Vibe</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Stat icon={ShieldCheck} label="Trust" value="Verified Reviews" />
          <Stat icon={BadgeCheck} label="COD" value="Available — Lifetime" />
          <Stat icon={Truck} label="Delivery" value="All India*" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-6 md:gap-8 items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-white border px-3 py-1 rounded-full text-xs mb-3 shadow-sm">
              <Check className="w-4 h-4" /> <span>COD Available — Lifetime</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight">
              7 Items <span className="inline-flex items-center gap-1"> <IndianRupee className="w-7 h-7" />{price}</span> Only
            </h1>
            <p className="mt-3 text-gray-700">
              Pizzas & Drink combo — best value with cool, trusted, and Indian vibe. 100000+ Happy Customers.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <PizzaImage />
              <DrinkImage />
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <ReviewCard name="Aarav (Surat)" text="Taste on point aur delivery fast. Paisa vasool!" />
              <ReviewCard name="Ishita (Mumbai)" text="₹170 me 7 items — full family happy." />
              <ReviewCard name="Rohan (Delhi)" text="COD se trust ho gaya. Recommended!" />
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur p-5 md:p-6 rounded-3xl border shadow-md">
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">Check Delivery Availability</span>
            </div>
            <label className="text-sm text-gray-500">Enter your PIN code</label>
            <div className="mt-2 flex gap-2">
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="e.g. 395003"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0,6))}
                className="flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#046A38]/50"
              />
              <button
                onClick={() => {
                  const valid = pin.length === 6;
                  onCheckPincode(pin, valid);
                  navigate('/order');
                }}
                className="px-5 py-3 rounded-xl bg-[#046A38] text-white font-semibold shadow hover:shadow-lg active:scale-[.98]"
              >
                Check
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">We deliver across India. Serviceability depends on your area.*</p>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border p-3">
                <div className="text-lg font-bold">100000+</div>
                <div className="text-xs text-gray-500">Happy Customers</div>
              </div>
              <div className="rounded-xl border p-3">
                <div className="text-lg font-bold">4.9/5</div>
                <div className="text-xs text-gray-500">Average Rating</div>
              </div>
              <div className="rounded-xl border p-3">
                <div className="text-lg font-bold">COD</div>
                <div className="text-xs text-gray-500">Lifetime Available</div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="max-w-5xl mx-auto px-4 pb-10 text-xs text-gray-500">
        © {new Date().getFullYear()} Bharat Foods. All rights reserved.
      </footer>
    </div>
  );
}

function OrderPage({ pin }) {
  const message = useMemo(() => {
    const base = `Namaste! Mujhe 7 items ₹170 combo order karna hai. PIN: ${pin || 'N/A'}.`; 
    return encodeURIComponent(base + " Please confirm COD & delivery time.");
  }, [pin]);

  const waLink = `https://wa.me/919023595325?text=${message}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#0F62FE]/5 to-[#046A38]/10">
      <header className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Chakra />
          <div className="leading-tight">
            <div className="font-extrabold tracking-wide text-lg md:text-xl">BHARAT</div>
            <div className="text-xs text-gray-600">Cool • Trusted • Indian Vibe</div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-16">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border shadow p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-black">Order Now</h2>
          <p className="text-gray-700 mt-2">Combo: <b>7 Items</b> — <b>₹170</b> Only</p>

          <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-gray-700">
            <li className="flex items-center gap-2"><Check className="w-4 h-4"/>Freshly baked pizzas</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4"/>Chilled drink included</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4"/>Cash on Delivery — Lifetime</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4"/>All-India shipping</li>
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <PizzaImage />
            <DrinkImage />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#25D366] text-white font-semibold shadow hover:shadow-lg active:scale-[.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5" aria-hidden>
                <path d="M19.11 17.54c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.12-.41-2.13-1.31-.79-.7-1.33-1.56-1.49-1.82-.16-.27-.02-.41.12-.54.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.52-.44-.45-.61-.45-.16 0-.34-.02-.52-.02-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.34.98 2.64 1.12 2.82.14.18 1.93 2.94 4.67 4.12.65.28 1.16.45 1.56.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" fill="currentColor"/>
                <path d="M16.03 3C9.93 3 4.98 7.95 4.98 14.05c0 2.25.74 4.33 1.99 6.02L6 29l8.72-2.86c1.45.47 3 .73 4.61.73 6.1 0 11.05-4.95 11.05-11.05S22.13 3 16.03 3zm0 19.75c-1.53 0-2.95-.37-4.21-1.03l-.3-.16-5 .16 1.64-4.83-.18-.31a8.48 8.48 0 01-1.31-4.62c0-4.7 3.83-8.53 8.53-8.53s8.53 3.83 8.53 8.53-3.83 8.53-8.53 8.53z" fill="currentColor"/>
              </svg>
              WhatsApp Order
            </a>

            <div className="text-xs text-gray-500 sm:w-60">
              Clicking “WhatsApp Order” opens your WhatsApp with a pre‑filled message.
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-500">* Delivery depends on local serviceability. COD always available where delivery is supported.</div>
        </motion.div>
      </main>
    </div>
  );
}

export default function App() {
  const { route, navigate } = useRoute();
  const [checkedPin, setCheckedPin] = useState(null);

  return (
    <div className="font-[Inter]">
      {route === '/order' ? (
        <OrderPage pin={checkedPin?.pin} />
      ) : (
        <Landing
          navigate={navigate}
          onCheckPincode={(pin, valid) => setCheckedPin({ pin, valid })}
        />
      )}

      <div className="fixed bottom-4 inset-x-0 px-4 md:px-0 flex justify-center">
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur border rounded-full px-4 py-2 shadow-md">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-sm">100000+ Happy Customers • Trusted • Indian Vibe</span>
        </div>
      </div>
    </div>
  );
}
