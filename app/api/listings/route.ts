// import { NextResponse } from "next/server";
// import prisma from "@/app/libs/prismadb";

// import getCurrentUser from "@/app/actions/getCurrentUser";


// export async function POST(request: Request) {

//     const currentUser = await getCurrentUser();

//     if(!currentUser) {
//         return NextResponse.error();

//     }

//     const body = await request.json();





//     const {
//         category,
//         location,
//         bedCountPerRoom,
//         wardCount,
//         unitCount,
//         imageSrc,
//         price,
//         title,
//         description
//     } = body;


//     // checking if any of the required params is missing
//     Object.keys(body).forEach((value: any) => {
//         if(!body[value]) {
//             return NextResponse.error();
//         }
//     })


// //     for (const value of Object.values(body)) {
// //     if (!value) {
// //       return NextResponse.error();
// //     }
// //   }

//     const listing = await prisma.listing.create({
//         data: {
//             title,
//             description,
//             imageSrc,
//             category,
//             locationValue: location.value,
//             unitCount,
//             wardCount,
//             bedCountPerRoom,
//             userId: currentUser.id,
//             price: parseInt(price, 10)
//         }
//     });

//     return NextResponse.json(listing);
// }

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    category,
         location,
         bedCountPerRoom,
         wardCount,
         unitCount,
         imageSrc,
         price,
         title,
         description
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,             description,             imageSrc,             category,             locationValue: location.value,             unitCount,             wardCount,             bedCountPerRoom,             userId: currentUser.id,             price: parseInt(price, 10)
    }
  });

  return NextResponse.json(listing);
}
