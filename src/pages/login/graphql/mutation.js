import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!){
    loginUser(email: $email, password:$password){
      success
      access
      user{
      id
      username
      email
      firstName
      lastName
      isStaff
      postCode
      role
      jobTitle
      address
      about
      photoUrl
      company{
        id
        name
        email
        postCode
        logoUrl
        noOfEmployees
        addresses{
          edges{
            node{
        			address
            }
          }
        }
      }
    }
    }
  }
`

export const LOGOUT = gql`
  mutation{
  logout{
    success
    message
  }
}
`


export const PASSWORD_RESET = gql`
  mutation PasswordResetMail ($email: String!){
    passwordResetMail(email:$email){
      success
      message
  }
}
`