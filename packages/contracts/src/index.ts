export type HealthStatus = "ok" | "unavailable";

export interface HealthResponse {
  status: HealthStatus;
  service: "api";
  dependency?: "postgres";
}
