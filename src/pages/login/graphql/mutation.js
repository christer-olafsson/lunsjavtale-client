import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!){
    loginUser(email: $email, password:$password){
      success
      access
    }
  }
`

export const SOCIAL_LOGIN = gql`
  mutation SocialLogin ($email: String,$socialId: String! ){
    socialLogin(
    activate:true,
    email:$email,
    needVerification: false,
    socialId: $socialId,
    socialType: "google"
  ){
    success
    access
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