import { Block } from "@/components/ui/Block";
import React from "react";
import { Loader } from "@/components/Loader/Loader";

export const LoadingBlock = () => {
  return (
    <Block
      elevation={1}
      outerClassName="w-[248px]"
      className="flex items-center justify-center py-1.5"
    >
      <Loader className="size-5" />
    </Block>
  );
};
