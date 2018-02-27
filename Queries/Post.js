import gql from 'graphql-tag';

export default gql`
mutation Post(
  $userId: String!,
  $message: String!,
  $createdAt: String!
) {
  post(userId: $userId, message: $message, createdAt: $createdAt) {
    id
    userId
    message
    createdAt
  }
}
`;
