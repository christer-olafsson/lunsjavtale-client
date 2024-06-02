import { gql } from "@apollo/client";

export const ORDERS = gql`
  query{
    orders{
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
// export const ORDERS = gql`
//   query($addedFor: String){
//     orders{
//       edges{
//         node{
//           id
//           createdOn
//           isDeleted
//           deletedOn
//           finalPrice
//           status
//           deliveryDate
//           finalPrice
//           orderCarts(addedFor: "141"){
//             edges{
//               node{
//                 id
//                 quantity
//                 priceWithTax
//                 totalPriceWithTax
//                 orderedQuantity
//                 item{
//                   id
//                   priceWithTax
//                   name
//                   attachments{
//                   edges{
//                     node{
//                       fileUrl
//                       isCover
//                     }
//                   }
//                 }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
// }
// `
export const ORDER = gql`
  query ($id:ID!,$addedFor: String) {
    order(id:$id){
    id
    createdOn
    isDeleted
    deliveryDate
    finalPrice
    status
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