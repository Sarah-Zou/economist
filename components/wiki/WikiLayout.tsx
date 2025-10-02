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
}

export default function WikiLayout({ 
  children, 
  breadcrumbs, 
  showAuthorCard = true,
  showAreasFooter = true 
}: WikiLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              {children}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {showAuthorCard && <AuthorCard />}
            {showAreasFooter && <AreasFooter />}
          </div>
        </div>
      </div>
    </div>
  );
}
