import { gql } from "@apollo/client";

export const ADDRESS_MUTATION = gql`
  mutation AddressMutation ($input:AddressMutationInput!){
    addressMutation(input:$input){
      message
    }
  }
`

export const ADDRESS_DELETE = gql`
  mutation AddressDelete ($id: ID!){
    addressDelete(id:$id){
    message
  }
  }
`

export const PLACE_ORDER = gql`
  mutation PlaceOrder (
    $billingAddress: BillingAddressInput,
    $companyAllowance: Int,
    $paymentType: String,
    $shippingAddress: ID
    ) {
        placeOrder(
        billingAddress: $billingAddress,
        companyAllowance: $companyAllowance,
        paymentType: $paymentType,
        shippingAddress: $shippingAddress
        ) {
          success
        }
      }
    `