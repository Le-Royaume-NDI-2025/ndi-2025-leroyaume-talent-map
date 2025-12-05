import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export function HomePage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    Discover Talents, Build Connections
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
                    Welcome to Talent Map - the platform connecting talented individuals
                    for collaboration and innovation during Nuit de l'Info 2025.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <Link to="/talents" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:w-auto">Explore Talents</Button>
                    </Link>
                    <Link to="/register" className="w-full sm:w-auto">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                            Declare My Talent
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
                    <Card>
                        <CardHeader>
                            <CardTitle>Discover</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Browse through a diverse pool of talented individuals with various skills
                                and expertise.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Connect</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Find collaborators based on skills, location, and availability for your
                                next project.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Collaborate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Build amazing projects together with verified talents from around the
                                world.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
