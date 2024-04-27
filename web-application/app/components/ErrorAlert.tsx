import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorAlertProps {
  title: string;
  message: string;
  hidden?: boolean;
  setHidden?: (hidden: boolean) => void;
}

export function ErrorAlert(props: ErrorAlertProps) {
  const { title, message, hidden, setHidden } = props;

  setTimeout(() => {
    if (hidden) return;
    if (setHidden) setHidden(true);
  }, 10000);

  return (
    <Alert
      variant="destructive"
      className="mr-10 md:mr-20"
      hidden={hidden ?? false}
    >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="font-bold">{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
