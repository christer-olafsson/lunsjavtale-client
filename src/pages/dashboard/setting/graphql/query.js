import { gql } from "@apollo/client";

export const PAYMENT_METHODS = gql`
  query{
  paymentMethods{
    edges{
      node{
        id
        createdOn
        cardHolderName
        cardNumber
        CVV
        expiry
        isDefault
      }
    }
  }
}
`