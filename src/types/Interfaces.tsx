import type { OpenMeteoResponse } from "./DashboardTypes";

export interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}