import { CalculoFreteResultado, FreteStrategy } from "./FreteStrategy";

export class RetiradaBalcaoStrategy implements FreteStrategy {
  readonly modalidade = "BALCAO";

  calcular(_pesoKg: number): CalculoFreteResultado {
    return {
      taxa: 0,
      prazoHoras: 2,
    };
  }
}