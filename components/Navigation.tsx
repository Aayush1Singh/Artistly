"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const location = { pathname: usePathname() };
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Find Artists", path: "/artists" },
    { name: "Join as Artist", path: "/onboarding" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-forest-green to-bright-green bg-clip-text text-transparent"
          >
            Artistly
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-forest-green ${
                  location.pathname === item.path
                    ? "text-forest-green"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-2">
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="border-forest-green text-forest-green hover:bg-forest-green/10"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-forest-green to-bright-green hover:from-forest-green/90 hover:to-bright-green/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-forest-green ${
                  location.pathname === item.path
                    ? "text-forest-green"
                    : "text-gray-700"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Link href="/signin" onClick={() => setIsOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-forest-green text-forest-green hover:bg-forest-green/10"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-forest-green to-bright-green hover:from-forest-green/90 hover:to-bright-green/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
