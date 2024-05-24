import { gql } from "@apollo/client";

export const ADDRESS_MUTATION = gql`
  mutation AddressMutation ($input:AddressMutationInput!){
    addressMutation(input:$input){
      message
    }
  }
`