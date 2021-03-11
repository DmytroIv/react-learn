import {gql} from 'apollo-server-express';

const typeDefs = gql`
    type Query {
        user(id: ID!): User!
        isAuth: User!
        categories(catId: ID): [Category]!
        post(id: ID!): Post!
        posts(sort: SortInput, queryBy: QueryByInput): [Post]!
    }

    type Mutation {
        updateUserEmailPass(email: String!, password: String, _id: ID!): User!
        updateUserProfile(name: String, lastname: String, _id: ID!): User!
        authUser(fields: AuthInput!): User!
        signUp(fields: AuthInput!): User!
        createPost(fields: PostInput!): Post!
        updatePost(fields: PostInput!, postId: ID!): Post!
        deletePost(postId: ID!): Post
        createCategory(name: String!): Category!
        updateCategory(name: String!, catId: ID!): Category!
        deleteCategory(catId: ID!): Category
    }
    
    type Category {
        _id: ID!
        name: String!
        author: User!
        posts: [Post]
    }
    
    type Post {
        _id: ID!
        title: String!
        excerpt: String!
        content: String!
        created_at: String!
        updated_at: String
        status: PostStatus!
        author: User!
        #categories: [Category]
        categories: Category
        related(sort: SortInput): [Post]!
    }
    
    type User {
        _id: ID!
        email: String!
        password: String
        name: String
        lastname: String
        token: String
        posts(sort: SortInput): [Post]!
        categories: [Category]
    }
        
    input AuthInput {
        email: String!
        password: String!
    }
    
    input PostInput {
        title: String
        excerpt: String
        content: String
        status: PostStatus
        categories: ID
    }
    
    input SortInput {
        sortBy: String
        order: String
        limit: Int
        skip: Int
    }
    
    input QueryByInput {
        key: String!
        value: String!
    }
    
    enum PostStatus {
        PUBLIC
        DRAFT
    }
`;

export default typeDefs;