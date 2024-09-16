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
//user req for change food
export const USER_CART_UPDATE = gql`
  mutation UserCartUpdate ($id:ID,$item:ID){
    userCartUpdate(id:$id,item:$item){
      message
    }
  }
`

//company accept user food req
export const CONFIRM_USER_CART_UPDATE = gql`
  mutation ConfirmUserCartUpdate ($id:ID,$status: String){
    confirmUserCartUpdate(
    id: $id # requested alter-cart id
    status: $status
  ){
    success
    message
  }
  }
`