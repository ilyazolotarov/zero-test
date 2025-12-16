import { mutators } from '@repo/zero/mutators';
import { ZeroProvider } from '@repo/zero/react';
import { schema } from '@repo/zero/schema';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import Header from '../components/Header';

export const Route = createRootRoute({
  component: () => (
    <ZeroProvider
      userID="tmp"
      cacheURL={import.meta.env.VITE_PUBLIC_ZERO_CACHE_URL}
      schema={schema}
      mutators={mutators}
    >
      <Header />
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </ZeroProvider>
  ),
});
