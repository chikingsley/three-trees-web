import { cn } from "@/lib/utils";

export const Logo = ({
  className = "", 
  size = "default", 
  scrolled = false
}: {
  className?: string;
  size?: "small" | "default" | "large";
  scrolled?: boolean;
}) => {
  const sizes = {
    small: {
      logo: "h-8",
      title: "text-md",
      subtitle: "text-xs",
    },
    default: {
      logo: "h-10",
      title: "text-base",
      subtitle: "text-xs",
    },
    large: {
      logo: "h-16",
      title: "text-xl",
      subtitle: "text-sm",
    },
  };

  const currentSize = sizes[size];

  const textColorClass = scrolled ? "text-[#273472]" : "text-white";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_2"
        viewBox="0 0 552.96 552.96"
        className={`${currentSize.logo} w-auto`}
      >
        <defs>
          <style>{`.cls-2{fill:#273472}`}</style>
        </defs>
        <path
          d="M333.57 111.92c-3.61-1.14-7.26-2.17-10.95-3.1-3.54-.89-7.12-1.7-10.74-2.39a203.918 203.918 0 0 0-31.78-3.67h-.16a206.49 206.49 0 0 0-12.91-.07c-9.36.25-18.56 1.12-27.56 2.58-2.51.41-5.02.86-7.5 1.36-93.46 18.79-163.85 101.34-163.85 200.33 0 50.22 18.12 96.21 48.17 131.79 3.19 3.78 6.52 7.44 9.97 10.97a21.38 21.38 0 0 0 12.03 6.17c5.4.82 10.87 1.44 16.4 1.84 1.13.08 1.7-1.34.84-2.08-3.62-3.12-7.11-6.38-10.47-9.76-34.29-34.43-55.47-81.91-55.47-134.34 0-81.98 51.8-151.85 124.45-178.69 3.86-1.43 7.78-2.73 11.76-3.91 7.37-2.19 14.93-3.94 22.64-5.22 6.79-1.14 13.71-1.91 20.72-2.3 3.59-.21 7.22-.31 10.86-.31s7.27.1 10.86.31c14.31.8 28.19 3.18 41.48 6.97.63.18 1.26.36 1.88.55 5.26 1.56 10.42 3.34 15.48 5.33 70.7 27.82 120.73 96.7 120.73 177.27 0 49.56-18.92 94.68-49.95 128.56-2.37 2.6-4.82 5.13-7.34 7.59-.8.78-.19 2.13.93 2.02l4.08-.4a2.59 2.59 0 0 0 1.64-.8c2.86-2.97 5.62-6.02 8.29-9.16 30.37-35.66 48.7-81.9 48.7-132.41 0-91.57-60.23-169.07-143.23-195.04Z"
          className="cls-2"
        />
        <path
          d="M458.98 329.6H324.34v74.97h-9.03v16h-69.63v-16h-8.78V329.6H101.06L280.02 19.64 458.98 329.6z"
          className="cls-2"
        />
        <path
          d="M435.22 371.45H318.46v48.52h-3.15v30.37h-69.63v-30.37h-3.06v-48.52H124.81L140.08 345l139.94-242.38L419.95 345l15.27 26.45z"
          style={{
            fill: "#3e59d4",
          }}
        />
        <path
          d="M422.52 419.97H315.31v72.44h-69.63v-72.44H137.52l28.01-48.52L180.81 345l99.21-171.84L379.23 345l15.28 26.45 28.01 48.52z"
          style={{
            fill: "#5b75eb",
          }}
        />
      </svg>
      <div className="flex flex-col">
        <h1 className={cn(currentSize.title, "font-bold leading-tight", textColorClass)}>
          THREE TREES
        </h1>
        <p className={cn(currentSize.subtitle, "leading-tight", textColorClass)}>
          CENTER FOR CHANGE
        </p>
      </div>
    </div>
  );
};
