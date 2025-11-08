import React from "react";

import type { ConfirmDialogProps } from "@/components/confirm-dialog-provider";

export const ConfirmDialogContext = React.createContext<{
  setDialog(dialog: ConfirmDialogProps): void;
}>({
  setDialog: () => {},
});
