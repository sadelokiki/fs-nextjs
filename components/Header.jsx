import Link from 'next/link';
import { useRouter } from 'next/router';

export const Header = () => {
  const { pathname } = useRouter();

  const isActive = (path) => pathname === path;

  return (
    <nav>
      <Link href="/">
        <b>Journal</b>
      </Link>
      <style jsx>{`
        nav {
          padding: 2rem;
        }
      `}</style>
    </nav>
  );
};
