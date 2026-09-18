import type { MetadataRoute } from "next";
import { collections } from "@/data/collections";
import { looks } from "@/data/looks";
import { products } from "@/data/products";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date("2026-09-17");

  const staticRoutes = ["", "/colecoes", "/novidades", "/looks", "/sobre", "/loja", "/contato", "/carrinho", "/checkout", "/ajuda"].map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((item) => ({
    url: `${base}/produto/${item.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const lookRoutes = looks.map((item) => ({
    url: `${base}/looks/${item.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const categoryRoutes = collections.map((item) => ({
    url: `${base}/categoria/${item.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...lookRoutes, ...categoryRoutes];
}
