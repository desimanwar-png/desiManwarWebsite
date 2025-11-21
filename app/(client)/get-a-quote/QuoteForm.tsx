'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createQuote } from '@/app/admin/quotes/actions';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const steps = [
  { id: '01', name: 'Product Information', description: 'Tell us about the product you need.' },
  { id: '02', name: 'Shipping Information', description: 'Where should we ship your order?' },
  { id: '03', name: 'Contact Information', description: 'How can we reach you?' },
  { id: '04', name: 'Additional Information', description: 'Anything else we should know?' },
];

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    unit: '',
    portOfDischarge: '',
    country: '',
    shippingTerms: '',
    fullName: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await createQuote(formData);
    if (result.success) {
      toast.success('Your quote request has been sent successfully!');
      setFormData({
        productName: '',
        quantity: '',
        unit: '',
        portOfDischarge: '',
        country: '',
        shippingTerms: '',
        fullName: '',
        email: '',
        companyName: '',
        phoneNumber: '',
        message: '',
      });
      setCurrentStep(0);
    } else {
      toast.error(result.message || 'An error occurred.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card p-8 rounded-2xl shadow-lg">
        {/* Stepper */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentStep >= index ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">{steps[currentStep].name}</h2>
          <p className="text-muted-foreground">{steps[currentStep].description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 0 && (
            <div className="space-y-4 min-h-[250px]">
              <Input type="text" name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} required className="focus-visible:ring-1 focus-visible:ring-offset-0" />
              <Input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required className="focus-visible:ring-1 focus-visible:ring-offset-0" />
              <Select onValueChange={(value) => handleSelectChange('unit', value)} value={formData.unit}>
                <SelectTrigger className="focus-visible:ring-1 focus-visible:ring-offset-0"><SelectValue placeholder="Unit" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">KG</SelectItem>
                  <SelectItem value="ton">Ton</SelectItem>
                  <SelectItem value="metric-ton">Metric Ton</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {currentStep === 1 && (
            <div className="space-y-4 min-h-[250px]">
              <Input type="text" name="portOfDischarge" placeholder="Port of Discharge" value={formData.portOfDischarge} onChange={handleChange} required className="focus-visible:ring-1 focus-visible:ring-offset-0" />
              <Input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required className="focus-visible:ring-1 focus-visible:ring-offset-0" />
              <Select onValueChange={(value) => handleSelectChange('shippingTerms', value)} value={formData.shippingTerms}>
                <SelectTrigger className="focus-visible:ring-1 focus-visible:ring-offset-0"><SelectValue placeholder="Shipping Terms" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cif">CIF</SelectItem>
                  <SelectItem value="fob">FOB</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {currentStep === 2 && (
            <div className="space-y-4 min-h-[250px]">
              <Input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required className="focus-visible:ring-1 focus-visible:ring-offset-0" />
              <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="focus-visible:ring-1 focus-visible:ring-offset-0" />
              <Input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="focus-visible:ring-1 focus-visible:ring-offset-0" />
              <Input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="focus-visible:ring-1 focus-visible:ring-offset-0" />
            </div>
          )}
          {currentStep === 3 && (
            <div className="space-y-4 min-h-[250px]">
              <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} rows={6} className="focus-visible:ring-1 focus-visible:ring-offset-0" />
            </div>
          )}
          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" onClick={prevStep} className={currentStep === 0 ? 'invisible' : ''}>Previous</Button>
            <Button type="button" onClick={nextStep} className={currentStep === steps.length - 1 ? 'hidden' : ''}>Next</Button>
            <Button type="submit" disabled={loading} className={currentStep !== steps.length - 1 ? 'hidden' : ''}>{loading ? 'Submitting...' : 'Submit'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
