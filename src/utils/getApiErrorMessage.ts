const FRIENDLY_BY_STATUS: Record<number, string> = {
  400: "Unable to complete the request. Please check your information and try again.",
  401: "Your session has expired. Please sign in again.",
  403: "You are not allowed to perform this action.",
  404: "We could not find what you were looking for.",
  409: "This action conflicts with the current account state.",
  429: "Too many attempts. Please wait a moment and try again.",
  500: "Something went wrong on our side. Please try again later.",
  502: "The service is temporarily unavailable. Please try again.",
  503: "The service is temporarily unavailable. Please try again.",
};

const TECHNICAL_PATTERNS = [
  /axios/i,
  /request failed/i,
  /status code/i,
  /econnrefused/i,
  /etimedout/i,
  /network error/i,
  /mongo/i,
  /cast to objectid/i,
  /validationerror/i,
  /stack/i,
];

export function getApiErrorMessage(
  error: unknown,
  fallback = "Unable to complete the request. Please check your information and try again.",
): string {
  const err = error as {
    status?: number;
    data?: { message?: string; errorSources?: { message?: string }[] };
    message?: string;
  };

  const status = err?.status;
  const apiMessage = err?.data?.message || err?.message;
  const fieldMessage = err?.data?.errorSources?.[0]?.message;

  if (status === 0 || apiMessage === "Network Error") {
    return "Unable to connect. Please check your internet connection and try again.";
  }

  if (typeof apiMessage === "string" && !TECHNICAL_PATTERNS.some((pattern) => pattern.test(apiMessage))) {
    return apiMessage;
  }

  if (typeof fieldMessage === "string" && fieldMessage.trim()) {
    return fieldMessage;
  }

  if (status && FRIENDLY_BY_STATUS[status]) {
    return FRIENDLY_BY_STATUS[status];
  }

  return fallback;
}

export function isAccountRestricted(user?: {
  isActive?: string | boolean;
  isDeleted?: boolean;
} | null) {
  const status = String(user?.isActive || "").toUpperCase();
  return user?.isDeleted === true || status === "BLOCKED" || status === "INACTIVE";
}

export function getAccountRestrictionMessage(user?: {
  isActive?: string | boolean;
} | null) {
  const status = String(user?.isActive || "").toUpperCase();
  if (status === "BLOCKED") {
    return "Your account is currently blocked. You cannot perform wallet transactions. Please contact the administrator.";
  }
  if (status === "INACTIVE") {
    return "Your account is currently deactivated. You cannot perform wallet transactions. Please contact the administrator.";
  }
  return "";
}

export function isWalletRestricted(wallet?: { status?: string; isDeleted?: boolean } | null) {
  const status = String(wallet?.status || "").toUpperCase();
  return wallet?.isDeleted === true || status === "BLOCKED" || status === "SUSPENDED" || status === "DEACTIVATED";
}

export function getWalletRestrictionMessage(wallet?: { status?: string } | null) {
  const status = String(wallet?.status || "").toUpperCase();
  if (status === "BLOCKED") {
    return "Your wallet is blocked. Send and withdraw actions are unavailable. Please contact the administrator.";
  }
  if (status === "SUSPENDED" || status === "DEACTIVATED") {
    return "Your wallet is currently restricted. Wallet transactions are unavailable.";
  }
  return "";
}
