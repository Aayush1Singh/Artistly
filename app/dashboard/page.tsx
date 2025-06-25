// Manager dashboard page.
// Uses React useState for search filtering and displays stats and artist submissions.
// Features a reusable table built with shadcn/ui components for displaying artist data.
// Grid layout is used for stats cards, and filtering/search logic is implemented for submissions.

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  TrendingUp,
  DollarSign,
} from "lucide-react";

const ManagerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock artist submissions data
  const submissions = [
    {
      id: 1,
      name: "Sarah Johnson",
      category: "Singer",
      city: "New York, NY",
      fee: "$500-1000",
      status: "pending",
      submittedDate: "2024-01-15",
      languages: ["English", "Spanish"],
    },
    {
      id: 2,
      name: "Mike Chen",
      category: "DJ",
      city: "Los Angeles, CA",
      fee: "$300-800",
      status: "approved",
      submittedDate: "2024-01-14",
      languages: ["English", "Mandarin"],
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      category: "Dancer",
      city: "Miami, FL",
      fee: "$400-900",
      status: "pending",
      submittedDate: "2024-01-13",
      languages: ["English", "Spanish"],
    },
    {
      id: 4,
      name: "David Thompson",
      category: "Speaker",
      city: "Chicago, IL",
      fee: "$1000-2500",
      status: "approved",
      submittedDate: "2024-01-12",
      languages: ["English"],
    },
    {
      id: 5,
      name: "Aisha Patel",
      category: "Singer",
      city: "San Francisco, CA",
      fee: "$600-1200",
      status: "rejected",
      submittedDate: "2024-01-11",
      languages: ["English", "Hindi"],
    },
  ];

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    {
      title: "Total Artists",
      value: "127",
      change: "+12%",
      icon: Users,
      color: "text-forest-green",
    },
    {
      title: "Pending Reviews",
      value: "8",
      change: "+3",
      icon: Clock,
      color: "text-warm-yellow",
    },
    {
      title: "Monthly Bookings",
      value: "45",
      change: "+23%",
      icon: TrendingUp,
      color: "text-bright-green",
    },
    {
      title: "Revenue",
      value: "$12,450",
      change: "+18%",
      icon: DollarSign,
      color: "text-lime-green",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-bright-green/20 text-bright-green border-bright-green/30">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300">
            Rejected
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-warm-yellow/20 text-orange-800 border-warm-yellow/30">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleAction = (id, action) => {
    console.log(`${action} artist with ID: ${id}`);
    // Here you would typically update the status in your database
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="bg-gradient-to-r from-forest-green to-bright-green text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Manager Dashboard
          </h1>
          <p className="text-xl text-lime-green/80">
            Manage artist applications and track platform performance
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={stat.title}
                className="border-forest-green/20 hover:border-forest-green/40 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-sm text-bright-green font-medium">
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-full bg-gray-100 ${stat.color}`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Artist Submissions Table */}
        <Card className="border-forest-green/20">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-xl text-forest-green">
                Artist Submissions
              </CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search artists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus:ring-forest-green focus:border-forest-green"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Fee Range</TableHead>
                    <TableHead>Languages</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow
                      key={submission.id}
                      className="hover:bg-lime-green/5"
                    >
                      <TableCell className="font-medium">
                        {submission.name}
                      </TableCell>
                      <TableCell>{submission.category}</TableCell>
                      <TableCell>{submission.city}</TableCell>
                      <TableCell>{submission.fee}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {submission.languages.map((lang) => (
                            <Badge
                              key={lang}
                              variant="outline"
                              className="text-xs border-forest-green/30 text-forest-green"
                            >
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell>{submission.submittedDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-forest-green/30 text-forest-green hover:bg-forest-green/10"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {submission.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-bright-green hover:bg-bright-green/90"
                                onClick={() =>
                                  handleAction(submission.id, "approve")
                                }
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                  handleAction(submission.id, "reject")
                                }
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredSubmissions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No artists found matching your search.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboard;
