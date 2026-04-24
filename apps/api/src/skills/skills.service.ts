import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(category?: string) {
    return this.prisma.skill.findMany({
      where: category ? { category } : undefined,
      orderBy: [{ category: "asc" }, { order: "asc" }, { name: "asc" }]
    });
  }
}
