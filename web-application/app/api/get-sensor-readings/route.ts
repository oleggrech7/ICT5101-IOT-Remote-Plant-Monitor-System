import { errorResponse, okResponse } from "@/app/utils/responses";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic'
export async function GET() {
  try {
    const sensorReadings = await prisma.moistureSensorReadings.findMany();

    return okResponse(
      { data: sensorReadings },
      {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
      }
    );
  } catch (error) {
    return errorResponse({ message: "Failed to retrieve sensor readings" });
  }
}
