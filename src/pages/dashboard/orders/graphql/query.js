import { gql } from "@apollo/client";

export const ORDERS = gql`
  query($id:ID){
    orders(id:$id){
      edges{
        node{
          id
          createdOn
          isDeleted
          deletedOn
          finalPrice
          status
          deliveryDate
          finalPrice
          dueAmount
          paidAmount
          note
          orderCarts(addedFor: "141"){
            edges{
              node{
                id
                quantity
                priceWithTax
                totalPriceWithTax
                orderedQuantity
                item{
                  id
                  priceWithTax
                  name
                  attachments{
                  edges{
                    node{
                      fileUrl
                      isCover
                    }
                  }
                }
                }
              }
            }
          }
        }
      }
    }
}
`
export const ORDER = gql`
  query ($id:ID!,$addedFor: String) {
    order(id:$id){
      id
      createdOn
      isDeleted
      deliveryDate
      finalPrice
      status
      createdOn
      isDeleted
      paymentType
      companyAllowance
      shippingCharge
      dueAmount
      discountAmount
      paidAmount
      isFullPaid
      note
      shippingAddress{
      address
      city
      state
      postCode
      fullName
      phone
    }
    billingAddress{
      firstName
      lastName
      address
      phone
    }
    orderCarts{
      edges{
        node{
          id
          cancelled
          orderedQuantity
          priceWithTax
          totalPriceWithTax
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
          users(addedFor:$addedFor){
            edges{
              node{
                id
                dueAmount
                addedFor{
                  id
                  username
                  email
                  firstName
                  lastName
                  postCode
                  photoUrl
                  role
                  isDeleted
                  phone
                  dueAmount
                }
              }
            }
          }
        }
      }
    }
  }
  }
`