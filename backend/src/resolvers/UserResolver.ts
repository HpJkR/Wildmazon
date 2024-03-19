import { verify } from "argon2";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import User, { LoginInput, NewUserInput } from "../entities/User";
import env from "../env";
import { Context } from "../types";

@Resolver()
class UserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg("newUserData", { validate: true }) newUserData: NewUserInput
  ) {
    const existingUser = await User.findOneBy({ email: newUserData.email });
    if (existingUser) {
      throw new GraphQLError("User with this email already exists");
    }

    const newUser = new User();
    Object.assign(newUser, newUserData);
    const newUserWithId = await newUser.save();
    return newUserWithId;
  }

  @Query(() => [User])
  async getUsers() {
    return User.find();
  }

  @Mutation(() => String)
  // async login(@Arg("data") data: LoginInput) {
  async login(@Arg("data") data: LoginInput, @Ctx() ctx: Context) {
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser === null) {
      throw new GraphQLError("Invalid credentials");
    }
    const isPasswordValid = await verify(
      existingUser.hashedPassword,
      data.password
    );
    if (!isPasswordValid) {
      throw new GraphQLError("Invalid credentials");
    }

    const token = jwt.sign({ userId: existingUser.id }, env.JWT_PRIVATE_KEY, {
      expiresIn: "1h",
    });
    ctx.res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: env.NODE_ENV === "production",
    });

    return token;
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: Context) {
    return ctx.currentUser;
  }
}

export default UserResolver;
