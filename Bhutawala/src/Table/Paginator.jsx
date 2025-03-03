import React from 'react'

export default function Paginator({ first, rows, totalRecords, onPageChange }) {
  return (
    <div className="paginator-container">
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onPageChange={onPageChange}
      />
    </div>
  )
}
