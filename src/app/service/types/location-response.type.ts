export type LocationResponseType = {
  id: number;
  nome: string;
  sigla: string;
  regiao: {
    id: string;
    nome: string;
    sigla: string;
  };
};
