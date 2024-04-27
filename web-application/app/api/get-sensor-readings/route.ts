import { errorResponse, okResponse } from "@/app/utils/responses";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const sensorReadings = await prisma.moistureSensorReadings.findMany();

    return okResponse({ data: sensorReadings });
  } catch (error) {
    return errorResponse({ message: "Failed to retrieve sensor readings" });
  }
}
