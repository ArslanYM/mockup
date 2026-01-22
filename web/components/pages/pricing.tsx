"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Tier {
  name: string;
  description: string;
  price: { monthly: number; annually: number };
  features: string[];
  cta: string;
  highlighted: boolean;
}

interface Pricing1Props {
  title?: string;
  description?: string;
  annualSwitchText?: string;
  monthlySwitchText?: string;
  tiers?: Tier[];
}

export function Pricing({
  title = "Simple, transparent pricing",
  description = "Choose the perfect plan for your needs. Always know what you'll pay.",
  annualSwitchText = "Switch to Annual Billing",
  monthlySwitchText = "Switch to Monthly Billing",
  tiers = [
    {
      name: "Free",
      description: "For personal use with limited features",
      price: { monthly: 0, annually: 0 },
      features: [
        "1 user",
        "5 projects",
        "2GB storage",
        "Basic support",
        "Limited integrations",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      description: "For small teams with advanced features",
      price: { monthly: 19, annually: 190 },
      features: [
        "5 users",
        "20 projects",
        "20GB storage",
        "Priority support",
        "Advanced integrations",
        "Analytics dashboard",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom needs",
      price: { monthly: 49, annually: 490 },
      features: [
        "Unlimited users",
        "Unlimited projects",
        "Unlimited storage",
        "24/7 dedicated support",
        "Custom integrations",
        "Advanced security",
        "Custom reporting",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ],
}: Pricing1Props) {
  const [annual, setAnnual] = React.useState(false);

  return (
    <section className="bg-transparent py-30 flex justify-center">
      <div className="container">
        <div className="grid items-center justify-center  gap-6">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {title}
              </h1>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                {description}
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setAnnual(!annual)}
              >
                {annual ? monthlySwitchText : annualSwitchText}
              </Button>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={cn("flex flex-col", {
                  "border-primary": tier.highlighted,
                })}
              >
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid flex-1 gap-4">
                  <div className="text-4xl font-bold">
                    $
                    {(annual
                      ? tier.price.annually / 12
                      : tier.price.monthly
                    ).toFixed(2)}
                    <span className="text-sm font-normal text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="mr-2 size-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
