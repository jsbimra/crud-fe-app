import { gql } from "@apollo/client";

export const QUERY_EMPLOYEES = gql`
  query {
    employees {
      emp_id
      name
      phoneNumber
      email
      designation
      image
    }
  }
`;

export const QUERY_REVIEW_EMPLOYEES = gql`
  query {
    review_employees {
      emp_id
      name
      phoneNumber
      email
      designation
      image
      reviewed
    }
  }
`;

export const MUTATUON_ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $name: String!
    $phoneNumber: String!
    $email: String!
    $designation: String
    $image: String
  ) {
    addEmployee(
      employee: {
        name: $name
        phoneNumber: $phoneNumber
        email: $email
        designation: $designation
        image: $image
      }
    ) {
      emp_id
      name
    }
  }
`;

export const MUTATUON_UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $emp_id: ID!
    $name: String!
    $email: String!
    $phoneNumber: String!
    $designation: String
    $image: String
  ) {
    updateEmployee(
      employee: {
        emp_id: $emp_id
        name: $name
        phoneNumber: $phoneNumber
        email: $email
        designation: $designation
        image: $image
      }
    ) {
      emp_id
      name
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($emp_id: ID!) {
    deleteEmployee(employee: { emp_id: $emp_id }) {
      message
    }
  }
`;
