import { createdResponse, errorResponse } from "@/app/utils/responses";
import prisma from "@/lib/prisma";

interface RequestBody {
  reading: string;
}

export async function POST(request: Request) {
  try {
    const { reading } = (await request.json()) as RequestBody;

    if (!reading) {
      return errorResponse({ message: "No reading provided" });
    }

    if (typeof reading !== "number") {
      return errorResponse({ message: "Reading is not of type 'number'" });
    }

    await prisma.testingMoistureSensor.create({
      data: {
        sensorReading: reading,
      },
    });

    return createdResponse({ message: "Reading added successfully!" });
  } catch (error) {
    return errorResponse({ message: "An unexpected error occurred" });
  }
}
