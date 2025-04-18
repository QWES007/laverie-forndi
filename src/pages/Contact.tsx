
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";

const Contact = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-laundry-700 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-laundry-700 mb-6"></h2>
              <p className="text-gray-600 mb-8">
                
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-laundry-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-laundry-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900"></h3>
                    <p className="text-gray-600"></p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-laundry-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-laundry-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900"></h3>
                    <p className="text-gray-600"></p>
                    <p className="text-gray-600"></p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-laundry-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-laundry-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900"></h3>
                    <p className="text-gray-600"></p>
                    <p className="text-gray-600"></p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4"></h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-laundry-100 p-3 rounded-lg hover:bg-laundry-200 transition-colors">
                    
                  </a>
                  <a href="#" className="bg-laundry-100 p-3 rounded-lg hover:bg-laundry-200 transition-colors">
                    
                  </a>
                  <a href="#" className="bg-laundry-100 p-3 rounded-lg hover:bg-laundry-200 transition-colors">
                    
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6"></h2>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName"></Label>
                    <Input id="firstName" placeholder="" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName"></Label>
                    <Input id="lastName" placeholder="" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email"></Label>
                  <Input id="email" type="email" placeholder="" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone"></Label>
                  <Input id="phone" placeholder="" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject"></Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="information"></SelectItem>
                      <SelectItem value="demo"></SelectItem>
                      <SelectItem value="quote"></SelectItem>
                      <SelectItem value="support"></SelectItem>
                      <SelectItem value="other"></SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message"></Label>
                  <Textarea id="message" placeholder="" rows={5} />
                </div>
                
                <Button type="submit" className="w-full">
                  
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12"></h2>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-96 bg-laundry-100 rounded-lg flex items-center justify-center">
              <p className="text-laundry-600 font-semibold"></p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6"></h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            
          </p>
          <Button size="lg" className="bg-white text-laundry-600 hover:bg-laundry-50">
            
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
