const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "/api").replace(/\/$/, "");

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const timeoutSignal = AbortSignal.timeout(2500);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const response = await fetch(`${API_URL}${normalizedPath}`, {
    ...init,
    signal: init?.signal ?? timeoutSignal,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    },
    next: init?.method ? undefined : { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
