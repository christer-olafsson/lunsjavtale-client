import { gql } from "@apollo/client";

export const GENERAL_PROFILE_UPDATE = gql`
  mutation GeneralProfileUpdate($input: UserMutationInput!){
    generalProfileUpdate(input: $input){
      success
      message
  }
  }
`
export const ACCOUNT_PROFILE_UPDATE = gql`
  mutation AccountProfileUpdate($input: UserAccountMutationInput!){
    accountProfileUpdate(input: $input){
      success
      message
    }
  }
`

export const BILLING_ADDRESS_MUTATION = gql`
  mutation BillingAddressMutation($input: CompanyBillingAddressMutationInput!){
    companyBillingAddressMutation(input:$input){
    message
  }
  }
`

export const COMPANY_MUTATION = gql`
  mutation CompanyMutation ($input: CompanyMutationForAdminInput!){
    companyMutation(input:$input){
      message
    }
  }
`

export const PAYMENT_METHOD_MUTATION = gql`
  mutation PaymentMethodMutation ($input: PaymentMethodMutationInput!){
    paymentMethodMutation(input: $input){
      message
    }
  }
`
export const DELETE_PAYMENT_METHOD = gql`
  mutation DeletePaymentMethod ($id: ID){
    deletePaymentMethod(id: $id){
      message
    }
  }
`