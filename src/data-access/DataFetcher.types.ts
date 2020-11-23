export interface FetcherOptions extends RequestInit {
  baseURL?: string,
  parameters?: Record<string, string>
}