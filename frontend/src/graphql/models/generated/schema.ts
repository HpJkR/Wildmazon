/* tslint:disable */ /* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  createUser: User;
  deleteProduct: Scalars['Boolean'];
  login: Scalars['String'];
};


export type MutationCreateProductArgs = {
  data: ProductInput;
};


export type MutationCreateUserArgs = {
  newUserData: NewUserInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};

export type NewUserInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  nickname: Scalars['String'];
  password: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  picture: Scalars['String'];
  price: Scalars['Float'];
};

export type ProductInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
  price: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getProductById: Product;
  getUsers: Array<User>;
  products: Array<Product>;
  profile: User;
};


export type QueryGetProductByIdArgs = {
  productId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  nickname: Scalars['String'];
};
