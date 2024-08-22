// src/Ludopedia.ts
import axios, { AxiosResponse } from 'axios';

class Ludopedia {
  private static baseUrl = 'https://ludopedia.com.br/api/v1';
  private static apiToken = import.meta.env.VITE_LUDOPEDIA_ACCESS_TOKEN;
  static {
    console.log(this.apiToken);
  }
  private static headers = {
    Authorization: `Bearer ${this.apiToken}`,
    'Content-Type': 'application/json', // Add any other headers you might need
    'Accept': 'application/json',       // Accept JSON responses
  };

  public static async requestCollection(idUsuario: string, nomeJogo: string): Promise<string[]> {
    const endpoint = `${this.baseUrl}/colecao`;
    const params = {
      id_usuario: idUsuario,
      lista: 'colecao',
      ordem: 'nome',
      tp_jogo: 't',
      rows: 100, // Number of results per page
      search: nomeJogo,
    };

    try {
      const response: AxiosResponse<any> = await axios.get(endpoint, {
        headers: this.headers,
        params: params,
      });

      if (response.status !== 200) {
        console.error(`Error fetching data: ${response.status}`);
        return [];
      }

      return response.data['colecao'] as string[];
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
      return [];
    }
  }

  public static async requestUsers(usuarioProcurado: string): Promise<{ [key: string]: string }> {
    const endpoint = `${this.baseUrl}/usuarios`;
    const params = {
      search: usuarioProcurado,
    };

    try {
      const response: AxiosResponse<any> = await axios.get(endpoint, {
        headers: this.headers,
        params: params,
      });

      if (response.status !== 200) {
        console.error(`Error fetching data: ${response.status}`);
        return {};
      }

      return response.data['usuarios'] as { [key: string]: string };
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
      return {};
    }
  }
}

export default Ludopedia;
