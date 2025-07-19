import type { OpenMeteoResponse } from "../types/DashboardTypes";

export interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}