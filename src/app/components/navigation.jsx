"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, ShoppingCart, X, User, LogOut, Settings } from "lucide-react";
import { Button } from "../components/ui/button";
import { useLanguage } from "../../../lib/language-context";
import { useAuth } from "../../../lib/auth-context";
import LanguageSwitcher from "./language-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export default function Navigation() {
  const { t } = useLanguage();
  const { user, logout, isAuthenticated, loading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/software", label: t.nav.software },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full max-w-full transition-all duration-500 ${
        isScrolled
          ? "glass-card border-b border-cyan-400/20 shadow-lg shadow-cyan-500/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 max-w-full">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-300"
          >
            PLUG-IN
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <Link href="/checkout">
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>

            <LanguageSwitcher />

            {!loading && (
              <>
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-cyan-500/80 to-emerald-500/80 hover:from-cyan-500 hover:to-emerald-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
                      >
                        <User className="w-4 h-4 mr-2" />
                        {user?.name || user?.email}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 bg-gray-900 border-cyan-500/20"
                    >
                      <DropdownMenuLabel className="text-gray-300">
                        {t.navigation.myAccount}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-cyan-500/20" />
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard"
                          className="text-gray-300 hover:text-cyan-400 cursor-pointer"
                        >
                          <User className="mr-2 h-4 w-4" />
                          {t.navigation.dashboard}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/settings"
                          className="text-gray-300 hover:text-cyan-400 cursor-pointer"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          {t.navigation.settings}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-cyan-500/20" />
                      <DropdownMenuItem
                        onClick={logout}
                        className="text-red-400 hover:text-red-300 cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        {t.navigation.logout}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-cyan-500/80 to-emerald-500/80 hover:from-cyan-500 hover:to-emerald-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
                    >
                      {t.nav.login}
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden glass-card border-t border-cyan-400/20 py-4 animate-slide-up max-w-full">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4">
                <LanguageSwitcher />
              </div>
              <Link href="/checkout" className="px-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-cyan-400/30 text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Checkout
                </Button>
              </Link>
              <Link href="/login" className="px-4">
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-cyan-500/80 to-emerald-500/80 hover:from-cyan-500 hover:to-emerald-500 text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.nav.login}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
