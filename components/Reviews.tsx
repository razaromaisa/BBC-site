"use client";

import { useRef } from "react";
import { REVIEWS } from "@/lib/data";
import { StarIcon } from "./Icons";

export default function Reviews() {
  const track = useRef<HTMLDivElement>(null);
  // Hidden until real customer reviews are added in lib/data.ts
  if (REVIEWS.length === 0) return null;
  const scroll = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".rev");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 20), behavior: "smooth" });
  };

  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="sec-head">
          <div>
            <p className="eyebrow">Customer reviews</p>
            <h2>Trusted by families &amp; businesses</h2>
          </div>
          <div className="rev-nav">
            <button className="icon-btn round" onClick={() => scroll(-1)} aria-label="Previous reviews">
              <svg viewBox="0 0 24 24"><path d="m15 6-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
            <button className="icon-btn round" onClick={() => scroll(1)} aria-label="Next reviews">
              <svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>

        <div className="rev-track" ref={track}>
          {REVIEWS.map((r, i) => (
            <figure className="rev" key={i}>
              <div className="stars" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, s) => <span key={s} className={s < r.rating ? "on" : ""}><StarIcon /></span>)}
              </div>
              <blockquote>“{r.text}”</blockquote>
              <figcaption>
                <span className="avatar">{r.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>
                <span><strong>{r.name}</strong><small>{r.city} · {r.item}</small></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
