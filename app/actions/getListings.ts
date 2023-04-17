import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  unitCount?: number;
  wardCount?: number;
  bedCountPerRoom?: number;
  locationValue?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      // userId,
      unitCount, 
      wardCount, 
      bedCountPerRoom, 
      locationValue,
      startDate,
      endDate,
       category,
    } = params;

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (unitCount) {
      query.unitCount = {
        gte: +unitCount
      }
    }

    if (wardCount) {
      query.wardCount = {
        gte: +wardCount
      }
    }

    if (bedCountPerRoom) {
      query.bedCountPerRoom = {
        gte: +bedCountPerRoom
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservation: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

    

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
