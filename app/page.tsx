import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { Music, Users, Mic, Headphones, Star, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Artistly | Book Talented Artists for Your Event",
  description:
    "Discover, book, and manage professional performing artists for your events with Artistly. Singers, dancers, DJs, speakers, and more!",
};

const Index = () => {
  const categories = [
    {
      title: "Singers",
      description: "Professional vocalists for any event",
      icon: Music,
      count: "500+",
      color: "from-forest-green to-bright-green",
    },
    {
      title: "Dancers",
      description: "Choreographers and dance performers",
      icon: Users,
      count: "300+",
      color: "from-bright-green to-lime-green",
    },
    {
      title: "Speakers",
      description: "Motivational and keynote speakers",
      icon: Mic,
      count: "200+",
      color: "from-lime-green to-warm-yellow",
    },
    {
      title: "DJs",
      description: "Professional DJs and music producers",
      icon: Headphones,
      count: "400+",
      color: "from-warm-yellow to-forest-green",
    },
  ];

  const features = [
    "Verified Professional Artists",
    "Instant Booking Requests",
    "Secure Payment Processing",
    "24/7 Customer Support",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-green/10 via-white to-warm-yellow/10">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-forest-green/10 to-bright-green/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Connect with
              <span className="bg-gradient-to-r from-forest-green to-bright-green bg-clip-text text-transparent">
                {" "}
                Amazing Artists
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The premier platform for event planners to discover and book
              talented performing artists. From singers to speakers, find the
              perfect artist for your next event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/artists">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-forest-green to-bright-green hover:from-forest-green/90 hover:to-bright-green/90 text-white px-8 py-3"
                >
                  Explore Artists
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/onboarding">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-forest-green text-forest-green hover:bg-forest-green/10 px-8 py-3"
                >
                  Join as Artist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Discover Talented Artists
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through our carefully curated categories of professional
              performing artists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.title}
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{category.description}</p>
                    <div className="flex items-center justify-center text-sm text-forest-green font-medium">
                      <Star className="h-4 w-4 mr-1" />
                      {category.count} Artists
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-forest-green to-bright-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose Artistly?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We make booking performing artists simple, secure, and successful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={feature} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ready to Find Your Perfect Artist?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of event planners who trust Artistly for their
            entertainment needs
          </p>
          <Link href="/artists">
            <Button
              size="lg"
              className="bg-gradient-to-r from-forest-green to-bright-green hover:from-forest-green/90 hover:to-bright-green/90 text-white px-8 py-4"
            >
              Start Browsing Artists
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-lime-green to-warm-yellow bg-clip-text text-transparent">
              Artistly
            </h3>
            <p className="text-gray-400 mt-2">
              Connecting talent with opportunity
            </p>
          </div>
          <div className="text-gray-400">
            © 2024 Artistly. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
