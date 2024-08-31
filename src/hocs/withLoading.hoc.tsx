import React, { FC, Suspense } from "react";
import { Loading } from "@app/components/common/Loading";

type ComponentProps<T> = T;

export const withLoading = <T extends Record<string, unknown>>(
  Component: React.ComponentType<T>
): FC<T> => {
  return (props: T) => (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};
