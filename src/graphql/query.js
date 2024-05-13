import { gql } from "@apollo/client";


export const ME = gql`
  query{
    me{
      id
      email
      firstName
      lastName
      username
      phone
      postCode
      gender
      role
      jobTitle
      dateOfBirth
      address
      about
      photoUrl
      fileId
      company{
        id
        name
        email
        postCode
        logoUrl
        totalEmployee
      }
      allergies{
        edges{
          node{
            id
            name
          }
        }
      }
    }
  }
`

export const GET_ALL_CATEGORY = gql`
query{
  categories{
  edges{
    node{
      id
      name
      description
      isActive
      products(isDeleted: false, availability : true){
        edges{
          node{
            id
            name
            title
            actualPrice
            priceWithTax
            contains
            description
            availability
            discountAvailability
            isDeleted
            attachments{
              edges{
                node{
                  id
                  fileUrl
                }
              }
            }
            ingredients{
              edges{
                node{
                  id
                  name
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

export const GET_SINGLE_CATEGORY = gql`
  query SingleCategory ($id: ID){
    category(id: $id){
      name
      products(isDeleted: false, availability: true){
        edges{
          node{
            id
            name
            title
            actualPrice
            description
            attachments{
              edges{
                node{
                  fileUrl
              }
            }
          }
        }
      }
    }
    }
  }
`

export const CHECk_POST_CODE = gql`
  query CheckPostCode ($postCode: Int){
    checkPostCode(postCode: $postCode)
  }
`