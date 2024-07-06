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
      dueAmount
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

export const USER = gql`
  query User($id: ID){
    user(id: $id){
      id
      createdOn
      isDeleted
      username
      email
      phone
      photoUrl
      firstName
      lastName
      dateJoined
      dateOfBirth
      gender
      postCode
      jobTitle
      address
      about
      dueAmount
      allergies{
        edges{
          node{
            id
            name
          }
        }
      }
      company{
        id
        name
        email
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