
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ParentAlert } from '@/lib/pcdc-types';
import { cn } from '@/lib/cn';

const alertColors: Record<ParentAlert['type'], string> = {
    'low_activity': 'text-primary',
    'missed_assessment': 'text-danger',
    'grade_drop': 'text-danger',
};

export default function AlertsCard({ alerts }: { alerts: ParentAlert[] }) {
    if (alerts.length === 0) {
        return null; // Don't show the card if no alerts
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Important Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {alerts.map(alert => (
                    <div key={alert.id} className="flex items-start space-x-3">
                        <span className={cn("w-2 h-2 rounded-full mt-2", alertColors[alert.type].replace('text-', 'bg-'))}></span>
                        <div>
                            <p className="text-sm font-medium">{alert.message}</p>
                            <p className="text-xs text-muted-foreground">{new Date(alert.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
