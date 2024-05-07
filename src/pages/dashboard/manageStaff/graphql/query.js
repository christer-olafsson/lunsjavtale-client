import { gql } from "@apollo/client";

export const GET_COMPANY_STAFFS = gql`
 query{
  companyStaffs {
  edges {
    node {
      id
      photoUrl
      email
      firstName
      lastName
      dateJoined
      isDeleted
      jobTitle
      phone
      isStaff
      username
      role
      allergies{
        edges{
          node{
             name
            id
          }
        }
      }
    }
  }
}
}
`

export const GET_INGREDIENTS = gql`
  query{
    ingredients{
      edges{
        node{
          id
          name
          isActive
      }
    }
  }
}
`