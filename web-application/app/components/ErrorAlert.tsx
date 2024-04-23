import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorAlertProps {
  title: string;
  message: string;
}

export function ErrorAlert(props: ErrorAlertProps) {
  const { title, message } = props;

  return (
    <Alert variant="destructive" className="mr-10 md:mr-20">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="font-bold">{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
