'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

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
          <nav className="hidden sm:flex gap-6 text-sm font-medium">
            <Link href="/sell" className="hover:text-blue-600">Sell</Link>
            <Link href="/inventory" className="hover:text-blue-600">Buy</Link>
            <Link href="/about" className="hover:text-blue-600">About</Link>
            <Link href="/tips" className="hover:text-blue-600">Tips & Advice</Link>
            <Link href="/login" className="hover:text-blue-600">Login</Link>
            <Link href="/signup" className="hover:text-blue-600">Signup</Link>
          </nav>
          <div className="sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white bg-blue-600 font-bold px-3 py-1 rounded-md text-lg"
            >
              {mobileMenuOpen ? 'X' : 'M'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white z-30 shadow-md border-t border-gray-200 px-6 py-6 space-y-4 text-center sm:hidden">
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
              <p c
