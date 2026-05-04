'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Database, Cpu, Activity, CheckCircle, AlertTriangle } from 'lucide-react';

export default function SystemHealthView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">System Health</h1>
        <p className="mt-2 text-muted-foreground">Monitor system performance and health metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="size-5 text-green-600" />
              Server Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">API Server</span>
              <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                <CheckCircle className="mr-1 size-3" />
                Operational
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Database</span>
              <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                <CheckCircle className="mr-1 size-3" />
                Operational
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">CDN</span>
              <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                <CheckCircle className="mr-1 size-3" />
                Operational
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-5 text-blue-600" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Response Time</span>
              <span className="font-semibold text-foreground">142ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Uptime</span>
              <span className="font-semibold text-foreground">99.98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Active Users</span>
              <span className="font-semibold text-foreground">128</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="size-5 text-purple-600" />
              Resource Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">CPU</span>
                <span className="font-semibold text-foreground">34%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-full w-[34%] rounded-full bg-purple-500" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Memory</span>
                <span className="font-semibold text-foreground">62%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-full w-[62%] rounded-full bg-blue-500" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Storage</span>
                <span className="font-semibold text-foreground">48%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-full w-[48%] rounded-full bg-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-orange-600" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-8">No recent alerts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
