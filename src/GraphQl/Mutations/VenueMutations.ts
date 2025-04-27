import gql from 'graphql-tag';

/**
 * GraphQL mutation to create a venue.
 *
 * @param name - Name of the venue.
 * @param capacity - Ineteger representing capacity of venue.
 * @param description - Description of the venue.
 * @param file - Image file for the venue.
 * @param organizationId - Organization to which the ActionItemCategory belongs.
 */

// export const CREATE_VENUE_MUTATION = gql`
//   mutation createVenue(
//     $capacity: Int!
//     $description: String
//     $file: String
//     $name: String!
//     $organizationId: ID!
//   ) {
//     createVenue(
//       data: {
//         capacity: $capacity
//         description: $description
//         file: $file
//         name: $name
//         organizationId: $organizationId
//       }
//     ) {
//       _id
//     }
//   }
// `;

// mutation CreateVenue($input: MutationCreateVenueInput!) {
//  const MutationCreateVenueInput = {
//   name: String!,
//   description: String,
//   file: String,
//   organizationId: ID!,
//   capacity: Int!,
// }

// export const CREATE_VENUE_MUTATION = gql`
//   mutation CreateVenue(
//   $name: String!,
//   $description: String,
//   $organizationId: ID!,
//   $capacity: Int!,
//   ){
//     createVenue(input: $input) {

//       id
//       name
//       description
//       capacity

//       organization {
//         id
//         name
//       }
//       attachments {
//         mimeType
//         url
//       }
//       createdAt
//       updatedAt
//     }
//   }
// `;

// ye sahi hai
// export const CREATE_VENUE_MUTATION = gql`
//   mutation CreateVenue($input: MutationCreateVenueInput!) {
//     createVenue(input: $input) {
//       id
//       name
//       description
//       organization {
//         id
//       }
//       createdAt
//       updatedAt
//     }
//   }
// `;

export const CREATE_VENUE_MUTATION = gql`
  mutation CreateVenue($input: MutationCreateVenueInput!) {
    createVenue(input: $input) {
      id
      name
      description
      organization {
        id
      }
      createdAt
      updatedAt
      attachments {
        mimeType
        name
      }
    }
  }
`;

/**
 * GraphQL mutation to update a venue.
 *
 * @param id - The id of the Venue to be updated.
 * @param capacity - Ineteger representing capacity of venue.
 * @param description - Description of the venue.
 * @param file - Image file for the venue.
 * @param name - Name of the venue.
 */

export const UPDATE_VENUE_MUTATION = gql`
  mutation UpdateVenue($input: MutationUpdateVenueInput!) {
    updateVenue(input: $input) {
      id
      name
      description
      updatedAt
      capacity
      organization {
        id
      }
    }
  }
`;

/**
 * GraphQL mutation to delete a venue.
 *
 * @param id - The id of the Venue to be deleted.
 */

export const DELETE_VENUE_MUTATION = gql`
  mutation DeleteVenue($input: MutationDeleteVenueInput!) {
    deleteVenue(input: $input) {
      id
      name
      description
    }
  }
`;
