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
