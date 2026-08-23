import Link from "next/link";
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-[0_0_0_1px_rgba(124,108,240,0.4),0_8px_24px_rgba(124,108,240,0.25)] hover:bg-[#8b7ef5] hover:shadow-[0_0_0_1px_rgba(124,108,240,0.5),0_12px_32px_rgba(124,108,240,0.3)] active:scale-[0.98]",
  secondary:
    "border border-border-strong bg-surface-elevated/60 text-foreground hover:border-accent/40 hover:bg-surface-elevated active:scale-[0.98]",
  ghost: "text-muted hover:text-foreground hover:bg-white/5 active:scale-[0.98]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base min-h-[48px]",
};

function isHashLink(href: string) {
  return href.startsWith("#");
}

function isExternalLink(href: string, external?: boolean) {
  return (
    external ||
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...rest
  } = props;

  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    className,
  ].join(" ");

  if ("href" in props && props.href) {
    const { href, external } = props;
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

    if (isHashLink(href)) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }

    if (isExternalLink(href, external)) {
      return (
        <a
          href={href}
          className={classes}
          {...(external || href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
