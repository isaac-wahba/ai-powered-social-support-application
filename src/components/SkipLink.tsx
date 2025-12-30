import { Link } from "@mui/material";

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

/**
 * Skip link component for keyboard navigation
 * Allows users to skip to main content
 */
export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <Link
      href={href}
      sx={{
        position: "absolute",
        top: "-40px",
        left: 0,
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        padding: "8px 16px",
        textDecoration: "none",
        zIndex: 10000,
        "&:focus": {
          top: 0,
        },
      }}
    >
      {children}
    </Link>
  );
}
