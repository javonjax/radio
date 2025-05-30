import { Github, Linkedin } from 'lucide-react';

// Environment variables.
const GITHUB_LINK = process.env.NEXT_PUBLIC_GITHUB_LINK;
const LINKEDIN = process.env.NEXT_PUBLIC_LINKEDIN;
const Footer = () => {
  return (
    <footer>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center rounded-none border-0 p-6 text-2xl text-[hsl(var(--text-color))]">
        <div className="flex w-full items-center justify-between">
          <p>Created by Javon Jackson</p>
          <div className="flex">
            <a className="cursor-pointer" target="_blank" href={GITHUB_LINK}>
              <Github className="mx-2" />
            </a>
            <a className="cursor-pointer" target="_blank" href={LINKEDIN}>
              <Linkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
