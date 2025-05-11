import { Button } from "@/components/ui/Button";
import NotFoundImage from "../../public/images/not-found.svg";

export default function NotFoundPage() {
  return (
    <div className="mx-auto mb-auto flex w-full max-w-[890px] flex-col items-center pt-10">
      <NotFoundImage className="mb-[50px] max-h-[200px]" />

      <div className="flex flex-col items-center gap-8">
        <div className="text-3xl font-semibold">Something went wrong!</div>

        <div className="flex items-center justify-center">
          <Button href="/" primary elevation={1} size="lg" outerClassName="w-[250px] grow-0">
            Return to dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
