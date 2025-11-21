import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FeatureCard({ feature }: { feature: any }) {
  const Icon = feature.icon;
  return (
    <Card className="border border-secondary-base dark:text-primary-base rounded-xl p-6 text-center shadow-md hover:shadow-lg transition duration-300">
      <CardHeader>
        <div className="text-secondary-base text-4xl mb-4">
          <Icon className="text-secondary-base w-10 h-10 mx-auto mb-4" />
        </div>
        <CardTitle className="text-secondary-dark dark:text-primary-base text-lg font-semibold mb-2 tracking-wide">
          {feature.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-secondary-dark dark:text-primary-base text-sm text-justify">
          {feature.description}
        </p>
      </CardContent>
    </Card>
  );
}
