import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_authed");
    if (saved === "1") setAuth(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const envPass = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;
    if (!envPass) {
      toast({ title: "Admin no configurado", description: "Define VITE_ADMIN_PASSWORD en .env para proteger el panel." });
      return;
    }

    if (password === envPass) {
      setAuth(true);
      sessionStorage.setItem("admin_authed", "1");
      toast({ title: "Acceso concedido", description: "Has accedido al panel administrador." });
    } else {
      toast({ title: "Contraseña incorrecta", description: "Intenta nuevamente." });
    }
  };

  const handleLogout = () => {
    setAuth(false);
    sessionStorage.removeItem("admin_authed");
    toast({ title: "Sesión cerrada" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-6">
      <div className="w-full max-w-md">
        {!auth ? (
          <form onSubmit={handleLogin} className="space-y-4 bg-background border border-border rounded-md p-6">
            <h2 className="text-2xl font-bold">Panel Administrador - Login</h2>
            <p className="text-sm text-muted-foreground">Introduce la contraseña del panel para continuar.</p>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
            <Button type="submit" className="w-full">Entrar</Button>
          </form>
        ) : (
          <div className="bg-background border border-border rounded-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Panel Administrador</h2>
              <Button variant="outline" onClick={handleLogout}>Cerrar sesión</Button>
            </div>
            <p className="text-sm text-muted-foreground">Aquí puedes añadir la funcionalidad del panel: ver solicitudes, exportar datos, etc.</p>
            <div className="pt-4">
              <ul className="list-disc pl-5 text-sm">
                <li>Solicitudes enviadas (placeholder)</li>
                <li>Logs y métricas (placeholder)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
