import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import productsData from "@/data/products.json";

export async function GET(request: NextRequest) {
  const _metricsStart = Date.now();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const collection = searchParams.get("collection");
  const id = searchParams.get("id");

  let products = productsData.products;

  // Filter by single product ID
  if (id) {
    const product = products.find((p) => p.id === id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    Sentry.metrics.count("api.requests", 1, { attributes: { endpoint: "/api/products", method: "GET", status: "200" } });
    Sentry.metrics.distribution("api.latency_ms", Date.now() - _metricsStart, { attributes: { endpoint: "/api/products" } });
    return NextResponse.json({ product });
  }

  // Filter by category
  if (category) {
    products = products.filter((p) => p.category === category);
  }

  // Filter by status
  if (status) {
    products = products.filter((p) => p.status === status);
  }

  // Filter by collection
  if (collection) {
    products = products.filter((p) => p.collection === collection);
  }

  Sentry.metrics.count("api.requests", 1, { attributes: { endpoint: "/api/products", method: "GET", status: "200" } });
  Sentry.metrics.distribution("api.latency_ms", Date.now() - _metricsStart, { attributes: { endpoint: "/api/products" } });
  return NextResponse.json({
    products,
    total: products.length,
    stats: productsData.stats,
    version: productsData.version,
  });
}
