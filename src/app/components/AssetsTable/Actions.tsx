import { Button } from "@/components/ui/Button";
import { LayersIcon } from "lucide-react";
import { Asset } from "@/types/token";

export type ActionsProps = {
  data: Asset;
};

export const Actions = ({ data }: ActionsProps) => {
  const { address, type, balance } = data;

  return type === "native" && !!balance ? (
    <div className="not-md:flex">
      <Button
        href={`/stake/native`}
        prefetch={true}
        primary
        elevation={1}
        size="lg"
        className="gap-2 font-semibold"
      >
        <LayersIcon size={16} />
        Stake
      </Button>
    </div>
  ) : (
    !!balance && (
      <div className="not-md:flex">
        <Button
          href={`/stake/${type}/${address}`}
          prefetch={true}
          primary
          elevation={1}
          size="lg"
          className="gap-2 font-semibold"
        >
          <LayersIcon size={16} />
          Stake
        </Button>
      </div>
    )
  );
};
