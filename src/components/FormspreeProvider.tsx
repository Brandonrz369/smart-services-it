'use client';

import { FormspreeProvider as BaseFormspreeProvider } from "@formspree/react";
import React from "react";

export default function FormspreeProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <BaseFormspreeProvider project="xzzeddgr">
      {children}
    </BaseFormspreeProvider>
  );
}