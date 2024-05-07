import { gql } from "@apollo/client";

export const GENERAL_PROFILE_UPDATE = gql`
  mutation GeneralProfileUpdate($input: UserMutationInput!){
    generalProfileUpdate(input: $input){
      success
      message
  }
  }
`
export const ACCOUNT_PROFILE_UPDATE = gql`
  mutation AccountProfileUpdate($input: UserAccountMutationInput!){
    accountProfileUpdate(input: $input){
      success
      message
    }
  }
`