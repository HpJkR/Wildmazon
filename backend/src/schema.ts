import { buildSchema } from "type-graphql";
import { authChecker } from "./auth";
import ProductResolver from "./resolvers/ProductResolver";
import UserResolver from "./resolvers/UserResolver";

export default buildSchema({
  resolvers: [ProductResolver, UserResolver],
  authChecker,
});
