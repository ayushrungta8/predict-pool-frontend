import { ConnectButton } from "@rainbow-me/rainbowkit";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <main className="mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-600 rounded-full p-2">
              <span className="text-white font-bold">MON</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Predict Pool</h1>
          </div>
          <ConnectButton />
        </div>
        {children}
      </main>
    </div>
  );
};
