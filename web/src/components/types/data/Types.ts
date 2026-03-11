// STRATEGY:
//  - Order-independent definitions with retroactive linking capability
//  - Minimal to none tracking.
//  - Only capture essential information
//  - Independent and flat structures when possible

/**
 * Record to allow for fetching of a file resource such as an image.
 **/
export interface Attachment {
    fileId: string;
    name: string;
    meta: { [key: string]: any }
}

/**
 * Record for a high-level project to allow for separation of sub-concerns
 **/
export interface Project {
    projectId: string;
    name: string;
    description: string;
}

/**
 * The mapping indicating which outcomes are the focus of a project
 **/
export interface ProjectOutcome {
    projectId: string;
    outcomeId: string;
}

/**
 * Measures of the business and product health
 **/
export interface Outcome {
    outcomeId: string;
    type: "BUSINESS" | "PRODUCT"
    content: string;
}

/**
 * A mapping enabling outcomes to be rendered as a tree
 **/
export interface OutcomeEdge {
    leftOutcomeId: string;
    rightOutcomeId: string;
    order: number;
}

/**
 * A statment of the outcome measurement
 **/
export interface OutcomeMeasure {
    outcomeId: string;
    measureId: string;
    description: string;
}

/**
 * A statment of what value to seek by when
 **/
export interface OutcomeTarget {
    outcomeId: string;
    measureId: string;
    targetValue: any;
    targetDate: Date;
}

/**
 * A recorded measurement of the outcome for current or historic status
 **/
export interface OutcomeMeasurement {
    measureId: string;
    measurementId: string;
    time: Date;
    measuredValue: any;
}

/**
 * A question associated with an outcome
 **/
export interface OutcomeQuestion {
    questionId: string;
    outcomeId: string;
}

/**
 * Either research or interview questions
 **/
export interface Question {
    questionId: string;
    content: string;
    type: "RESEARCH" | "INTERVIEW"
}

/**
 * An interviewer or interviewee
 **/
export interface Person {
    personId: string;
    name: string;
    profile: Attachment;
    company: string;
    role: "INTERVIEWER" | "INTERVIEWEE"
}

/**
 * A quote made by a person during an interview
 **/
export interface Quote {
    snapshotId: string;
    quoteId: string;
    personId: string;
    content: string;
    order: number;
}

/**
 * An associated snapshot interviewer
 **/
export interface SnapshotInterviewer {
    snapshotId: string;
    person: Person;
    order: number;
}

/**
 * An associated snapshot interviewee
 **/
export interface SnapshotInterviewee {
    snapshotId: string;
    person: Person;
    order: number;
}

/**
 * A supporting document or image from the interview
 **/
export interface Exhibit {
    snapshotId: string;
    exhibit: Attachment;
    order: number;
}

/**
 * A record of a performed interview
 **/
export interface Snapshot {
    snapshotId: string;
    leadInterviewerPersonId: string;
    recording: Attachment;
    date: Date;
    interviewQuestionId: string;
    quickFacts: string[];
    insights: string[];
    experienceMap: Attachment;
    momentsInTime: string[];
    story: string;

}

/**
 * A mapping of an opportunity identified from the interview
 **/
export interface SnapshotOpportunity {
    snapshotId: string;
    opportunityId: string;
}

/**
 * A statement of a customer unmet need or want
 **/
export interface Opportunity {
    opportunityId: string;
    content: string;
    status: "NEW" | "IN PROGRESS" | "COMPLETED" | "ABANDONED"
}

/**
 * Record for preserving when opportunities are combined
 **/
export interface OpportunityMerge {
    leftOpportunityId: string;
    rightOpportunityId: string;
}

/**
 * A statement of the opporunity size
 **/
export interface OpportunityAssessment {
    opportunityAssessmentId: string;
    category: "SIZE" | "MARKET" | "COMPANY" | "CUSTOMER",
    description: string;
    weight: number;
}

/**
 * A record to indicate how a tree of opportunities would be drawn
 **/
export interface OpportunityEdge {
    leftOpportunityId: string;
    rightOpportunityId: string;
    order: number;
}

/**
 * A connector indicating a solution is attempting to address an opportunity
 **/
export interface OpportunitySolution {
    opportunityId: string;
    solutionId: string;
    order: number;
}

/**
 * A stated solution and the status of the solution
 **/
export interface Solution {
    solutionId: string;
    content: string;
    status: "NEW" | "IN PROGRESS" | "COMPLETED" | "ABANDONED"
}

/**
 * An indicator of how the solution would be drawn as a tree
 **/
export interface SolutionEdge {
    leftSolutionId: string;
    rightSolutionId: string;
    order: number;
}

/**
 * A top-level descriptor for a storymap for a solution
 **/
export interface StoryMap {
    solutionId: string;
    storyMapId: string;
    name: string;
    description: string;
}

/**
 * A role or persona that take some action in the storymap
 **/
export interface StoryMapRole {
    storyMapId: string;
    storyMapRoleId: string;
    name: string;
}

/**
 * A moment in time in the storymap
 **/
export interface StoryMapMoment {
    storyMapId: string;
    storyMapMomentId: string;
    order: number;
}

/**
 * An action taken by a role/persona at a moment in time in the storymap
 **/
export interface StoryMapRoleMoment {
    storyMapMomentId: string;
    storyMapRoleId: string;
    description: string;
}

/**
 * The mapping between an assumption and a storymap moment in time
 **/
export interface AssumptionStoryMapping {
    storyMapMomentId: string;
    assumptionId: string;
    order: number;
}

/**
 * An assumption identified in the storymap (something that must be tree for the storymap to succeed)
 **/
export interface Assumption {
    assumptionId: string;
    description: string;
    assumptionType: "DESIRABILITY" | "VIABILITY" | "FEASIBILITY" | "USABILITY" | "ETHICALITY"
}

/**
 * A confidence to importance mapping of the assumption to identify leap-of-faith assumptions
 **/
export interface AssumptionWeighting {
    assumptionId: string;
    weightXConfidence: number;
    weightYImportance: number;
}

/**
 * A mapping between an assumption and a test for that assumption
 **/
export interface AssumptionToTest {
    assumptionId: string;
    assumptionTestId: string;
}

/**
 * A statment of an assumption test and the status of that test
 **/
export interface AssumptionTest {
    assumptionTestId: string;
    description: string;
    successCriteria: string;
    outcome: "UNTESTED" | "CONFIRMED" | "FAILED" | "INCONCLUSIVE"
    notes: string;
}
