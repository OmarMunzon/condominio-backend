import { Injectable } from '@nestjs/common';
import { CreateVisitaDto } from './dto/create-visita.dto';
import { UpdateVisitaDto } from './dto/update-visita.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VisitaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVisitaDto: CreateVisitaDto) {
    try {      
      return await this.prisma.visita.create({
        data: createVisitaDto, 
      });
    } catch (error) {
      throw new Error(`Error al crear visita: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.visita.findMany({
        include: {
          visitante: true,
          residente: true,
          qr: true,
        },
      });
    } catch (error) {
      throw new Error(`Error al obtener visitas: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const visita = await this.prisma.visita.findUnique({
        where: { id },
        include: {
          visitante: true,
          residente: true,
          qr: true,
        },
      });
      if (!visita) {
        throw new Error('Visita no encontrada');
      }
      return visita;
    } catch (error) {
      throw new Error(`Error al obtener visita: ${error.message}`);
    }
  }

  async update(id: number, updateVisitaDto: UpdateVisitaDto) {
    try {
      return await this.prisma.visita.update({
        where: { id },
        data: updateVisitaDto,
      });
    } catch (error) {
      throw new Error(`Error al actualizar visita: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.visita.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Error al eliminar visita: ${error.message}`);
    }
  }

  // Método para buscar visitas por ID de residente
  async findByResidenteId(residenteId: number) {
    try {
      return await this.prisma.visita.findMany({
        where: { residenteId },
        include: {
          visitante: true,
          residente: true,
          qr: true,
        },
      });
    } catch (error) {
      throw new Error(`Error al buscar visitas por residente: ${error.message}`);
    }
  }

  // Método para buscar visitas por ID de visitante
  async findByVisitanteId(visitanteId: number) {
    try {
      return await this.prisma.visita.findMany({
        where: { visitanteId },
        include: {
          visitante: true,
          residente: true,
          qr: true,
        },
      });
    } catch (error) {
      throw new Error(`Error al buscar visitas por visitante: ${error.message}`);
    }
  }

  // Método para buscar visitas por fecha (ejemplo: visitas de un día específico)
  async findByFecha(fecha: Date) {
    try {
      return await this.prisma.visita.findMany({
        where: {
          fecha_ingreso: {
            equals: fecha,
          },
        },
        include: {
          visitante: true,
          residente: true,
          qr: true,
        },
      });
    } catch (error) {
      throw new Error(`Error al buscar visitas por fecha: ${error.message}`);
    }
  }
  // Método para autorizar una visita
  async autorizarVisita(id: number) {
    try {
      return await this.prisma.visita.update({
        where: { id },
        data: { estadoVisita: 'AUTORIZADA' },
      });
    } catch (error) {
      throw new Error(`Error al autorizar visita: ${error.message}`);
    }
  }

  // Método para rechazar una visita
  async rechazarVisita(id: number) {
    try {
      return await this.prisma.visita.update({
        where: { id },
        data: { estadoVisita: 'RECHAZADO' },
      });
    } catch (error) {
      throw new Error(`Error al rechazar visita: ${error.message}`);
    }
  }
}
