import { gql } from '@apollo/client';

export const ADD_EXPENSE = gql`
  mutation addExpense(
    $amount: Int!
    $name: String!
    $type: transaction_type_enum
  ) {
    insert_expenses(objects: { amount: $amount, name: $name, type: $type }) {
      affected_rows
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation deleteExpense($id: Int!) {
    delete_expenses(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
