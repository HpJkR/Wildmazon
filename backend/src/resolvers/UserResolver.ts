import { Arg, Mutation, Query, Resolver } from "type-graphql";
import User, { NewUserInput } from "../entities/User";

@Resolver()
class UserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg("newUserData", { validate: true }) newUserData: NewUserInput
  ) {
    const newUser = new User();
    Object.assign(newUser, newUserData);
    const newUserWithId = await newUser.save();
    return newUserWithId;
  }

  @Query(() => [User])
  async getUsers() {
    return User.find();
  }
}

export default UserResolver;
