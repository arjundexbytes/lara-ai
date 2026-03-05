import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@/src/components/buttons/Button';
import { APP_ROUTES } from '@/src/utils/constants';

export default function Sidebar() {
  const links = [
    ['Dashboard', APP_ROUTES.dashboard], ['Chat', APP_ROUTES.chat], ['Users', APP_ROUTES.users], ['Roles', APP_ROUTES.roles], ['Permissions', APP_ROUTES.permissions], ['Products', APP_ROUTES.products], ['Orders', APP_ROUTES.orders], ['Documents', APP_ROUTES.documents], ['Settings', APP_ROUTES.settings], ['Uploads', APP_ROUTES.uploads], ['Horizon', APP_ROUTES.horizon],
  ] as const;

  return <Stack spacing={1}>{links.map(([label, href]) => <Button key={href} variant="secondary" href={href}>{label}</Button>)}</Stack>;
}
