import { PricingTable } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Header } from "../_shared/Header";

const Pricing = () => {
  return (
    <>
      <Header />
      <section className={cn("py-32")}>
        <div className="">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
            <h2 className="text-4xl font-semibold text-pretty lg:text-6xl">
              Pricing
            </h2>
            <p className="text-muted-foreground lg:text-xl">
              Check out our affordable pricing plans
            </p>
            <div className="w-1/2">
              <PricingTable />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
