import { gql } from "@apollo/client";

export const MEETING_MUTATION = gql`
  mutation FoodMeetingMutation ($input: FoodMeetingMutationInput!){
    foodMeetingMutation(input:$input){
      success
      message
    }
  }
`

export const MEETING_DELETE = gql`
  mutation FoodMeetingDelete ($id: ID){
    foodMeetingDelete(id: $id){
      message
    }
  }
`