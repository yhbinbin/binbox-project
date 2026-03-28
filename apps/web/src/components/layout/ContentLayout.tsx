import { ReactNode } from "react";

type ContentLayoutProps = {
  children: ReactNode;
  className?: string;
};

export default function ContentLayout({ children, className = "" }: ContentLayoutProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[800px] px-6 py-16 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
