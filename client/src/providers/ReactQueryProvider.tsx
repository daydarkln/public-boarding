import { FC, ReactNode } from "react";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
  QueryClientProviderProps,
} from "@tanstack/react-query";

export interface IReactQueryProviderProps
  extends Omit<QueryClientProviderProps, "client"> {
  config?: QueryClientConfig;
  children?: ReactNode;
}

export const queryClient = new QueryClient({
  queryCache: undefined,
  mutationCache: undefined,
});

const ReactQueryProvider: FC<IReactQueryProviderProps> = (props) => {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
