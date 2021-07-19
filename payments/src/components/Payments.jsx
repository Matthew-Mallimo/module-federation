import React from 'react'

export default function Payments() {
  const [showLoader, setShowLoader] = React.useState(false);
  const [success, showSuccess] = React.useState(false);

  const onClick = () => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      showSuccess(true);
    }, 1000);
  }

  return (
    <div>
      <h1>You currently owe $345.23</h1>
      {showLoader && <p>Loading...</p>}
      { success && <p style={{ color: 'green' }}>Payment successful. Thank you.</p> }
      <div>
        <button onClick={onClick} type="button">Make Payment</button>
      </div>
    </div>
  )
}
