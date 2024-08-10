import { gql } from "@apollo/client";

export const ORDER_PAYMENTS = gql`
  query{
  orderPayments{
    edges{
      node{
        id
        createdOn
        paymentInfo
        paidAmount
        paymentType
        status
        paymentFor{
          id
          username
          email
          firstName
          lastName
      }
        company{
          id
          name
          email
          contact
          postCode
          isBlocked
          status
          logoUrl
        }
      }
    }
  }
}
`