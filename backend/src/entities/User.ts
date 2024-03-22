import { hash } from "argon2";
import { IsEmail, IsStrongPassword, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
class User extends BaseEntity {
  static hashPassword(password: string): string | PromiseLike<string> {
    throw new Error("Method not implemented.");
  }
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.hashedPassword = await hash(this.password);
  }

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  nickname: string;

  @Column()
  hashedPassword: string;

  @Column({
    default: "https://github.com/shadcn.png",
  })
  @Field()
  avatar: string;
}

@InputType()
export class NewUserInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  @Length(2, 30)
  nickname: string;

  @Field({ nullable: true })
  avatar?: string;

  @IsStrongPassword()
  @Field()
  password: string;
}

// @InputType()
// export class UpdateUserInput {
//   static hashPassword(password: string): string | PromiseLike<string> {
//     throw new Error("Method not implemented.");
//   }
//   password: string;

//   @BeforeInsert()
//   async hashPassword() {
//     this.hashedPassword = await hash(this.password);
//   }

//   @Field({ nullable: true })
//   @Length(2, 30)
//   nickname?: string;

//   @Field({ nullable: true })
//   avatar?: string;

//   @IsStrongPassword()
//   @Field({ nullable: true })
//   hashedPassword?: string;
// }

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @Length(2, 30)
  nickname?: string;

  @Field({ nullable: true })
  avatar?: string;

  @IsStrongPassword()
  @Field({ nullable: true })
  password?: string;
}

@InputType()
export class UpdatePassword {
  @IsStrongPassword()
  @Field({ nullable: true })
  password?: string;
}

@InputType()
export class LoginInput {
  @IsEmail()
  @Field()
  email: string;

  @IsStrongPassword()
  @Field()
  password: string;
}

export default User;
