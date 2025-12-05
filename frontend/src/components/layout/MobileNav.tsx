import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Menu, User, LogOut, Shield } from 'lucide-react';
import { Separator } from '../ui/separator';

interface MobileNavProps {
    isAuthenticated: boolean;
    isAdmin: boolean;
    userEmail?: string;
    onLogout: () => void;
}

export function MobileNav({ isAuthenticated, isAdmin, userEmail, onLogout }: MobileNavProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                    <Link to="/talents">
                        <Button variant="ghost" className="w-full justify-start">
                            Explore Talents
                        </Button>
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Separator />
                            <div className="px-2 py-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                    <User className="h-4 w-4" />
                                    <span className="truncate">{userEmail}</span>
                                </div>
                            </div>

                            <Link to="/me">
                                <Button variant="ghost" className="w-full justify-start">
                                    <User className="h-4 w-4 mr-2" />
                                    My Profile
                                </Button>
                            </Link>

                            {isAdmin && (
                                <Link to="/admin/talents">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Shield className="h-4 w-4 mr-2" />
                                        Admin
                                    </Button>
                                </Link>
                            )}

                            <Separator />

                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={onLogout}
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Separator />
                            <Link to="/login">
                                <Button variant="ghost" className="w-full">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button className="w-full">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
