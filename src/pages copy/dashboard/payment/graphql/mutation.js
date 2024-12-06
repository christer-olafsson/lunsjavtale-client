import { gql } from "@apollo/client";

export const MAKE_ONLINE_PAYMENT = gql`
  mutation MakeOnlinePayment ($input:MakeOnlinePaymentMutationInput!){
    makeOnlinePayment(input : $input){
      paymentUrl
      message
    }
  }
`