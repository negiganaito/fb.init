import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLScalarType,
} from "graphql";

// ====================================================
const JSDependencyType = new GraphQLScalarType({
  name: "JSDependency",
  serialize: (value) => value,
});

const JSDependencyField = {
  args: {
    module: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: GraphQLString },
  },
  type: new GraphQLNonNull(JSDependencyType),
  // eslint-disable-next-line require-await
  resolve: async (_, { module }) => {
    // console.log({ "module-in-JSDependencyField": module });
    seenDataDrivenDependencies.add(module);
    return module;
  },
};

const seenDataDrivenDependencies = new Set();

const dataDrivenDependencies = {
  reset() {
    seenDataDrivenDependencies.clear();
  },
  getModules() {
    return Array.from(seenDataDrivenDependencies);
  },
};
// ====================================================

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

const UserProfileRendererType = new GraphQLObjectType({
  name: "UserProfileRenderer",
  fields: {
    age: { type: GraphQLInt },
    name: { type: new GraphQLNonNull(GraphQLString) },
    js: JSDependencyField,
  },
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    userProfile_renderer: {
      type: UserProfileRendererType,
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
      userProfile_renderer: {
        name: "John Doe",
        age: 30,
      },
    };
  },
};

export { QueryType, rootValue, dataDrivenDependencies };
