import { cn } from "@/utils/cn";
import * as DialogPrimitives from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from "react";

export const ModalRoot = DialogPrimitives.Root;

export const ModalTrigger = DialogPrimitives.Trigger;

export const ModalBody = forwardRef<
  ComponentRef<typeof DialogPrimitives.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitives.Content>
>(({ children, className, ...props }, ref) => {
  return (
    <DialogPrimitives.Portal>
      <DialogPrimitives.Overlay className="fixed top-0 right-0 bottom-0 left-0 grid place-items-center overflow-y-auto bg-white/80 py-14 backdrop-blur-xs">
        <DialogPrimitives.Content ref={ref} className={cn("focus:outline-none", className)} {...props}>
          {children}
        </DialogPrimitives.Content>
      </DialogPrimitives.Overlay>
    </DialogPrimitives.Portal>
  );
});
ModalBody.displayName = "ModalBody";

export const ModalTitle = forwardRef<
  ComponentRef<typeof DialogPrimitives.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitives.Title>
>(({ children, ...props }, ref) => {
  return (
    <DialogPrimitives.Title ref={ref} {...props}>
      {children}
    </DialogPrimitives.Title>
  );
});
ModalTitle.displayName = DialogPrimitives.Title.displayName;

export const ModalClose = forwardRef<
  ComponentRef<typeof DialogPrimitives.Close>,
  ComponentPropsWithoutRef<typeof DialogPrimitives.Close>
>(({ children, className, ...props }, ref) => {
  return (
    <DialogPrimitives.Close ref={ref} className={cn("cursor-pointer", className)} {...props}>
      {children ?? <XIcon className="size-5" />}
    </DialogPrimitives.Close>
  );
});
ModalClose.displayName = DialogPrimitives.Close.displayName;
