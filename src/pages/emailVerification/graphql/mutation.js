import { gql } from "@apollo/client";

export const EMAIL_VERIFY = gql`
  mutation EmailVerify ($token: String!){
    emailVerify(token:$token){
    success
    message
  }
  }
`