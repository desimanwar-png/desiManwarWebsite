import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ValueCard({ value }: { value: any }) {
  const Icon = value.icon;
  return (
    <Card className="bg-card hover:shadow-lg transition-shadow text-center">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 text-primary p-3 rounded-full">
            <Icon className="w-8 h-8" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          {value.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{value.description}</p>
      </CardContent>
    </Card>
  );
}
