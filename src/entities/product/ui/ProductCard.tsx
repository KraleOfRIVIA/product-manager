"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { ProductCardProps } from "../model/types";

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      className="group border rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden bg-white"
      onClick={() => onClick?.(product)}
    >
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      <div className="p-4 flex flex-col justify-between gap-2">
        <h3 className="font-medium text-gray-900 line-clamp-2 min-h-[40px]">
          {product.title}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center text-sm text-yellow-500">
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400 mr-1" />
            {product.rating?.rate?.toFixed(1) ?? "–"}
          </div>
        </div>

        <span className="text-xs text-gray-500">{product.category}</span>
      </div>
    </div>
  );
}
