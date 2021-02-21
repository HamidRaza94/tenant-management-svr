// import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

// import NestedQuery from '../modules/nestedQuery';

export default function (modules) {
    let Query = {};
    // let Mutation = {};
    // let Subscription = {};

    Object.keys(modules).forEach((key) => {
        Query = { ...Query, ...modules[key].Query };
        // Mutation = { ...Mutation, ...modules[key].Mutation };
        // Subscription = { ...Subscription, ...modules[key].Subscription };
    });

    return {
        // JSON: GraphQLJSON,
        // JSONObject: GraphQLJSONObject,
        Query,
        // Mutation,
        // Subscription,
        // ...NestedQuery,
    }
}
