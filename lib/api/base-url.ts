const DEFAULT_API_BASE_URL = "http://localhost:5050/api";

const normalizeApiBaseUrl = (value?: string) => {
  const raw = (value || "").trim();

  if (!raw) {
    return DEFAULT_API_BASE_URL;
  }

  // Handle common malformed values like ':5050/api' or '//localhost:5050/api'.
  if (raw.startsWith(":")) {
    return `http://localhost${raw}`;
  }

  if (raw.startsWith("//")) {
    return `http:${raw}`;
  }

  return raw;
};

const removeTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const getApiBaseUrl = () => {
  const envBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL;
  return removeTrailingSlash(normalizeApiBaseUrl(envBaseUrl));
};

export const API_BASE_URL = getApiBaseUrl();
