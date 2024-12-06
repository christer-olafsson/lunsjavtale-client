import { gql } from "@apollo/client";

export const ADDRESSES = gql`
  query{
    addresses{
      edges{
        node{
          id
          address
          postCode
          city
          state
          country
          addressType
          fullName
          phone
          instruction
          default
        }
      }
    }
}
`

export const ORDER_SUMMARY = gql`
  query OrderSummary ($companyAllowance: Int){
    orderSummary(companyAllowance:$companyAllowance)
  }
`