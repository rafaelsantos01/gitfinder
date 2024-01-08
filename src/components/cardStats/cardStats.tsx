import { Card, CardContent, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

interface IRequest {
  name: string;
  statistics: number;
  icon: any;
}

export default function CardStats({ name, statistics, icon }: IRequest) {
  return (
    <Card className="shadow-md  max-w-72">
      <CardTitle className="flex items-center justify-center mt-2">
        {name}
      </CardTitle>
      <CardContent className="justify-center items-center space-y-1">
        <div className="flex justify-center">{icon}</div>
        <div className="">
          <Label className="flex justify-center min-w-32">{statistics}</Label>
        </div>
      </CardContent>
    </Card>
  );
}
