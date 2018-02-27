import gql from 'graphql-tag';

export default gql`
query ListChats {
    listChats {
      items {
        id
        userId
        message
        createdAt
      }
      nextToken
    }
  }
`;
