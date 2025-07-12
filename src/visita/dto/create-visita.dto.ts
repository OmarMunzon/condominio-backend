import { IsInt, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateVisitaDto {
  @IsDateString()
  fecha_ingreso: string;

  @IsDateString()
  @IsOptional()
  fecha_salida?: string;

  @IsInt()
  visitanteId: number;

  @IsInt()
  residenteId: number;

  @IsString()
  estadoVisita: string;

  @IsString()
  @IsOptional()
  motivo_visita?: string;
}
