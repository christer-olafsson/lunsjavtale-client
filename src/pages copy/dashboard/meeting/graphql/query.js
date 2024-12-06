import { gql } from "@apollo/client";

export const FOOD_MEETINGS = gql`
  query{
  foodMeetings{
    edges{
      node{
        id
        createdOn
        updatedOn
        title
        description
        meetingType
        meetingTime
        companyName
        meetingType
        status
        note
        topics{
          edges{
            node{
              id
              name
            }
          }
        }
      }
    }
  }
}
`