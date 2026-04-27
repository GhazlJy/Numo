import { DEFAULT_USER, type DemoUser } from "@/data/demoUsers";

const CURRENT_USER_KEY = "currentUser";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getCurrentUser(): DemoUser {
  if (!canUseStorage()) return DEFAULT_USER;

  const stored = window.localStorage.getItem(CURRENT_USER_KEY);
  if (!stored) return DEFAULT_USER;

  try {
    return { ...DEFAULT_USER, ...JSON.parse(stored) } as DemoUser;
  } catch {
    return DEFAULT_USER;
  }
}

export function setCurrentUser(user: DemoUser) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(CURRENT_USER_KEY);
}
