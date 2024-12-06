import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation AddToCart ($dates: [CartInput], $ingredients: [ID], $item: ID){
    addToCart(dates:$dates,ingredients:$ingredients,item:$item){
      success
    }
  }
`

export const REMOVE_PRODUCT_CART = gql`
  mutation RemoveProductCart ($id: ID) {
    removeProductCart(id:$id){
      message
    }
  }
`
export const REMOVE_CART = gql`
  mutation RemoveCart ($id: ID) {
    removeCart(id:$id){
      message
    }
  }
`

export const SEND_CART_REQUEST = gql`
  mutation SendCartRequest {
    sendCartRequest{
      success
      message
    }
  }
`