"use client";

import { HeartHandshake, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react";
import { trustItems } from "@/data/trust";

const icons = [HeartHandshake, Users, Sparkles, ShieldCheck, MapPin];

export function TrustBar() {
  return (
    <section aria-label="Diferenciais" className="bg-charcoal text-snow">
      <div className="mx-auto hidden max-w-[1440px] grid-cols-5 divide-x divide-white/10 lg:grid">
        {trustItems.map((item, index) => {
          const Icon = icons[index];
          return (
            <div key={item.id} className="flex items-center gap-3 px-8 py-6">
              <Icon className="size-4 text-blush" aria-hidden />
              <p className="text-[12px] uppercase tracking-[0.18em] text-snow/85">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-0 overflow-x-auto lg:hidden">
        {trustItems.map((item, index) => {
          const Icon = icons[index];
          return (
            <div
              key={item.id}
              className="flex min-w-[78%] snap-start items-center gap-3 border-r border-white/10 px-6 py-5 sm:min-w-[55%]"
            >
              <Icon className="size-4 shrink-0 text-blush" aria-hidden />
              <p className="text-[12px] uppercase tracking-[0.16em] text-snow/90">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
