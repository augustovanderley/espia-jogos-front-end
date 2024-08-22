export interface Game {
    nm_jogo: string;
    id_jogo: number;
    thumb: string;
    link: string;
    fl_tem: boolean;
    fl_quer: boolean;
    fl_jogou: boolean;
    fl_teve: boolean;
    fl_favorito: boolean;
    vl_nota: number;
    comentario: string;
    qt_partidas: number;
    comentario_privado: string;
    vl_custo: number;
    tags: string[];
  }