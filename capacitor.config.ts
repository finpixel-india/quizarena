import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.quizlab.app",
  appName: "QuizLab",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
