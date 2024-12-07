import { classes } from "@/utils/index.ts";

export type CanvasProjectCardProps = {
  title: string;
  link: string;
  imageLink: string;
};

export function CanvasProjectCard(props: CanvasProjectCardProps) {
  return (
    <a
      class={classes(
        "group/card",
        "min-h-[180px] w-full",
        "flex flex-col items-center",
        "cursor-pointer rounded-2xl overflow-hidden",
        "bg-backgroundDark",
        // 'hover:bg-backgroundLight focus-visible:bg-backgroundLight',

        // 'shadow-md',
        "hover:shadow-xl focus-visible:shadow-xl",
        "shadow-text4",
        "hover:shadow-text4 focus-visible:shadow-text4",
      )}
      href={props.link}
    >
      <img
        class={classes("block w-full aspect-video object-contain")}
        alt={props.title}
        src={props.imageLink}
        loading="lazy"
      />
      <span
        class={classes(
          "my-3 text-xl text-text2",
          "group-hover/card:text-text group-focus/card:text-text",
        )}
      >
        {props.title}
      </span>
    </a>
  );
}
