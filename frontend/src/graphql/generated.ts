import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ObjMap: { input: any; output: any; }
  ResolveToSourceArgs: { input: any; output: any; }
};

export type CreateProductRequest_Input = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateProductVariantRequest_Input = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export enum HttpMethod {
  Connect = 'CONNECT',
  Delete = 'DELETE',
  Get = 'GET',
  Head = 'HEAD',
  Options = 'OPTIONS',
  Patch = 'PATCH',
  Post = 'POST',
  Put = 'PUT',
  Trace = 'TRACE'
}

export type InventoryItem = {
  __typename?: 'InventoryItem';
  id: Scalars['Int']['output'];
  inventoryState: InventoryState;
  productVersionId: Scalars['Int']['output'];
};

export enum InventoryState {
  Available = 'AVAILABLE',
  Sold = 'SOLD'
}

export type Mutation = {
  __typename?: 'Mutation';
  createInventoryItem?: Maybe<InventoryItem>;
  createProduct?: Maybe<Product>;
  createProductVariant?: Maybe<ProductVariant>;
};


export type MutationCreateInventoryItemArgs = {
  id: Scalars['Int']['input'];
};


export type MutationCreateProductArgs = {
  input?: InputMaybe<CreateProductRequest_Input>;
};


export type MutationCreateProductVariantArgs = {
  id: Scalars['Int']['input'];
  input?: InputMaybe<CreateProductVariantRequest_Input>;
};

export type Product = {
  __typename?: 'Product';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  variants?: Maybe<Array<Maybe<ProductVariant>>>;
};

export type ProductVariant = {
  __typename?: 'ProductVariant';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  items?: Maybe<Array<Maybe<InventoryItem>>>;
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  product?: Maybe<Product>;
  productVariant?: Maybe<ProductVariant>;
  products?: Maybe<Array<Maybe<Product>>>;
};


export type QueryProductArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductVariantArgs = {
  id: Scalars['Int']['input'];
};

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products?: Array<{ __typename?: 'Product', id: number, name: string, description: string } | null> | null };

export type GetProductQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: number, name: string, description: string, variants?: Array<{ __typename?: 'ProductVariant', id: number, name: string, description: string } | null> | null } | null };

export type GetProductVariantQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetProductVariantQuery = { __typename?: 'Query', productVariant?: { __typename?: 'ProductVariant', id: number, name: string, description: string, items?: Array<{ __typename?: 'InventoryItem', id: number, inventoryState: InventoryState } | null> | null } | null };

export type CreateProductMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct?: { __typename?: 'Product', id: number, name: string, description: string } | null };

export type CreateProductVariantMutationVariables = Exact<{
  product: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
}>;


export type CreateProductVariantMutation = { __typename?: 'Mutation', createProductVariant?: { __typename?: 'ProductVariant', id: number, name: string, description: string } | null };

export type CreateInventoryItemMutationVariables = Exact<{
  productVariant: Scalars['Int']['input'];
}>;


export type CreateInventoryItemMutation = { __typename?: 'Mutation', createInventoryItem?: { __typename?: 'InventoryItem', id: number, inventoryState: InventoryState } | null };

export type ProductInfoFragment = { __typename?: 'Product', id: number, name: string, description: string };

export type ProductVariantInfoFragment = { __typename?: 'ProductVariant', id: number, name: string, description: string };

export type InventoryItemInfoFragment = { __typename?: 'InventoryItem', id: number, inventoryState: InventoryState };

export const ProductInfoFragmentDoc = gql`
    fragment ProductInfo on Product {
  id
  name
  description
}
    `;
export const ProductVariantInfoFragmentDoc = gql`
    fragment ProductVariantInfo on ProductVariant {
  id
  name
  description
}
    `;
export const InventoryItemInfoFragmentDoc = gql`
    fragment InventoryItemInfo on InventoryItem {
  id
  inventoryState
}
    `;
export const GetProductsDocument = gql`
    query getProducts {
  products {
    ...ProductInfo
  }
}
    ${ProductInfoFragmentDoc}`;
export const GetProductDocument = gql`
    query getProduct($id: Int!) {
  product(id: $id) {
    ...ProductInfo
    variants {
      ...ProductVariantInfo
    }
  }
}
    ${ProductInfoFragmentDoc}
${ProductVariantInfoFragmentDoc}`;
export const GetProductVariantDocument = gql`
    query getProductVariant($id: Int!) {
  productVariant(id: $id) {
    ...ProductVariantInfo
    items {
      ...InventoryItemInfo
    }
  }
}
    ${ProductVariantInfoFragmentDoc}
${InventoryItemInfoFragmentDoc}`;
export const CreateProductDocument = gql`
    mutation createProduct($name: String!, $description: String!) {
  createProduct(input: {name: $name, description: $description}) {
    ...ProductInfo
  }
}
    ${ProductInfoFragmentDoc}`;
export const CreateProductVariantDocument = gql`
    mutation createProductVariant($product: Int!, $name: String!, $description: String!) {
  createProductVariant(
    id: $product
    input: {name: $name, description: $description}
  ) {
    ...ProductVariantInfo
  }
}
    ${ProductVariantInfoFragmentDoc}`;
export const CreateInventoryItemDocument = gql`
    mutation createInventoryItem($productVariant: Int!) {
  createInventoryItem(id: $productVariant) {
    ...InventoryItemInfo
  }
}
    ${InventoryItemInfoFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getProducts(variables?: GetProductsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductsQuery>(GetProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProducts', 'query');
    },
    getProduct(variables: GetProductQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductQuery>(GetProductDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProduct', 'query');
    },
    getProductVariant(variables: GetProductVariantQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductVariantQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductVariantQuery>(GetProductVariantDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductVariant', 'query');
    },
    createProduct(variables: CreateProductMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateProductMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateProductMutation>(CreateProductDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createProduct', 'mutation');
    },
    createProductVariant(variables: CreateProductVariantMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateProductVariantMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateProductVariantMutation>(CreateProductVariantDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createProductVariant', 'mutation');
    },
    createInventoryItem(variables: CreateInventoryItemMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateInventoryItemMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateInventoryItemMutation>(CreateInventoryItemDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createInventoryItem', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;