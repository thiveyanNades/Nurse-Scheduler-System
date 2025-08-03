import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

("use client");

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Something went wrong!</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Sorry, something went wrong.</p>
        </CardContent>
      </Card>
    </div>
  );
}
