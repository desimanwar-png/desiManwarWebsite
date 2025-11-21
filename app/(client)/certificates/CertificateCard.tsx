import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function CertificateCard({ certificate }: { certificate: any }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="relative h-64">
          <Image
            src={certificate.image}
            alt={certificate.name}
            fill
            className="object-contain"
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg font-semibold">{certificate.name}</CardTitle>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Issued by: {certificate.issuedBy}</p>
      </CardFooter>
    </Card>
  );
}
