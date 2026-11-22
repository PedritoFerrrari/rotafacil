import { CalculoFreteResultado, FreteStrategy } from "./FreteStrategy";

export class PadraoStrategy implements FreteStrategy {
  readonly modalidade = "PADRAO";

  calcular(pesoKg: number): CalculoFreteResultado {
    const taxaBase = 12.0;
    const adicionalPorKg = 2.5;
    return {
      taxa: Number((taxaBase + pesoKg * adicionalPorKg).toFixed(2)),
      prazoHoras: 48,
    };
  }
}