export interface OutcomeMetric {
    outcomeId: String;
    metricId: String;
}

export interface Metric {
    metricId: String;
    text: String;
    details: String;
}

export interface MetricUpdate {
    metricId: String;
    time: Date;
    value: any;
}