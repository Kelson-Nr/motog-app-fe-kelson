'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ILisiting {
  vehicle_type: string;
  reg_no: string;
  kilometers_driven: number;
  price: number;
  usr_inp_city: string;
  city: string;
  seller_phone: string;
  description: string;
  id: number;
  user_id: number;
  is_active: boolean;
  created_at: string;
  owner_email: string;
  rc_details: string;
  images: string[];
}

export default function Home() {
  const { data } = useQuery<ILisiting[]>({
    queryKey: ["listings"],
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings`),
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind sm breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white z-40 shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4 py-3 sm:py-4">
          <Link href="/">
            <span className="text-xl font-bold text-blue-600">MotoG</span>
          </Link>
          {!isMobile && (
            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/sell" className="hover:text-blue-600">Sell</Link>
              <Link href="/inventory" className="hover:text-blue-600">Buy</Link>
              <Link href="/about" className="hover:text-blue-600">About</Link>
              <Link href="/tips" className="hover:text-blue-600">Tips & Advice</Link>
              <Link href="/login" className="hover:text-blue-600">Login</Link>
              <Link href="/signup" className="hover:text-blue-600">Signup</Link>
            </nav>
          )}
          {isMobile && (
            <button
              onClick={toggleMobileMenu}
              className="text-white bg-blue-600 font-bold px-3 py-1 rounded-md text-lg"
            >
              {mobileMenuOpen ? 'X' : 'M'}
            </button>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && isMobile && (
        <div className="fixed top-16 left-0 w-full bg-white z-30 shadow-md border-t border-gray-200 px-6 py-6 space-y-4 text-center">
          <Link href="/sell" className="block text-lg font-medium text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>Sell Car</Link>
          <Link href="/inventory" className="block text-lg font-medium text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>Buy Car</Link>
          <Link href="/about" className="block text-lg font-medium text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>About</Link>
          <Link href="/tips" className="block text-lg font-medium text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>Tips & Advices</Link>
          <Link href="/login" className="block text-lg font-medium text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>Login</Link>
          <Link href="/signup" className="block text-lg font-medium text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>Signup</Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 relative w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        <Image
          src="/images/hero-background.png"
          alt="Car marketplace backdrop"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />

        <div className="relative z-20 container mx-auto px-4 flex items-center sm:flex-row sm:gap-8 sm:justify-start sm:h-full sm:pl-8 sm:pr-4 flex-col">
          <Card className="max-w-md bg-white/90 backdrop-blur-sm border-0 shadow-lg sm:mb-0 mb-6">
            <CardContent className="p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                SELL NOW @ EASE
              </h1>
              <p className="text-base sm:text-lg text-gray-700 mb-6 font-medium">
                Free Listing & Buying for Lifetime
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-4 text-base font-bold"
                  asChild
                >
                  <Link href="/sell">List Your Vehicle</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white hover:bg-gray-50 text-gray-900 py-4 text-base font-bold border-gray-300"
                  asChild
                >
                  <Link href="/inventory">Browse Inventory</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="absolute bottom-4 right-4 w-32 sm:w-40 md:w-56 lg:w-64">
          <Image
            src="/images/featured-car.png"
            alt="Featured car"
            width={300}
            height={200}
            className="object-contain"
          />
        </div>
      </section>

      {/* Listings */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Featured Vehicles</h2>
          <p className="text-muted-foreground text-base">Latest listings this week</p>
        </div>

        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((car) => (
              <Card
                key={car.id}
                className="hover:shadow-xl transition-all overflow-hidden group rounded-lg"
              >
                <div className="relative h-40 sm:h-56">
                  <Image
                    src={car.images[0]}
                    alt={car.images[0]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{car.vehicle_type}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold text-base">
                      ${car.price.toLocaleString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <p>{car.city}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full text-sm" variant="outline">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No vehicles available at the moment</p>
          </div>
        )}
      </section>
    </div>
  );
}
