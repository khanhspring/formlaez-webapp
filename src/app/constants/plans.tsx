import { BoltIcon, FireIcon, GiftIcon } from '@heroicons/react/24/solid';
import { ReactNode } from 'react';
import { WorkspaceType } from '../models/workspace';

export type PlanInfo = {
    code: WorkspaceType;
    name: string;
    productId: string;
    formLimit: number;
    documentMergePerMonth: number;
    submissionPerMonth: number;
    fileStorageLimit: string;
    fileStorageLimitInBytes: number;
    workspaceMember: number;
    icon: ReactNode;
    price: number;
}

export const FreePlan: PlanInfo = {
    code: 'Free',
    name: 'Free',
    productId: "-1",
    icon: <GiftIcon className='w-full' />,
    price: 0,
    formLimit: 5,
    documentMergePerMonth: 25,
    submissionPerMonth: 100,
    fileStorageLimit: '100 MB',
    fileStorageLimitInBytes: 100 * 1024 * 1024,
    workspaceMember: 1
}

export const PlusPlan: PlanInfo = {
    code: 'Plus',
    name: 'Plus',
    productId: process.env.REACT_APP_PLAN_PLUS_ID || '-1',
    icon: <FireIcon className='w-full' />,
    price: 25,
    formLimit: 20,
    documentMergePerMonth: 100,
    submissionPerMonth: 500,
    fileStorageLimit: '1 GB',
    fileStorageLimitInBytes:  1 * 1020 * 1024 * 1024,
    workspaceMember: 2
}

export const BusinessPlan: PlanInfo = {
    code: 'Business',
    name: 'Business',
    productId: process.env.REACT_APP_PLAN_BUSINESS_ID || '-1',
    icon: <BoltIcon className='w-full'/>,
    price: 40,
    formLimit: 100,
    documentMergePerMonth: 500,
    submissionPerMonth: 2000,
    fileStorageLimit: '5 GB',
    fileStorageLimitInBytes: 5 * 1020 * 1024 * 1024,
    workspaceMember: 5
}

export const Plans: {[key: string] : PlanInfo} = {
    'Free': FreePlan,
    'Plus': PlusPlan,
    'Business': BusinessPlan
}