
import { Injectable } from '@nestjs/common';
import { CreateVisitanteDto } from './dto/create-visitante.dto';
import { UpdateVisitanteDto } from './dto/update-visitante.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VisitanteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVisitanteDto: CreateVisitanteDto) {
    return this.prisma.visitante.create({
      data: createVisitanteDto,
    });
  }

  async findAll() {
    return this.prisma.visitante.findMany();
  }

  async findOne(id: number) {
    return this.prisma.visitante.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateVisitanteDto: UpdateVisitanteDto) {
    return this.prisma.visitante.update({
      where: { id },
      data: updateVisitanteDto,
    });
  }

  async remove(id: number) {
    return this.prisma.visitante.delete({
      where: { id },
    });
  }
}
