import { Loader } from "@/components/Loader/Loader";

export const PageLoader = () => {
  return (
    <div className="animate-in fade-in flex w-screen items-center justify-center duration-300">
      <Loader />
    </div>
  );
};
