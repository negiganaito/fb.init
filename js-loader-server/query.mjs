import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";

import { JSDependencyField } from "./js-dependency.mjs";

// Define the NavigationRenderer type
const XFBWorkNavigationClassicRendererType = new GraphQLObjectType({
  name: "XFBWorkNavigationClassicRenderer",
  fields: () => ({
    js: JSDependencyField,
    years: { type: GraphQLString },
  }),
});

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: {
    navigation_renderer: {
      type: XFBWorkNavigationClassicRendererType,
      // Resolve function for navigation_renderer field
    },
  },
});

// ========================= for user

const UserProfileType = new GraphQLObjectType({
  name: "UserProfile",
  fields: () => ({
    age: { type: GraphQLInt },
    name: { type: new GraphQLNonNull(GraphQLString) },
    js: JSDependencyField,
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    userProfile: {
      type: UserProfileType,
    },
  },
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    company: {
      type: CompanyType,
    },
    user: {
      type: UserType,
    },
  },
});

const rootValue = {
  company: () => {
    return {
      navigation_renderer: {},
    };
  },
  user: () => {
    return {
      userProfile: {
        name: "John Doe",
        age: 30,
      },
    };
  },
};

export { QueryType, rootValue };
