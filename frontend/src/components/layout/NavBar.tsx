import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/button';
import { ThemeToggle } from '../theme/ThemeToggle';
import { MobileNav } from './MobileNav';

export function NavBar() {
    const { isAuthenticated, isAdmin, user, logout } = useAuth();

    return (
        <nav className="border-b">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-xl sm:text-2xl font-bold">
                    Talent Map
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/talents">
                        <Button variant="ghost">Explore Talents</Button>
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link to="/me">
                                <Button variant="ghost">My Profile</Button>
                            </Link>
                            {isAdmin && (
                                <Link to="/admin/talents">
                                    <Button variant="ghost">Admin</Button>
                                </Link>
                            )}
                            <Button variant="outline" onClick={logout}>
                                <span className="hidden lg:inline">Logout ({user?.email})</span>
                                <span className="lg:hidden">Logout</span>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button>Sign Up</Button>
                            </Link>
                        </>
                    )}

                    <ThemeToggle />
                </div>

                {/* Mobile Navigation */}
                <div className="flex md:hidden items-center gap-2">
                    <ThemeToggle />
                    <MobileNav
                        isAuthenticated={isAuthenticated}
                        isAdmin={isAdmin}
                        userEmail={user?.email}
                        onLogout={logout}
                    />
                </div>
            </div>
        </nav>
    );
}
