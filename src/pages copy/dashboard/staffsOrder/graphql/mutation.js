import { gql } from "@apollo/client";

export const APPROVE_CART_REQUEST = gql`
  mutation ApproveCartRequest ($id: [ID]!, $requestStatus: String){
    approveCartRequest(ids:$id, requestStatus: $requestStatus){
      message
    }
  }
`