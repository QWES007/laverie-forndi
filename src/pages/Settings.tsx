
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserManagement from "@/components/settings/UserManagement";
import ClothingManagement from "@/components/settings/ClothingManagement";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Paramètres</h1>
        
        <Tabs defaultValue="users" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="clothing">Gestion des vêtements et tarifs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des utilisateurs</CardTitle>
                <CardDescription>
                  Ajoutez et gérez les utilisateurs avec différents niveaux d'accès
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserManagement />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="clothing">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des vêtements et tarifs</CardTitle>
                <CardDescription>
                  Ajoutez de nouveaux types de vêtements et définissez leurs tarifs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ClothingManagement />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
