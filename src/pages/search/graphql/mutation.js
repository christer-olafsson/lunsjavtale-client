import { gql } from "@apollo/client";

export const SEND_VERIFICATION_MAIL = gql`
  mutation SendVerificationMail ($email: String!){
    sendVerificationMail(email:$email){
    success
    message
  }
  }
`

export const CREATE_VALID_COMPANY = gql`
  mutation CreateValidCompany ($input: ValidCompanyMutationInput!){
    validCreateCompany(input: $input){
      success
      message
      errors{
        messages
        field
      }
    }
  }
`

export const CREATE_COMPANY = gql`
  mutation CreateCompany ($input:CompanyMutationInput!){
    createCompany(input:$input){
      success
      message
    }
  }
`