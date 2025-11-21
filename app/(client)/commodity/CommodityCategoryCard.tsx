import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function CommodityCategoryCard({ category }: { category: any }) {
  return (
    <Card className="bg-card hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          {/* I will use a placeholder icon for now */}
          <div className="bg-primary/10 text-primary p-3 rounded-full">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
        </div>
        <ul className="space-y-2 text-muted-foreground">
          {category.items.map((item: string, index: number) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
