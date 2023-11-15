"use client";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

// create a new instance of the QueryClient
const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {/* children is a special prop that let you pass components as data to other components */}
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;

// TODO: deep dive into the QueryClientProvider
