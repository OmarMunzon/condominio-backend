import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum } from 'class-validator';

export enum TipoAccesoResidente {  
  ENTRADA = 'ENTRADA',
  SALIDA = 'SALIDA'
}
export enum TipoAcceso {
}

export class CreateAccesoResidenteDto {
  @IsNumber()
  @IsNotEmpty()
  residenteId: number;

  @IsEnum(TipoAccesoResidente)
  @IsNotEmpty()
  tipo_acceso: TipoAccesoResidente;

  @IsString()
  @IsOptional()
  ubicacion?: string;

  @IsString()
  @IsOptional()
  metodo_acceso?: string;
} 