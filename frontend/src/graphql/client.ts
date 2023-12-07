import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated";

export function useClient() {
    const client = new GraphQLClient("/api/graphql");

    return getSdk(client);
}