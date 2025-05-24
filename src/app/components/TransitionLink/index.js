"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function TransitionLink({ children, href, ...props }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (event) => {
    if (pathname === href) return;

    event.preventDefault();

    setTimeout(() => {
      router.push(href);
    }, 1000);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
