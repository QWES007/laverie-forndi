
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";

export type Client = {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
};

interface ClientFormProps {
  onSubmit: (data: Client) => void;
  orderId: string;
  dateRetrait: string;
  setDateRetrait: (date: string) => void;
  formMethods: ReturnType<typeof useForm<Client>>;
}

const ClientForm: React.FC<ClientFormProps> = ({ 
  orderId, 
  dateRetrait, 
  setDateRetrait, 
  formMethods 
}) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRetrait(e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-laundry-600">Informations Client</CardTitle>
        <CardDescription>N° Commande: {orderId}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...formMethods}>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input {...formMethods.register("nom")} placeholder="Nom du client" />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input {...formMethods.register("prenom")} placeholder="Prénom du client" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input {...formMethods.register("telephone")} placeholder="Numéro de téléphone" />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...formMethods.register("email")} placeholder="Adresse email" type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Date de retrait</FormLabel>
              <FormControl>
                <Input type="date" value={dateRetrait} onChange={handleDateChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ClientForm;
