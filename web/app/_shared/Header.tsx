"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserAvatar,
  UserButton,
} from "@clerk/nextjs";

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  logoText?: string;
  logoLinkHref?: string;
  navigation?: { name: string; href: string }[];
  loginHref?: string;
  loginText?: string;
  getStartedHref?: string;
  getStartedText?: string;
}

export function Header({
  logoSrc,
  logoAlt,
  logoLinkHref,
  navigation,
  loginHref,
  loginText,
  getStartedHref,
  getStartedText,
}: HeaderProps) {
  const defaultLogoSrc = "/logo.png";
  const defaultLogoAlt = "Mockup Arrow Logo";
  const defaultLogoLinkHref = "/";
  const defaultNavigation = [
    { name: "Home", href: "/#" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Features", href: "/#features" },
    { name: "Contact", href: "/#contact" },
  ];
  const defaultLoginHref = "/login";
  const defaultLoginText = "Log in";
  const defaultGetStartedHref = "/get-started";
  const defaultGetStartedText = "Get started";

  const currentLogoSrc = logoSrc ?? defaultLogoSrc;
  const currentLogoAlt = logoAlt ?? defaultLogoAlt;
  const currentLogoLinkHref = logoLinkHref ?? defaultLogoLinkHref;
  const currentNavigation = navigation ?? defaultNavigation;
  const currentLoginHref = loginHref ?? defaultLoginHref;
  const currentLoginText = loginText ?? defaultLoginText;
  const currentGetStartedHref = getStartedHref ?? defaultGetStartedHref;
  const currentGetStartedText = getStartedText ?? defaultGetStartedText;

  return (
    <header className="border-b bg-background">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href={currentLogoLinkHref} className="flex items-center gap-2">
          <Image
            src={currentLogoSrc}
            alt={currentLogoAlt}
            width={32}
            height={32}
            className="size-8 dark:invert"
          />
          <span className="mr-6 text-xl font-semibold">{"Mockup"}</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {currentNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <SignedIn>
            <Button asChild>
              <Link href={currentGetStartedHref}>{"Get Started"}</Link>
            </Button>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button variant="ghost" asChild>
              <SignInButton mode="modal"></SignInButton>
            </Button>
          </SignedOut>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="size-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="mt-8 flex flex-col gap-4">
              {currentNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
              <hr className="my-4" />
              <Button variant="ghost" asChild className="justify-start">
                <Link href={currentLoginHref}>{currentLoginText}</Link>
              </Button>
              <Button asChild>
                <Link href={currentGetStartedHref}>
                  {currentGetStartedText}
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
