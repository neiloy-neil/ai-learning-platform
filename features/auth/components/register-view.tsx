
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function RegisterView() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name">Name</label>
            <Input id="name" type="text" placeholder="Alex Doe" />
          </div>
          <div className="space-y-1">
            <label htmlFor="email">Email</label>
            <Input id="email" type="email" placeholder="name@example.com" />
          </div>
          <div className="space-y-1">
            <label htmlFor="password">Password</label>
            <Input id="password" type="password" />
          </div>
          <div className="space-y-1">
            <label htmlFor="confirm-password">Confirm Password</label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button className="w-full">Create Account</Button>
        </form>
      </CardContent>
    </Card>
  );
}
