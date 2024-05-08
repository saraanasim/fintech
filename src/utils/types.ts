import { FilterQuery, QueryOptions } from "mongoose";

//Generic Type for preparing query payload easily and dynamically with suggestions
export type FindPayloadType<Model> = {
    filter?: FilterQuery<Model>;
    options?: QueryOptions;
    ref?: any;
    where?: Record<string, any>;
    sort?: Record<string, 1 | -1>;
};