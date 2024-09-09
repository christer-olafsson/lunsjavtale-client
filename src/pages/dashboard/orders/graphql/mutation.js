import { gql } from "@apollo/client";

export const CART_UPDATE = gql`
  mutation CartUpdate ($id: ID, $quantity: Int, $addedFor: [ID]){
    cartUpdate(id:$id, quantity: $quantity, addedFor: $addedFor){
      message
    }
  }
`

export const CREATE_PAYMENT = gql`
  mutation CreatePayment ($input: OrderPaymentMutationInput!){
      createPayment(input: $input){
      message
    }
  }
`