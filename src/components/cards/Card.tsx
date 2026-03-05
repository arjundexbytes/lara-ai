import React from 'react';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function Card({ children }: { children: React.ReactNode }) {
  return <MuiCard><CardContent>{children}</CardContent></MuiCard>;
}
