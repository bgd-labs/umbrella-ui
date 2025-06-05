import { ExplorerLink } from "@/components/Transaction/ExplorerLink";
import { Button } from "@/components/ui/Button";
import FailureGhost from "../../../public/images/failure.svg";
import SuccessGhost from "../../../public/images/success.svg";

export type TransactionFormOverlayProps = {
  type: "success" | "failure";
  hash?: string;
};

export const TransactionFormOverlay = ({ type, hash }: TransactionFormOverlayProps) => {
  return (
    <div className="dark:bg-main-950 mt-2 flex flex-col justify-center gap-14 bg-white">
      <div className="flex flex-col items-center justify-center gap-8">
        {type === "success" ? <SuccessGhost /> : <FailureGhost />}

        <div className="flex flex-col items-center gap-5">
          <h1 className="font-bold dark:text-white">
            {type === "success" ? "Transaction completed!" : "Transaction failed!"}
          </h1>
          {hash && <ExplorerLink hash={hash} />}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Button href="/" primary elevation={1} size="lg" outerClassName="w-[250px] grow-0">
          Return to dashboard
        </Button>
      </div>
    </div>
  );
};
