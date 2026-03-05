import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@/src/components/buttons/Button';
import Modal from '@/src/components/modals/Modal';

export default function RolePermissionModal({ open, onClose, options, selected = [], onSave }: { open: boolean; onClose: () => void; options: string[]; selected?: string[]; onSave: (permissions: string[]) => void }) {
  const [local, setLocal] = useState<string[]>(selected);
  return <Modal open={open} onClose={onClose} title="Manage Role Permissions"><FormGroup>{options.map((opt) => <FormControlLabel key={opt} control={<Checkbox checked={local.includes(opt)} onChange={(e) => setLocal((p) => e.target.checked ? [...new Set([...p, opt])] : p.filter((x) => x !== opt))} />} label={opt} />)}</FormGroup><Button onClick={() => onSave(local)}>Save</Button></Modal>;
}
