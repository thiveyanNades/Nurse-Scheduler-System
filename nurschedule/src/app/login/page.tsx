import { login, signup } from "./actions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>

        {/* LOGIN FORM */}
        <form action={login}>
          <CardContent className="grid gap-4">
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
              />
            </div> */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">Log In</Button>
          </CardFooter>
        </form>

        {/* SIGNUP FORM */}
        <form action={signup}>
          <CardFooter className="flex justify-between">
            <Button type="submit" variant="secondary">
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
