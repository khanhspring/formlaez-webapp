import { ReactNode } from 'react';
import {WorkspaceType} from '../models/workspace';

export type PlanInfo = {
    code: WorkspaceType;
    name: string;
    productId: number;
    formLimit: number;
    documentMergePerMonth: number;
    submissionPerMonth: number;
    fileStorageLimit: string;
    workspaceMember: number;
    icon: ReactNode;
    price: number;
}

export const FreePlan: PlanInfo = {
    code: 'Free',
    name: 'Free',
    productId: -1,
    icon: <i className="fi fi-rr-gift"></i>,
    price: 0,
    formLimit: 5,
    documentMergePerMonth: 25,
    submissionPerMonth: 100,
    fileStorageLimit: '100 MB',
    workspaceMember: 1
}

export const PlusPlan: PlanInfo = {
    code: 'Plus',
    name: 'Plus',
    productId: 47512,
    icon: <i className="fi fi-rr-flame"></i>,
    price: 25,
    formLimit: 20,
    documentMergePerMonth: 100,
    submissionPerMonth: 500,
    fileStorageLimit: '1 GB',
    workspaceMember: 2
}

export const BusinessPlan: PlanInfo = {
    code: 'Business',
    name: 'Business',
    productId: 47513,
    icon: <i className="fi fi-rr-comet"></i>,
    price: 40,
    formLimit: 100,
    documentMergePerMonth: 500,
    submissionPerMonth: 2000,
    fileStorageLimit: '5 GB',
    workspaceMember: 5
}

export const Plans: {[key: string] : PlanInfo} = {
    'Free': FreePlan,
    'Plus': PlusPlan,
    'Business': BusinessPlan
}