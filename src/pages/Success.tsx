import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Success = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted p-4">
            <Card className="max-w-md w-full text-center card-shadow-lg animate-in fade-in zoom-in duration-500">
                <CardHeader className="pb-4">
                    <div className="flex justify-center mb-4">
                        <CheckCircle2 className="w-20 h-20 text-green-500" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-primary">¡Aplicación Enviada!</CardTitle>
                    <CardDescription className="text-lg mt-2">
                        Hemos recibido tu información correctamente.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                        Nuestro equipo revisará tu perfil y nos pondremos en contacto contigo lo antes posible para continuar con el proceso de tu crédito vehicular.
                    </p>

                    <div className="pt-4">
                        <Link to="/">
                            <Button className="w-full gap-2" size="lg">
                                <Home className="w-4 h-4" />
                                Volver al Inicio
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Success;
