import { testimonials } from "@/data/content";
import { ResultAvatar } from "./ResultAvatar";

export function TestimonialsSection() {
  return (
    <section
      className="testi-section"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <div className="reveal" id="testiHeader" style={{ textAlign: "center" }}>
          <p className="section-tag" style={{ justifyContent: "center" }}>
            What Clients Say
          </p>
          <h2 className="section-title" id="testimonials-heading">
            Real Words,
            <br />
            <span className="outline">Real People</span>
          </h2>
        </div>
        <div className="testi-grid reveal" id="testiGrid">
          {testimonials.map((t) => (
            <article key={t.name} className="testi-card">
              <div className="testi-mark" aria-hidden>
                &ldquo;
              </div>
              <blockquote className="testi-text">&ldquo;{t.quote}&rdquo;</blockquote>
              <footer className="testi-footer">
                <ResultAvatar
                  src={t.image}
                  alt={`${t.name} — client testimonial`}
                  initials={t.initials}
                />
                <div>
                  <cite className="testi-name">{t.name}</cite>
                  <p className="testi-info">{t.location}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
