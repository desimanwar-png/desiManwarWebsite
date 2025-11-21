import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ServiceCard({ service }: { service: any }) {
  const Icon = service.icon;
  return (
    <Card className="bg-card hover:shadow-lg transition-shadow text-center">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 text-primary p-3 rounded-full">
            <Icon className="w-8 h-8" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{service.description}</p>
        <div className="h-1 w-1/3 bg-accent mx-auto mt-6 rounded-full"></div>
      </CardContent>
    </Card>
  );
}
