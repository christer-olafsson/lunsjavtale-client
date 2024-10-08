import { gql } from "@apollo/client";

export const GET_SINGLE_PRODUCTS = gql`
  query Products ($id: ID, $category: String) {
      products(id:$id, category: $category){
        edges{
          node{
          id
          name
          priceWithTax
          actualPrice
          description
          availability
          discountAvailability
          isDeleted
          title
          contains
          vendor{
            id
            name
            email
            isDeleted
          }
          ingredients{
            edges{
              node{
                id
                name
                description
                isActive
              }
            }
          }
          attachments{
            edges{
              node{
                id
                fileUrl
                fileId
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
`

export const ADDED_CARTS_LIST = gql`
  query{
  addedCartsList{
    date
    totalPrice
    carts {
      edges {
        node {
          id
          createdOn
          date
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
}
`

export const ADDED_CARTS = gql`
  query{
    addedCarts{
      edges{
        node{
          id
          createdOn
          quantity
          date
          totalPrice
          totalPriceWithTax
          priceWithTax
          price
          orderedQuantity
          item{
            id
            name
            priceWithTax
            description
            category{
              id
              name
            }
            attachments{
              edges{
                node{
                  id
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
`

export const ADDED_PRODUCTS = gql`
  query{
  addedProducts{
    edges{
      node{
        id
        name
        priceWithTax
        productCarts{
          edges{
            node{
              id
              quantity
              totalPriceWithTax
            }
          }
        }
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
          isActive
        }
      }
    }
  }
}
`

export const GET_ONLINE_PAYMENT_INFO = gql`
  query GetOnlinePaymentInfo($id:ID){
    getOnlinePaymentInfo(id:$id)
  }
`
export const VENDORS = gql`
  query($name: String,$hasProduct: Boolean){
    vendors(name: $name,hasProduct:$hasProduct){
      edges{
        node{
          id
          createdOn
          name
          email
          contact
          postCode
          soldAmount
          isBlocked
          logoUrl
          fileId
          isDeleted
          products{
            edges{
              node{
                id
              }
            }
          }
          users{
          edges{
            node{
              id
              username
              firstName
              lastName
              role
              photoUrl
            }
          }
        }
        }
      }
   }
}
`

export const WEEKLY_VARIANTS = gql`
  query WeeklyVariants {
    weeklyVariants {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`