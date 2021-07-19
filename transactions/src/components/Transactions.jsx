import React from 'react'

export default function Transactions() {

  return (
    <div>
      <h1>Transactions</h1>
      <table>
        <tr>
          <th>Merchant Name</th>
          <th>Price</th>
          <th>Location</th>
        </tr>
        <tr>
          <td>Best Buy</td>
          <td>$456.78</td>
          <td>Sunrise</td>
        </tr>
        <tr>
          <td>Publix</td>
          <td>$102.42</td>
          <td>Plantation</td>
        </tr>
        <tr>
          <td>Walgreens</td>
          <td>$13.45</td>
          <td>Weston</td>
        </tr>
      </table>
    </div>
  )
}
