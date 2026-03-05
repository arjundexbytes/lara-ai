import React from 'react';
import Alert from '@/src/components/alerts/Alert';

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: unknown): void {
    console.error('[ErrorBoundary]', error);
  }

  public render(): React.ReactNode {
    if (this.state.hasError) return <Alert>Something went wrong.</Alert>;
    return this.props.children;
  }
}
