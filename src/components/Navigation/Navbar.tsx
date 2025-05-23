import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { UserMenu } from './UserMenu';

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                QazLine
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
              >
                {t('navigation.home')}
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
              >
                {t('navigation.courses')}
              </Link>
              <Link
                href="/benefits"
                className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
              >
                {t('navigation.benefits')}
              </Link>
              <Link
                href="/testimonials"
                className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
              >
                {t('navigation.testimonials')}
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
              >
                {t('navigation.about')}
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}; 