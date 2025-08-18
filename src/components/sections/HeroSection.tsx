'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 sm:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/background.png')] bg-center opacity-5" />
      
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          {/* Content */}
          <div className="flex flex-col justify-center space-y-4 text-right">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                هيلينا براند
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 ml-auto">
                أزياء محتشمة بلمسة عصرية
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-end">
              <Link href="/products" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                تسوقي الآن
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex items-center justify-center">
            <div className="relative aspect-square overflow-hidden rounded-xl border bg-white p-2 shadow-xl md:p-6 lg:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-rose-50 opacity-50" />
              <Image
                src="/MODEST.JPG"
                alt="Helena Brand Modest Fashion"
                width={600}
                height={600}
                className={cn(
                  "h-full w-full object-cover transition-all",
                  isLoaded ? "scale-100 blur-0" : "scale-105 blur-md"
                )}
                onLoad={() => setIsLoaded(true)}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
