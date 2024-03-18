import { buildSchema } from 'type-graphql';
import ProductResolver from './resolvers/ProductResolver';
import UserResolver from './resolvers/UserResolver';

export default buildSchema({
  resolvers: [ProductResolver, UserResolver],
});