import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { AuthContext } from '../App';
import { User, LogOut, Calendar } from 'lucide-react';

export default function Header() {
  const { user, logout, setShowAuthModal } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border" data-testid="header">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2" data-testid="logo-link">
            <div className="text-2xl font-semibold font-['Playfair_Display'] text-[hsl(164_28%_38%)]">
              CaterHub
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/dashboard')}
                  className="gap-2"
                  data-testid="dashboard-button"
                >
                  <Calendar className="h-4 w-4" />
                  My Bookings
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="gap-2"
                  data-testid="logout-button"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-secondary" data-testid="user-info">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
              </>
            ) : (
              <Button
                onClick={() => setShowAuthModal(true)}
                className="bg-[hsl(164_28%_38%)] text-[hsl(45_33%_98%)] hover:bg-[hsl(164_28%_34%)]"
                data-testid="login-button"
              >
                Login / Sign Up
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}