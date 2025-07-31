import type { ReactNode } from "react";

export default function AppContainer({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
        {children}
      </div>
    </div>
  );
}
