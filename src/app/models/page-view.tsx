import { Pageable } from "./common";

const PAGE_VIEW_DETAIL_REDIRECT_TYPES = ['FixedValue', 'ReferenceField'] as const;
export type PageViewDetailRedirectType = typeof PAGE_VIEW_DETAIL_REDIRECT_TYPES[number];

const PAGE_VIEW_DETAIL_TYPES = ['Default', 'CustomContent', 'Redirect', 'Inactive'] as const;
export type PageViewDetailType = typeof PAGE_VIEW_DETAIL_TYPES[number];

const PAGE_VIEW_LISTING_FILED_TYPES = ['FixedValue', 'ReferenceField'] as const;
export type PageViewListingFieldType = typeof PAGE_VIEW_LISTING_FILED_TYPES[number];

const PAGE_VIEW_STATUSES = ['Draft', 'Published', 'Unpublished'] as const;
export type PageViewStatus = typeof PAGE_VIEW_STATUSES[number];

export type PageViewTemplate = {
    id: number;
    code: string;
    name: string;
    description?: string;
    exampleUrl?: string;
}

export type PageViewDetail = {
    type: PageViewDetailType;
    customContent?: string;
    redirectUrl?: string;
    redirectType?: PageViewDetailRedirectType;
}

export type PageViewListingField = {
    type: PageViewListingFieldType;
    fieldCode: string;
    targetFieldCode?: string;
    fixedValue?: string;
}

export type PageView = {
    id: number;
    code: string;
    title: string;
    description?: string;
    status: PageViewStatus;
    template: PageViewTemplate;
    detail: PageViewDetail;
    listingFields: PageViewListingField[];
}

export type CreatePageViewRequest = {
    code: string;
    title: string;
    description?: string;
    formId: number;
    templateCode: string;
    listingFields: PageViewListingField[];
    detail: PageViewDetail;
}

export type UpdatePageViewRequest = {
    id: number;
    code: string;
    title: string;
    description?: string;
    listingFields: PageViewListingField[];
    detail: PageViewDetail;
}

export type SearchPageViewDataRequest = Pageable & {
    pageViewCode?: string;
}