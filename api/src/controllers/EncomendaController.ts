import { Request, Response } from "express";
import { EncomendaService } from "../services/EncomendaService";

export class EncomendaController {
  constructor(private service: EncomendaService) {}

  criar = (req: Request, res: Response): void => {
    try {
      const encomenda = this.service.criar(req.body);
      res.status(201).json(encomenda);
    } catch (err: any) {
      res.status(400).json({ erro: err.message });
    }
  };

  listar = (_req: Request, res: Response): void => {
    res.json(this.service.listar());
  };

  atualizarStatus = (req: Request, res: Response): void => {
    try {
      const { codigo } = req.params;
      const { acao } = req.body;
      const atualizada = this.service.atualizarStatus(codigo, acao);
      res.json(atualizada);
    } catch (err: any) {
      res.status(400).json({ erro: err.message });
    }
  };

  historico = (req: Request, res: Response): void => {
    const { codigo } = req.params;
    res.json(this.service.consultarHistorico(codigo));
  };
}