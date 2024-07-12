import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";
import { JSDependencyField } from "./js-dependency.mjs";

// ====================================================

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

const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    parentId: {
      type: GraphQLString,
    },
  },
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: UserType,
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve: () => [
        { id: "1", name: "Xi Măng", parentId: null },
        { id: "2", name: "Thép", parentId: null },
        { id: "3", name: "Gạch", parentId: null },
        { id: "4", name: "Cát", parentId: null },
        { id: "5", name: "Đá", parentId: null },
        { id: "6", name: "Sơn", parentId: null },
        { id: "7", name: "Cửa Kính", parentId: null },
        { id: "8", name: "Nội Thất", parentId: null },
        { id: "9", name: "Đèn Trang Trí", parentId: null },
        { id: "10", name: "Vật Liệu Chịu Nhiệt", parentId: null },
        { id: "11", name: "Thiết Bị Vệ Sinh", parentId: null },
        { id: "12", name: "Thiết Bị Điện", parentId: null },
        { id: "13", name: "Cây Cảnh", parentId: null },
        { id: "14", name: "Vật Liệu Lót Sàn", parentId: null },
        { id: "15", name: "Thạch Cao", parentId: null },
      ],
    },
  },
});

const rootValue = {
  user: () => {
    return {
      userProfile_renderer: {
        name: "John Doe",
        age: 30,
      },
    };
  },
};

export { QueryType, rootValue };
