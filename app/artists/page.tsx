"use client";
// Artist listing page component.
// Uses React hooks: useState for managing filter state (searchTerm, selectedCategory, selectedLocation, selectedPriceRange), and useMemo for efficient filtering of artists.
// Displays artists in a responsive grid layout using Tailwind CSS classes.
// Filtering logic allows users to search and filter artists by name, category, location, specialties, and price range.
// Shows a message if no artists match the selected filters.

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Search, MapPin, Star, Filter } from "lucide-react";
import Image from "next/image";

const ArtistListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  // Mock artist data
  const artists = [
    {
      id: 1,
      name: "Sarah Johnson",
      category: "Singer",
      location: "New York, NY",
      priceRange: "$500-1000",
      rating: 4.9,
      reviews: 127,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      specialties: ["Jazz", "Pop", "Soul"],
    },
    {
      id: 2,
      name: "Mike Chen",
      category: "DJ",
      location: "Los Angeles, CA",
      priceRange: "$300-800",
      rating: 4.8,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      specialties: ["Electronic", "Hip-Hop", "House"],
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      category: "Dancer",
      location: "Miami, FL",
      priceRange: "$400-900",
      rating: 4.9,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      specialties: ["Latin", "Contemporary", "Ballroom"],
    },
    {
      id: 4,
      name: "David Thompson",
      category: "Speaker",
      location: "Chicago, IL",
      priceRange: "$1000-2500",
      rating: 5.0,
      reviews: 203,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      specialties: ["Business", "Motivation", "Leadership"],
    },
    {
      id: 5,
      name: "Aisha Patel",
      category: "Singer",
      location: "San Francisco, CA",
      priceRange: "$600-1200",
      rating: 4.7,
      reviews: 92,
      image:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
      specialties: ["Classical", "Opera", "World Music"],
    },
    {
      id: 6,
      name: "Marcus Williams",
      category: "Dancer",
      location: "Atlanta, GA",
      priceRange: "$350-750",
      rating: 4.6,
      reviews: 74,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      specialties: ["Hip-Hop", "Street", "Breaking"],
    },
  ];

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      const matchesSearch =
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.specialties.some((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" || artist.category === selectedCategory;
      const matchesLocation =
        selectedLocation === "all" ||
        artist.location.includes(selectedLocation);

      let matchesPrice = true;
      if (selectedPriceRange !== "all") {
        const artistPriceStart = parseInt(
          artist.priceRange.split("-")[0].replace("$", "")
        );
        switch (selectedPriceRange) {
          case "0-500":
            matchesPrice = artistPriceStart <= 500;
            break;
          case "500-1000":
            matchesPrice = artistPriceStart >= 500 && artistPriceStart <= 1000;
            break;
          case "1000+":
            matchesPrice = artistPriceStart >= 1000;
            break;
        }
      }

      return (
        matchesSearch && matchesCategory && matchesLocation && matchesPrice
      );
    });
  }, [searchTerm, selectedCategory, selectedLocation, selectedPriceRange]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-gradient-to-r from-forest-green to-bright-green text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Find Your Perfect Artist
          </h1>
          <p className="text-xl text-lime-green/80">
            Browse through our curated collection of professional performing
            artists
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-forest-green" />
            <h2 className="text-lg font-semibold text-gray-900">
              Filter Artists
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus:ring-forest-green focus:border-forest-green"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="focus:ring-forest-green focus:border-forest-green">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Singer">Singer</SelectItem>
                <SelectItem value="Dancer">Dancer</SelectItem>
                <SelectItem value="Speaker">Speaker</SelectItem>
                <SelectItem value="DJ">DJ</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className="focus:ring-forest-green focus:border-forest-green">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                <SelectItem value="Chicago">Chicago</SelectItem>
                <SelectItem value="Miami">Miami</SelectItem>
                <SelectItem value="San Francisco">San Francisco</SelectItem>
                <SelectItem value="Atlanta">Atlanta</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedPriceRange}
              onValueChange={setSelectedPriceRange}
            >
              <SelectTrigger className="focus:ring-forest-green focus:border-forest-green">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-500">$0 - $500</SelectItem>
                <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                <SelectItem value="1000+">$1,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredArtists.length} of {artists.length} artists
          </p>
        </div>

        {/* Artist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => (
            <Card
              key={artist.id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-forest-green/20 hover:border-forest-green/40"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    width={400} // or your desired dimensions
                    height={192} // match the  aspect ratio of h-48 (48 * 4 = 192)
                    className="object-cover rounded-t-lg"
                    priority={false} // ensures lazy-loading
                  />

                  <Badge className="absolute top-3 left-3 bg-warm-yellow/90 text-gray-900 hover:bg-warm-yellow">
                    {artist.category}
                  </Badge>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {artist.name}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{artist.location}</span>
                  </div>

                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-warm-yellow mr-1" />
                    <span className="text-sm font-medium">{artist.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({artist.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {artist.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant="secondary"
                        className="text-xs bg-lime-green/20 text-forest-green hover:bg-lime-green/30"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-forest-green">
                      {artist.priceRange}
                    </span>
                    <Button className="bg-gradient-to-r from-forest-green to-bright-green hover:from-forest-green/90 hover:to-bright-green/90">
                      Ask for Quote
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No artists found matching your criteria. Try adjusting your
              filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistListing;
