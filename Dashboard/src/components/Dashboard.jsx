import React from 'react'
const Payments = React.lazy(() => import('Payments/Payments'));
const Transactions = React.lazy(() => import('Transactions/Transactions'));

export default function Dashboard() {

  return (
    <div>
      <h1>Payments Module</h1>
      <React.Suspense fallback='Loading Payments'>
          <Payments />
      </React.Suspense>
      <hr />
      <h1>Transactions Module</h1>
      <React.Suspense fallback='Loading Transactions'>
        <Transactions />
      </React.Suspense>
    </div>
  )
}
