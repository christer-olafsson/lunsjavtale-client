import { gql } from "@apollo/client";

export const ADDED_EMPLOYEE_CARTS = gql`
  query{
  addedEmployeeCarts{
    edges{
      node{
        id
        date
        createdOn
        priceWithTax
        totalPriceWithTax
        orderedQuantity
        dueAmount
        requestStatus
        item{
          id
          priceWithTax
          name
          attachments{
            edges{
              node{
                id
                fileUrl
                isCover
              }
            }
          }
          category{
            id
            name
          }
        }
      }
    }
  }
}
`