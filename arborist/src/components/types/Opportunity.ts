export interface Opportunity {
    opportunityId: String;
    parentOpportunityId: String;
    text: String;
    snapshotIds: String[];
}

export interface OpportunityJoiner {
    opportunityIdLeft: String;
    opportunityIdRight: String;
    joining: String;
}
