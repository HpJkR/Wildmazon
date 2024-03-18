import { IsEmail, IsStrongPassword, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  nickname: string;

  @Field()
  @Column()
  hashedPassword: string;
}

@InputType()
export class NewUserInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  @Length(2, 30)
  nickname: string;

  @IsStrongPassword()
  @Field()
  password: string;
}

export default User;
