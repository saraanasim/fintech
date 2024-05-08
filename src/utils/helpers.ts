import { FindPayloadType } from "./types";

/*A helper function that adds default values to unassigned parameters
since mongodb query fails if anything is undefined*/
export const getFindQueryProps = (payload: FindPayloadType<any>) => {
    const {
      filter = {},
      options = {},
      ref = [],
      sort = {},
      where = {},
    } = payload;
  
    return { filter, options, ref, sort, where };
  };