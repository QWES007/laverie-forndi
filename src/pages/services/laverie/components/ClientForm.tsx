
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Client } from "../types";

interface ClientFormProps {
  form: UseFormReturn<Client>;
  orderId: string;
  dateRetrait: string;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ form, orderId, dateRetrait, handleDateChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-laundry-600">Informations Client</CardTitle>
        <CardDescription>N° Commande: {orderId}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input {...form.register("nom")} placeholder="Nom du client" />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input {...form.register("prenom")} placeholder="Prénom du client" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input {...form.register("telephone")} placeholder="Numéro de téléphone" />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...form.register("email")} placeholder="Adresse email" type="email" />
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
