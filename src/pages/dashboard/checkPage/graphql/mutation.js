import { gql } from "@apollo/client";

export const ADDRESS_MUTATION = gql`
  mutation AddressMutation ($input:AddressMutationInput!){
    addressMutation(input:$input){
      message
    }
  }
`

export const ADDRESS_DELETE = gql`
  mutation AddressDelete ($id: ID!){
    addressDelete(id:$id){
    message
  }
  }
`