import { gql } from "@apollo/client";

export const GET_COMPANY_STAFFS = gql`
 query{
  companyStaffs {
  edges {
    node {
      id
      email
      firstName
      lastName
      dateJoined
      jobTitle
      phone
    }
  }
}
}
`