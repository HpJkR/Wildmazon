import { Arg, Mutation, Resolver } from "type-graphql";
import User, { NewUserInput } from "../entities/User";

@Resolver()
class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("newUserData") newUserData: NewUserInput) {
    console.log(newUserData);
  }
}

export default UserResolver;
