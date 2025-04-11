import { Admin, Prisma } from "../../../generated/prisma";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { adminSearchAbleFields } from "./admin.constant";

const getAllFromDB = async (params: any, options: any) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.AdminWhereInput[] = [];

  //console.log(filterData);
  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          //   for case sensitive
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  //console.dir(andConditions, { depth: 'infinity' })
  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.admin.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleIdFromDB = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  data: Partial<Admin>
): Promise<Admin> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteFromDB = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.delete({
      where: {
        id,
      },
    });

    await transactionClient.user.delete({
      where: {
        email: adminDeletedData.email,
      },
    });

    return adminDeletedData;
  });

  return result;
};

export const AdminService = {
  getAllFromDB,
  getSingleIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
