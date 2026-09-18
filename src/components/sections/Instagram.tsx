import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { instagramPosts } from "@/data/instagram";
import { site } from "@/data/site";

export function Instagram() {
  return (
    <section className="marble py-16 lg:py-32" aria-labelledby="instagram-title">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 id="instagram-title" className="font-display text-4xl font-light tracking-tight text-ink lg:text-6xl">
              {site.copy.instagramTitle}
            </h2>
            <p className="mt-3 text-[13px] uppercase tracking-[0.28em] text-stone">{site.social.instagram.handle}</p>
          </div>
          <Button href={site.social.instagram.href} variant="outline" external>
            {site.copy.instagramCta}
          </Button>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-2 sm:mt-14 sm:gap-3 md:grid-cols-3 lg:gap-5">
          {instagramPosts.map((post, index) => (
            <Reveal key={post.src} delay={index * 0.04}>
              <a
                href={site.social.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[3/4] overflow-hidden bg-sand"
                aria-label={`${post.alt} — abrir Instagram`}
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
