"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconLogo } from "./icons/IconLogo";
import { IconGitHub } from "./icons/IconGitHub";
import { IconNpm } from "./icons/IconNpm";
import { IconMenu } from "./icons/IconMenu";
import { IconClose } from "./icons/IconClose";
import { getExternalLinkProps } from "../utils/getExternalLinkProps";



function NavLink({
  href,
  children,
  external,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"
      onClick={onClick}
      {...(external
        ? getExternalLinkProps()
        : {})}
    >
      {children}
    </Link>
  );
}

const NAV_LINKS = [
  { href: "/#skills", label: "Skills" },
  { href: "/#workflows", label: "Workflows" },
  { href: "/#mcp", label: "MCP Servers" },
];

const EXTERNAL_LINKS = [
  { href: "https://ivannikov.pro", label: "IVANNIKOV.PRO", Icon: IconLogo },
  { href: "https://github.com/ivannikov-pro/ai-agent-kit", label: "GitHub", Icon: IconGitHub },
  { href: "https://www.npmjs.com/package/@ivannikov-pro/ai-agent-kit", label: "npm", Icon: IconNpm },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 backdrop-blur-xl bg-white/85">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Link
            href="https://ivannikov.pro"
            {...getExternalLinkProps()}
            className="hidden sm:flex items-center gap-2 text-lg font-bold tracking-tight text-slate-500 hover:text-slate-900 transition-colors"
          >
            <IconLogo className="w-5 h-5" />
            IVANNIKOV.PRO
          </Link>
          <span className="hidden sm:block text-slate-400 font-light text-xl">/</span>
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-500 transition-colors">
              AI-AGENT-KIT
            </span>
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-500 border border-indigo-500/20 uppercase tracking-wider"
            >
              OSS
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          {EXTERNAL_LINKS.slice(1).map((link) => (
            <NavLink key={link.href} href={link.href} external>
              <span className="flex items-center gap-1.5">
                <link.Icon className="w-4 h-4" />
                {link.label}
              </span>
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 -mr-2 text-slate-900 hover:text-indigo-500 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <IconClose className="w-6 h-6" />
          ) : (
            <IconMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-white border-t border-slate-200 p-6 z-40">
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                {link.label}
              </NavLink>
            ))}

            <div className="h-px bg-slate-200 w-full my-2"></div>

            {EXTERNAL_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} external>
                <span className="flex items-center gap-2">
                  <link.Icon className="w-5 h-5" />
                  {link.label}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
