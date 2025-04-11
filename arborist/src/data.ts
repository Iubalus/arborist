export interface Profile {
    id: string;
    name: string;
    company: string;
    when: string;
    interviewQuestion: string;
    memorableQuotes: string[];
    presentIds: number[];
    quickFacts: string[],
    insights: string[],
    opportunityIds: number[],
    experienceMap: string;
    story: string;
    profile: string;
}

export interface Identity {
    id: number;
    name: string;
    company?: string;
}

export function loadProfiles(): Profile[] {
    return [
        {
            id: "jsmith12323",
            name: "John Smith",
            company: "John Smith's Company",
            when: "4/13/25 4:45PM",
            interviewQuestion: "Have you ever had a dream that's that you um you had you would you could you'd do you whi... you want you you could do some you you do you could you wanna you want him to do you so much you could do anything?",
            memorableQuotes: ["You're aren't *epic backfelp*", "It just stood there holding it's tail and whispering... what did it say?"],
            presentIds: [1, 2, 3, 4],
            quickFacts: ["Can bench over 200lbs", "Been with the company for 200 years", "Hydrophobic"],
            insights: ["May like strawberry icecream"],
            opportunityIds: [1, 123, 32, 1233],
            experienceMap: "./experience.png",
            story: "Felt hungry, opened the fridge, noticed the milk had gone off, took out phone, tried to log into app, too much butter on fingers, password didn't work, dropped phone, knelt down, banged head on fridge door",
            profile: "./profile.jpg"
        },
        {
            id: "jdoe1232123",
            name: "Jane Doe",
            company: "Jane Does's Boot Co's",
            when: "4/25/25 4:45PM",
            interviewQuestion: "Have you ever had a dream that's that you um you had you would you could you'd do you whi... you want you you could do some you you do you could you wanna you want him to do you so much you could do anything?",
            memorableQuotes: ["You're aren't *epic backfelp*", "It just stood there holding it's tail and whispering... what did it say?"],
            presentIds: [1, 2, 3, 4],
            quickFacts: ["Can bench over 200lbs", "Been with the company for 200 years", "Hydrophobic"],
            insights: ["May like strawberry icecream"],
            opportunityIds: [1, 123, 32, 1233],
            experienceMap: "./experience.png",
            story: "Felt hungry, opened the fridge, noticed the milk had gone off, took out phone, tried to log into app, too much butter on fingers, password didn't work, dropped phone, knelt down, banged head on fridge door",
            profile: "./profile.jpg"
        }
    ] as Profile[]
}
let identities = new Map<Identity>();
identities.set(1, { id: 1, name: "John Smith", company: "John Smith's Company" });
identities.set(2, { id: 2, name: "Jeff Whelks" });
identities.set(3, { id: 3, name: "Kim Kimberly" });
identities.set(3, { id: 4, name: "Froden Bodensoden" });

export function findIdentities(ids: number[]) {
    return ids.map(id => findIdentity(id))
}

export function findIdentity(id: number): Identity {
    return identities.get(id) || {};
}