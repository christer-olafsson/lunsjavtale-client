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
        # status
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