export interface CalculoFreteResultado {
  taxa: number;
  prazoHoras: number;
}

export interface FreteStrategy {
  readonly modalidade: string;
  calcular(pesoKg: number): CalculoFreteResultado;
}