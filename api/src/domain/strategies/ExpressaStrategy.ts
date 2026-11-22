import { CalculoFreteResultado, FreteStrategy } from "./FreteStrategy";

export class ExpressaStrategy implements FreteStrategy {
  readonly modalidade = "EXPRESSA";

  calcular(pesoKg: number): CalculoFreteResultado {
    const taxaBase = 24.0;
    const adicionalPorKg = 4.5;
    return {
      taxa: Number((taxaBase + pesoKg * adicionalPorKg).toFixed(2)),
      prazoHoras: 6,
    };
  }
}