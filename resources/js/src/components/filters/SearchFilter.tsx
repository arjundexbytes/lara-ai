import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function SearchFilter({ query, onQueryChange, filter, onFilterChange, filterOptions = [] }: { query: string; onQueryChange: (v: string) => void; filter?: string; onFilterChange?: (v: string) => void; filterOptions?: string[] }) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
      <TextField fullWidth label="Search" value={query} onChange={(e) => onQueryChange(e.target.value)} />
      {onFilterChange ? (
        <TextField select label="Filter" value={filter || ''} onChange={(e) => onFilterChange(e.target.value)} sx={{ minWidth: 200 }}>
          <MenuItem value="">All</MenuItem>
          {filterOptions.map((opt) => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
        </TextField>
      ) : null}
    </Stack>
  );
}
