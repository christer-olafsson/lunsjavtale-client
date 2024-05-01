import { gql } from "@apollo/client";

export const CREATE_COMPANY_STAFF = gql`
  mutation CreateCompanyStaff($input: UserCreationMutationInput!) {
    createCompanyStaff(input: $input) {
      success
      message
    }
  }
`