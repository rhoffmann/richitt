export const REGISTER_MUTATION = `
  mutation RegisterUser($username:String!, $password:String!) {
    register(options: { username:$username, password:$password }) {
      errors {
        field
        message
      }
      user {
        id
        createdAt
        username
        email
      }
    }
}`;
