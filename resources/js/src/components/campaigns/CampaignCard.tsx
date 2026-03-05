import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@/src/components/cards/Card';
import Badge from '@/src/components/badges/Badge';

export default function CampaignCard({ campaign }: { campaign: { name: string; status: string; description?: string } }) {
  return <Card><Stack spacing={1}><Typography variant="h6">{campaign.name}</Typography><Badge label={campaign.status} color={campaign.status === 'active' ? 'success' : 'info'} /><Typography variant="body2">{campaign.description || 'No description'}</Typography></Stack></Card>;
}
