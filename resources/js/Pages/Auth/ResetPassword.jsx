import React, { useState } from 'react';
import { Alert, Box, Button, Card, CardContent, CircularProgress, Stack, TextField, Typography } from '@mui/material';

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    setMessage('If this email exists, a reset link has been sent.');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2, bgcolor: '#f5f7fb' }}>
      <Card sx={{ width: '100%', maxWidth: 420 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} mb={2}>Reset Password</Typography>
          {message ? <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert> : null}
          <Stack component="form" spacing={2} onSubmit={submit}>
            <TextField label="Email" type="email" required fullWidth />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={20} color="inherit" /> : 'Send Reset Link'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
