import { type SnapshotData } from "@/components/types";
import { dolist } from "@/components/util/list-util";

export function makeTitle(snapshot: SnapshotData) {
    if (snapshot.interviewees.length == 0 || !snapshot.company) {
        return "New Snapshot";
    }
    return `#${snapshot.id} ${dolist(snapshot.interviewees.map(v => v.name))} at ${snapshot.company}`
}

export function snapshotDate(snapshot: SnapshotData) {
    if (!snapshot.date) {
        return "[not set]";
    }
    return `${new Date(snapshot.date).toLocaleDateString()} ${new Date(snapshot.date).toLocaleTimeString()}`;
}