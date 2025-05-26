"use client";

import { useMobileMediaQuery } from "@/hooks/useMediaQuery";
import { ModalClose } from "../Modal/Modal";
import { Block } from "../ui/Block";

import { ModalBody, ModalTitle } from "../Modal/Modal";

import { useModalsContext } from "@/providers/ModalsProvider/ModalsContext";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import { Checkbox, CheckboxIndicator } from "../Checkbox/Checkbox";
import { ModalRoot, ModalTrigger } from "../Modal/Modal";
import { BlocksColumn } from "../ui/Block";
import { Button } from "../ui/Button";

export const TermsAndConditionsModal = ({ children }: PropsWithChildren) => {
  const isMobile = useMobileMediaQuery();

  const [isTermsAgreementAccepted, setIsTermsAgreementAccepted] = useState(false);
  const { isTermsAndConditionsOpen, setIsTermsAndConditionsOpen, setIsTermsAndConditionsContentOpen } =
    useModalsContext();

  const handleTermsAndConditionsClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsTermsAndConditionsContentOpen(true);
  };

  const handleProceedClick = () => {
    if (!isTermsAgreementAccepted) {
      return;
    }

    setIsTermsAndConditionsOpen(false);
  };

  return (
    <ModalRoot open={isTermsAndConditionsOpen}>
      <ModalTrigger asChild>{children}</ModalTrigger>

      <ModalBody className="w-full max-w-(--mobile-container) md:max-w-[478px]">
        <BlocksColumn>
          <Block elevation={isMobile ? 1 : 2} className="bg-main-50 flex items-center justify-between px-[30px] py-6">
            <ModalTitle className="text-lg font-bold">Terms & Conditions</ModalTitle>
            <ModalClose />
          </Block>

          <Block elevation={isMobile ? 1 : 2} className="relative px-[30px] py-6 md:px-10 md:py-10">
            <div className="flex flex-col items-center gap-[46px]">
              <div className="flex items-center justify-center">
                <Image
                  src="/images/terms-and-conditions.svg"
                  width={270}
                  height={234}
                  alt="Terms & Conditions"
                  priority
                  className="not-md:w-[206px]"
                />
              </div>

              <p className="text-sm">
                By proceeding, you agree to our Terms & Conditions. We encourage you to read them carefully to ensure
                that you understand your rights and obligations.
              </p>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="terms-and-conditions"
                  checked={isTermsAgreementAccepted}
                  onCheckedChange={(checked) => {
                    if (checked === "indeterminate") {
                      return;
                    }

                    setIsTermsAgreementAccepted(checked);
                  }}
                >
                  <CheckboxIndicator />
                </Checkbox>
                <label htmlFor="terms-and-conditions" className="cursor-pointer text-sm">
                  I have read and accept the <br className="md:hidden" />
                  <span
                    onClick={handleTermsAndConditionsClick}
                    className="cursor-pointer font-bold underline underline-offset-2"
                  >
                    Terms & Conditions
                  </span>
                  .
                </label>
              </div>

              <Button
                elevation={1}
                primary
                disabled={!isTermsAgreementAccepted}
                className="font-semibold"
                outerClassName="w-full md:w-[250px]"
                onClick={handleProceedClick}
              >
                Proceed
              </Button>
            </div>
          </Block>
        </BlocksColumn>
      </ModalBody>
    </ModalRoot>
  );
};
