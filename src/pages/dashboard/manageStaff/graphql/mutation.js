import { gql } from "@apollo/client";

export const CREATE_COMPANY_STAFF = gql`
  mutation CreateCompanyStaff($input: UserCreationMutationInput!) {
    createCompanyStaff(input: $input) {
      success
      message
    }
  }
`

export const USER_DELETE = gql`
  mutation UserDelete ($email: String!){
    userDelete(email:$email){
      success
      message 
    }
  }
`

export const USER_PASSWORD_RESET = gql`
  mutation UserPasswordReset ($id:ID!, $password: String!){
    userPasswordReset(id:$id, password:$password){
      message
    }
  }
`