import { useCallback, useContext } from "react";

import type { ConfirmDialogProps } from "@/components/confirm-dialog-provider";
import { ConfirmDialogContext } from "@/lib/confirm-dialog-context";

export default function useConfirmDialog() {
  const { setDialog } = useContext(ConfirmDialogContext);

  return useCallback(
    async (dialog: ConfirmDialogProps): Promise<boolean> => {
      return new Promise((resolve) => {
        setDialog({
          ...dialog,
          onCancel() {
            resolve(false);
          },
          onOk() {
            resolve(true);
          },
        });
      });
    },
    [setDialog],
  );
}
