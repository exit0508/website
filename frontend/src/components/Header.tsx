import { Link } from "wouter";

const Header = () => {
  return (
    <header className="bg-bg dark:bg-bgDark">
      <div className="mx-auto flex h-20 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <div className="text-3xl">
          <Link href="/">
            <a className="text-primary hover:text-primaryHover dark:text-primaryHoverDark">
              Yurina Deguchi
            </a>
          </Link>
        </div>
        <div className="text-xl flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-xl">
              <li>
                <Link href="/about">
                  <a className="text-primary hover:text-primaryHover dark:text-primaryHoverDark">
                    About
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <a className="text-primary hover:text-primaryHover dark:text-primaryHoverDark">
                    Projects
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
