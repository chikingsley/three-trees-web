import { Card } from "@/components/ui/card";
import { Logo } from "./logo";

export const LogoCard = () => {
  return (
    <Card className="border-0 shadow-none py-0 px-2 w-[300px] flex-shrink-0 bg-white">
      <Logo size="default" />
    </Card>
  );
}; 