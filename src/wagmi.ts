import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { monadHardhat, monadTestnet } from "./utils/customChains";

export const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [monadTestnet, monadHardhat],
  ssr: true,
});
