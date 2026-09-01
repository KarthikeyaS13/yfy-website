"use client";

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function TopProgressBar() {
  return (
    <ProgressBar
      height="4px"
      color="#8b5cf6"
      options={{ showSpinner: true }}
      shallowRouting
    />
  );
}
