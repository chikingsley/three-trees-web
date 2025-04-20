import { Card } from "@/components/ui/card";
import { Logo } from "./logo";

export const LogoCard = ({ scrolled }: { scrolled: boolean }) => {
  return (
    <Card className="border-0 shadow-none py-0 pl-6 w-[300px] flex-shrink-0 bg-transparent">
      <Logo size="large" scrolled={scrolled} />
    </Card>
  );
}; 