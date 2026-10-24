import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";

export const CHANNEL_ID = "quizlab_daily";

export async function isNotificationSupported(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (Capacitor.isNativePlatform()) return true;
  return "Notification" in window;
}

export async function checkNotificationPermission(): Promise<"granted" | "denied" | "prompt"> {
  if (typeof window === "undefined") return "prompt";
  if (Capacitor.isNativePlatform()) {
    try {
      const res = await LocalNotifications.checkPermissions();
      if (res.display === "granted") return "granted";
      if (res.display === "denied") return "denied";
      return "prompt";
    } catch {
      return "prompt";
    }
  }
  if ("Notification" in window) {
    if (Notification.permission === "granted") return "granted";
    if (Notification.permission === "denied") return "denied";
    return "prompt";
  }
  return "denied";
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (Capacitor.isNativePlatform()) {
    try {
      const res = await LocalNotifications.requestPermissions();
      return res.display === "granted";
    } catch (err) {
      console.warn("Failed to request native notification permissions:", err);
      return false;
    }
  }
  if ("Notification" in window) {
    try {
      const perm = await Notification.requestPermission();
      return perm === "granted";
    } catch {
      return false;
    }
  }
  return false;
}

export async function ensureNotificationChannel(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await LocalNotifications.createChannel({
      id: CHANNEL_ID,
      name: "Daily Practice Reminders",
      description: "Daily reminder for NCERT practice and quiz revision",
      importance: 4, // High priority (heads-up notification)
      visibility: 1, // Public
      vibration: true,
      lights: true,
      lightColor: "#F97316",
    });
  } catch (err) {
    console.warn("Failed to create notification channel:", err);
  }
}

export async function scheduleDailyReminders(hour = 19, minute = 30): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;
  try {
    const perm = await checkNotificationPermission();
    if (perm !== "granted") {
      const requested = await requestNotificationPermission();
      if (!requested) return false;
    }

    await ensureNotificationChannel();

    // Clear previous scheduled reminders
    await LocalNotifications.cancel({
      notifications: [{ id: 1001 }, { id: 1002 }],
    });

    const streakHour = (hour + 2) % 24;

    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1001,
          title: "🎯 Time for Daily NCERT Practice!",
          body: "Sharpen your knowledge with a quick 5-minute quiz today.",
          channelId: CHANNEL_ID,
          schedule: {
            on: {
              hour,
              minute,
            },
            repeats: true,
            allowWhileIdle: true,
          },
          smallIcon: "ic_launcher_round",
          iconColor: "#F97316",
        },
        {
          id: 1002,
          title: "🔥 Keep Your Learning Streak Alive!",
          body: "Consistency is key to mastering NCERT! Tap to test your skills.",
          channelId: CHANNEL_ID,
          schedule: {
            on: {
              hour: streakHour,
              minute,
            },
            repeats: true,
            allowWhileIdle: true,
          },
          smallIcon: "ic_launcher_round",
          iconColor: "#F97316",
        },
      ],
    });
    return true;
  } catch (e) {
    console.error("Failed to schedule daily reminders:", e);
    return false;
  }
}

export async function cancelReminders(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await LocalNotifications.cancel({
      notifications: [{ id: 1001 }, { id: 1002 }],
    });
  } catch (e) {
    console.warn("Failed to cancel reminders:", e);
  }
}

export async function sendTestNotification(): Promise<boolean> {
  if (Capacitor.isNativePlatform()) {
    try {
      const perm = await checkNotificationPermission();
      if (perm !== "granted") {
        const ok = await requestNotificationPermission();
        if (!ok) return false;
      }
      await ensureNotificationChannel();
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 9999,
            title: "🎉 Quiz Lab Notifications are Working!",
            body: "Great job! You will receive daily practice reminders to stay on top of your studies.",
            channelId: CHANNEL_ID,
            schedule: {
              at: new Date(Date.now() + 1200), // 1.2s delay for realistic popup feel
              allowWhileIdle: true,
            },
            smallIcon: "ic_launcher_round",
            iconColor: "#F97316",
          },
        ],
      });
      return true;
    } catch (e) {
      console.error("Test notification failed:", e);
      return false;
    }
  }

  if (typeof window !== "undefined" && "Notification" in window) {
    let perm = Notification.permission;
    if (perm !== "granted") {
      perm = await Notification.requestPermission();
    }
    if (perm === "granted") {
      new Notification("🎉 Quiz Lab Notifications are Working!", {
        body: "Great job! You will receive daily practice reminders to stay on top of your studies.",
        icon: "/icons/icon-192.png",
      });
      return true;
    }
  }
  return false;
}

let notificationListenerAttached = false;

export function initNotifications(): void {
  if (typeof window === "undefined" || !Capacitor.isNativePlatform() || notificationListenerAttached) return;
  notificationListenerAttached = true;

  try {
    void ensureNotificationChannel();
    void LocalNotifications.addListener("localNotificationActionPerformed", () => {
      window.location.href = "/";
    });
  } catch (err) {
    console.warn("Error initializing notification listener:", err);
  }
}
