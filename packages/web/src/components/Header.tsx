"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconLogo } from "./icons/IconLogo";
import { IconGitHub } from "./icons/IconGitHub";
import { IconNpm } from "./icons/IconNpm";
import { IconMenu } from "./icons/IconMenu";
import { IconClose } from "./icons/IconClose";



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
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </Link>
  );
}


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
            target="_blank"
            rel="noopener noreferrer"
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
          <NavLink href="/#skills">Skills</NavLink>
          <NavLink href="/#workflows">Workflows</NavLink>
          <NavLink href="/#mcp">MCP</NavLink>

          <NavLink
            href="https://github.com/ivannikov-pro/ai-agent-kit"
            external
          >
            <span className="flex items-center gap-1.5">
              <IconGitHub className="w-4 h-4" />
              GitHub
            </span>
          </NavLink>
          <NavLink
            href="https://www.npmjs.com/package/@ivannikov-pro/ai-agent-kit"
            external
          >
            <span className="flex items-center gap-1.5">
              <IconNpm className="w-4 h-4" />
              npm
            </span>
          </NavLink>
        </nav>

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
            <NavLink href="/#skills" onClick={() => setIsMobileMenuOpen(false)}>
              Skills
            </NavLink>
            <NavLink href="/#workflows" onClick={() => setIsMobileMenuOpen(false)}>
              Workflows
            </NavLink>
            <NavLink href="/#mcp" onClick={() => setIsMobileMenuOpen(false)}>
              MCP
            </NavLink>

            <div className="h-px bg-slate-200 w-full my-2"></div>
            <NavLink href="https://ivannikov.pro" external>
              <span className="flex items-center gap-2">
                <IconLogo className="w-5 h-5" />
                IVANNIKOV.PRO
              </span>
            </NavLink>
            <NavLink href="https://github.com/ivannikov-pro/ai-agent-kit" external>
              <span className="flex items-center gap-2">
                <IconGitHub className="w-4 h-4" />
                GitHub
              </span>
            </NavLink>
            <NavLink href="https://www.npmjs.com/package/@ivannikov-pro/ai-agent-kit" external>
              <span className="flex items-center gap-2">
                <IconNpm className="w-4 h-4" />
                npm
              </span>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
