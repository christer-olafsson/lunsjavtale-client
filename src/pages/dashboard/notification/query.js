import { gql } from "@apollo/client";

export const USER_NOTIFICATIONS = gql`
  query{
 userNotifications{
  edges{
    node{
      id
      title
      message
      isSeen
      status
      sentOn
      objectId
    }
  }
}
}
`
export const UNREAD_NOTIFICATION_COUNT = gql`
  query{
  unreadNotificationCount
}
`