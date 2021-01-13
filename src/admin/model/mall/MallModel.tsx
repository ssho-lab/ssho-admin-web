import {Category} from "../category/CategoryModel";
import {Tag} from "../tag/TagModel";

export interface Mall {
    id: string,
    name: string,
    categoryList: Category[],
    tagList: Tag[],
    lastSyncTime: string
}
