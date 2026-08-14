import { Card, CardContent } from "@/components/ui/card";

type Props = {
  title: string;
  value: string | number;
  description?: string;
};

const StatsCard = ({ title, value, description }: Props) => {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{title}</p>

        <p className="mt-2 text-2xl font-bold">{value}</p>

        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
