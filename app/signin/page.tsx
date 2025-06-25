// Sign-in page for Artistly.
// Demonstrates usage of useContext for authentication state, along with react-hook-form and Zod for form validation.

"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import Navigation from "@/components/Navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { loginFormData, loginSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { provider } from "../layout";
import { toast } from "sonner";
const SignIn = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { setLoggedIn } = useContext(provider);
  function onSubmit(data: z.infer<typeof loginSchema>) {
    setLoggedIn(true);
    toast("context set");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-green/10 via-white to-warm-yellow/10">
      <Navigation />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-forest-green to-bright-green bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to your Artistly account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-forest-green to-bright-green hover:from-forest-green/90 hover:to-bright-green/90 text-white py-2.5"
                  >
                    Sign In
                  </Button>
                </form>
              </Form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {`Don't have an account?`}{" "}
                  <Link
                    href="/signup"
                    className="text-forest-green hover:text-bright-green font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Metadata for the sign-in page

export default SignIn;
