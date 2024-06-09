import { gql } from "@apollo/client";

export const GET_COMPANY_STAFFS = gql`
 query(
  $title: String,
    ){
  companyStaffs(
    title: $title,
     ) {
  edges {
    node {
      id
      photoUrl
      fileId
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
      # dueAmount
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