import { Link } from "wouter";

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <div className="">
          <Link href="/">
            <a className="hover:text-gray-200">Yurina Deguchi</a>
          </Link>
        </div>
        <nav>
          <ul className="">
            <li>
              <Link href="/about">
                <a className="hover:text-gray-200">About</a>
              </Link>
            </li>
            <li>
              <Link href="/portfolio">
                <a className="hover:text-gray-200">Portfolio</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
