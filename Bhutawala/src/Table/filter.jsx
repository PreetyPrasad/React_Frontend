import React, { useState } from 'react';
import { Paginator } from 'primereact/paginator';

export default function Filter() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  return (
    <div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={100} // Change this based on your data count
        rowsPerPageOptions={[5, 10, 25, 50]}
        onPageChange={(e) => {
          setFirst(e.first);
          setRows(e.rows);
        }}
      />
    </div>
  );
}
