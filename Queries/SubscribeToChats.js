import gql from 'graphql-tag';

export default gql`
subscription {
  subscribeToChats {
    id
    userId
    message
    createdAt
  }
}
`;
