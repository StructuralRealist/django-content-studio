import { PiFileBold } from "react-icons/pi";

export function MediaFormat({ value }: { value: any }) {
  return value ? (
    // @ts-ignore
    value.type === "image" ? (
      <img
        src={value.thumbnail}
        className="size-8 rounded object-cover"
        alt=""
      />
    ) : (
      <div className="size-8 rounded flex items-center justify-center bg-stone-200">
        {value.type === "file" && (
          <span>
            <PiFileBold />
          </span>
        )}
      </div>
    )
  ) : null;
}
