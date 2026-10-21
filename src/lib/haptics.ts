"use client";

/**
 * Native Haptic Feedback for mobile Android devices.
 * Uses the Web Vibration API supported natively by Android WebView.
 */
export function haptic(type: "light" | "medium" | "heavy" | "success" | "error" = "light") {
  if (typeof window === "undefined" || typeof navigator === "undefined" || !navigator.vibrate) {
    return;
  }
  try {
    switch (type) {
      case "light":
        navigator.vibrate(8);
        break;
      case "medium":
        navigator.vibrate(18);
        break;
      case "heavy":
        navigator.vibrate(35);
        break;
      case "success":
        navigator.vibrate([10, 35, 18]);
        break;
      case "error":
        navigator.vibrate([20, 45, 20]);
        break;
    }
  } catch {
    // Graceful no-op if blocked or unsupported
  }
}
