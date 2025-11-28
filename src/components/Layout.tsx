import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BarChart2, Upload, Settings, Users, LogOut, Menu, FileText, Bot, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  onLinkClick: () => void;
}

const navItems: Omit<NavLinkProps, 'onLinkClick'>[] = [
  { href: '/', icon: BarChart2, label: 'Dashboard' },
  { href: '/upload', icon: Upload, label: 'Upload' },
  { href: '/chat', icon: Bot, label: 'Chat' },
  { href: '/admin', icon: Users, label: 'Administration' },
];

const NavLink: React.FC<Omit<NavLinkProps, 'onLinkClick'> & { onLinkClick?: () => void }> = ({ href, icon: Icon, label, onLinkClick }) => {
  const { pathname } = useLocation();
  const isActive = pathname === href;
  return (
    <Link
      to={href}
      onClick={onLinkClick}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
        isActive && 'bg-muted text-primary'
      )}
    >
      <Icon className='h-4 w-4' />
      {label}
    </Link>
  );
};

interface NavContentProps {
    onLinkClick: () => void;
}

const NavContent: React.FC<NavContentProps> = ({ onLinkClick }) => (
  <div className='flex flex-col h-full'>
    <nav className='grid items-start px-2 text-sm font-medium lg:px-4 gap-1'>
      {navItems.map((item) => (
        <NavLink key={item.href} {...item} onLinkClick={onLinkClick} />
      ))}
    </nav>
    <div className='mt-auto p-4'>
      <nav className='grid items-start px-2 text-sm font-medium lg:px-4 gap-1'>
        <NavLink href='/settings' icon={Settings} label='Settings' onLinkClick={onLinkClick} />
        <Link
          to='/login'
          onClick={onLinkClick}
          className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
        >
          <LogOut className='h-4 w-4' />
          Logout
        </Link>
      </nav>
    </div>
  </div>
);

export default function Layout() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleLinkClick = () => {
    if (sheetOpen) {
      setSheetOpen(false);
    }
  };

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <Link to='/' className='flex items-center gap-2 font-semibold'>
              <FileText className='h-6 w-6 text-primary' />
              <span className=''>SomaScribe</span>
            </Link>
          </div>
          <div className='flex-1 overflow-auto py-2'>
            <NavContent onLinkClick={handleLinkClick} />
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='shrink-0 md:hidden'
              >
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='flex flex-col p-0 w-[280px] sm:w-[280px]'>
                <div className='flex h-14 items-center border-b px-4'>
                    <Link to='/' onClick={handleLinkClick} className='flex items-center gap-2 font-semibold'>
                      <FileText className='h-6 w-6 text-primary' />
                      <span className=''>SomaScribe</span>
                    </Link>
                </div>
                <div className='flex-1 py-2 overflow-y-auto'>
                    <NavContent onLinkClick={handleLinkClick} />
                </div>
            </SheetContent>
          </Sheet>
          <div className='w-full flex-1'>
            {/* Breadcrumbs or page title can go here */}
          </div>
          <ThemeToggle />
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 overflow-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
