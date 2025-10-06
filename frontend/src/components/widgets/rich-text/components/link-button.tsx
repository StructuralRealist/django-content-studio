import type { Editor } from "@tiptap/core";
import * as R from "ramda";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PiLinkBold } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function LinkButton({ editor }: { editor: Editor }) {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const hasSelection = !R.isNil(editor.view.state.selection.content().toJSON());

  return (
    <>
      {edit && (
        <LinkEditDialog editor={editor} onClose={() => setEdit(false)} />
      )}
      <Tooltip>
        <TooltipContent>
          {editor.isActive("link")
            ? t("widgets.rich_text_editor.update_link")
            : t("widgets.rich_text_editor.set_link")}
        </TooltipContent>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            disabled={!hasSelection && !editor.isActive("link")}
            onClick={() => setEdit(true)}
          >
            <PiLinkBold />
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </>
  );
}

const LinkEditDialog = ({
  editor,
  onClose,
}: {
  editor: Editor;
  onClose: VoidFunction;
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(editor.getAttributes("link").href ?? "");
  const isEdit = editor.isActive("link");

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? t("widgets.rich_text_editor.update_link")
              : t("widgets.rich_text_editor.set_link")}
          </DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <Input
            placeholder="https://"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <DialogFooter>
          {isEdit && (
            <Button
              variant="destructive"
              className="mr-auto"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                onClose();
              }}
            >
              {t("widgets.rich_text_editor.remove_link")}
            </Button>
          )}
          <Button variant="ghost" onClick={() => onClose()}>
            {t("common.cancel")}
          </Button>
          <Button
            onClick={() => {
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: value })
                .run();
              onClose();
            }}
          >
            {isEdit
              ? t("widgets.rich_text_editor.update_link")
              : t("widgets.rich_text_editor.set_link")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
