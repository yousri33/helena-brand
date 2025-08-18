"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import { Menu, Search, Phone } from "lucide-react";

const routes = [
  {
    href: "/",
    label: "Home",
    active: true,
  },
  {
    href: "/products",
    label: "Products",
    active: false,
  },
  {
    href: "/category",
    label: "Category",
    active: false,
  },
  {
    href: "/contact",
    label: "Contact",
    active: false,
  },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b">
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 md:hidden w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {routes.map((route, i) => (
                  <Link
                    key={i}
                    href={route.href}
                    className={cn(
                      "block px-2 py-1 text-lg",
                      route.active ? "text-black" : "text-gray-500"
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="ml-4 lg:ml-0">
            <h1 className="text-xl font-bold">HELENA</h1>
          </Link>
        </div>
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
          {routes.map((route, i) => (
            <Button asChild variant="ghost" key={i}>
              <Link
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === route.href
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            aria-label="Contact"
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <Icons.cart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
