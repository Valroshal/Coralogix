export interface ConversionHistoryEntry {
    amount: number;
    from: string;
    to: string;
    result: number;
}

export interface CurrencyTrends {
    rates: { [date: string]: { [currency: string]: number } };
}

export interface Currencies {
    [key: string]: string;
}

export interface Conversion {
    amount: number;
    base: string;
    date: string;
    rates: {
        [currency: string]: number;
      };
}

export interface Rates {
    [currency: string]: number; // Example: { "USD": 1.23, "EUR": 0.89 }
}

export interface ExchangeRateResponse {
    rates: Rates;
    base: string;
    date: string;
}

export interface WeeklyRates {
    rates: Record<string, Rates>;
}