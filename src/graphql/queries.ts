import { gql } from '@apollo/client';

export const FETCH_EXPENSES = gql`
  query fetchExpenses {
    expenses {
      id
      name
      type
      amount
      created_at
    }
  }
`;
