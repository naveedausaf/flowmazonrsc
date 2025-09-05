import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/components/PriceTag";
import { Metadata } from "next";
import { cache } from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(
  async (id: string) =>
    await prisma.product.findUnique({
      where: {
        id,
      },
    }),
);

export async function generateMetadata({ params: { id } }: ProductPageProps) {
  const product = await getProduct(id);
  return {
    title: product?.name + " - Flowmazon",
    description: product?.description,
    openGraph: { images: [{ url: product?.imageUrl }] },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={687}
        height={1000}
        className="rounded-lg"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
      </div>
    </div>
  );
}
