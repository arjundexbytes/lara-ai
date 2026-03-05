import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Card, CardContent, CircularProgress, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { enterpriseApi } from '@/services/api/enterpriseApi';

export default function Register() {
  const [plans, setPlans] = useState([]);
  const [planId, setPlanId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    enterpriseApi.getSubscriptions().then((data) => setPlans(data.plans || [])).catch(() => null);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await new Promise((r) => setTimeout(r, 500));
    } catch {
      setError('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2, bgcolor: '#f5f7fb' }}>
      <Card sx={{ width: '100%', maxWidth: 460 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} mb={2}>Create Enterprise Account</Typography>
          {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}
          <Stack component="form" spacing={2} onSubmit={submit}>
            <TextField label="Name" required fullWidth />
            <TextField label="Email" type="email" required fullWidth />
            <TextField label="Password" type="password" required fullWidth />
            <TextField label="Plan" select value={planId} onChange={(e) => setPlanId(e.target.value)} required fullWidth>
              {plans.map((plan) => <MenuItem key={plan.id} value={String(plan.id)}>{plan.name}</MenuItem>)}
            </TextField>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={20} color="inherit" /> : 'Register'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
