import { ReactNode } from 'react';
import Breadcrumbs from './Breadcrumbs';
import AuthorCard from './AuthorCard';
import AreasFooter from './AreasFooter';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface WikiLayoutProps {
  children: ReactNode;
  breadcrumbs: BreadcrumbItem[];
  showAuthorCard?: boolean;
  showAreasFooter?: boolean;
  rightSidebarContent?: ReactNode;
  customGridRatio?: string;
  noOuterWrapper?: boolean;
}

export default function WikiLayout({ 
  children, 
  breadcrumbs, 
  showAuthorCard = true,
  showAreasFooter = true,
  rightSidebarContent,
  customGridRatio,
  noOuterWrapper = false
}: WikiLayoutProps) {
  // Default to 3:1 ratio, but allow custom ratio like "7:5" or "9:3"
  const getGridClasses = () => {
    if (customGridRatio === "9:3") {
      return {
        container: "grid grid-cols-1 lg:grid-cols-12 gap-8",
        main: "lg:col-span-9",
        sidebar: "lg:col-span-3"
      };
    }
    if (customGridRatio === "7:5") {
      return {
        container: "grid grid-cols-1 lg:grid-cols-12 gap-8",
        main: "lg:col-span-7",
        sidebar: "lg:col-span-5"
      };
    }
    // Default 3:1 ratio
    return {
      container: "grid grid-cols-1 lg:grid-cols-4 gap-8",
      main: "lg:col-span-3",
      sidebar: "lg:col-span-1"
    };
  };

  const gridClasses = getGridClasses();

  const content = (
    <>
      {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
      
      <div className={gridClasses.container}>
        {/* Main content */}
        <div className={gridClasses.main}>
          {children}
        </div>
        
        {/* Sidebar */}
        <div className={`${gridClasses.sidebar} space-y-6`}>
          {rightSidebarContent}
          {showAuthorCard && <AuthorCard />}
          {showAreasFooter && <AreasFooter />}
        </div>
      </div>
    </>
  );

  if (noOuterWrapper) {
    return content;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {content}
      </div>
    </div>
  );
}
