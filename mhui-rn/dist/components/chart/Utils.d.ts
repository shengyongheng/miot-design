import { GroupPointsDataType, MultiGroupsPointsDataType, DatasetGroupItemsType, DatasetMultiGroupItemsType } from './interface';
export declare function isMultiGroups(dataset: GroupPointsDataType | MultiGroupsPointsDataType | DatasetGroupItemsType | DatasetMultiGroupItemsType): boolean;
export declare function extractViewBox(viewBox?: string): number[] | null;
