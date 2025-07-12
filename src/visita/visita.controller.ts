import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { VisitaService } from './visita.service';
import { CreateVisitaDto } from './dto/create-visita.dto';
import { UpdateVisitaDto } from './dto/update-visita.dto';

@Controller('visita')
export class VisitaController {
  constructor(private readonly visitaService: VisitaService) {}

  @Post()
  create(@Body() createVisitaDto: CreateVisitaDto) {
    return this.visitaService.create(createVisitaDto);
  }

  @Get()
  findAll() {
    return this.visitaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVisitaDto: UpdateVisitaDto) {
    return this.visitaService.update(+id, updateVisitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitaService.remove(+id);
  }
  
  // Autorizar visita
  @Patch(':id/autorizar')
  autorizarVisita(@Param('id') id: string) {
    return this.visitaService.autorizarVisita(+id);
  }

  // Rechazar visita
  @Patch(':id/rechazar')
  rechazarVisita(@Param('id') id: string) {
    return this.visitaService.rechazarVisita(+id);
  }
}
