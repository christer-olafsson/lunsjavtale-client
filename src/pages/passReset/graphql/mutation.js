import { gql } from "@apollo/client";

export const RESET_PASSWORD = gql`
  mutation ResetPassword ($email:String!,$token:String!,$password1:String!,$password2:String!){
    resetPassword(email:$email,token:$token,password1:$password1,password2:$password2){
    success
    message
  }
  }
`