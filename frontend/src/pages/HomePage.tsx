import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export function HomePage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <h1 className="text-5xl font-bold tracking-tight">
                    Discover Talents, Build Connections
                </h1>
                <p className="text-xl text-muted-foreground">
                    Welcome to Talent Map - the platform connecting talented individuals
                    for collaboration and innovation during Nuit de l'Info 2025.
                </p>

                <div className="flex gap-4 justify-center">
                    <Link to="/talents">
                        <Button size="lg">Explore Talents</Button>
                    </Link>
                    <Link to="/register">
                        <Button size="lg" variant="outline">
                            Declare My Talent
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-12">
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
