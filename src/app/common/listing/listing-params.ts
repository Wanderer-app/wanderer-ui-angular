export interface ListingParams {
    batchSize: number,
    batchNumber: number,
    sortingParams?: SortingParams,
    filters: FilterParam[]
}

export interface SortingParams {
    fieldName: string,
    sortingDirection: SortingDirection
}

export interface FilterParam {
    fieldName: string,
    operation: FilterOperation,
    compareValue: string
}

export enum SortingDirection {
    ASCENDING = "ASCENDING",
    DESCENDING = "DESCENDING"
}

export enum FilterOperation { 
    IS = "IS", 
    IS_NOT = "IS_NOT", 
    IS_MORE_THEN = "IS_MORE_THEN", 
    IS_LESS_THEN = "IS_LESS_THEN" 
}