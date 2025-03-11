import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <main className="mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 rounded-full p-2">
                <span className="text-white font-bold">MON</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Predict Pool</h1>
            </div>
            {/* Navigation Links */}
            <nav className="flex space-x-6">
              <Link
                href="/"
                className={`text-lg ${
                  router.pathname === "/"
                    ? "text-white font-semibold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                href="/predict"
                className={`text-lg ${
                  router.pathname === "/predict"
                    ? "text-white font-semibold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Predict
              </Link>
            </nav>
          </div>
          <ConnectButton />
        </div>
        {children}
      </main>
    </div>
  );
};
