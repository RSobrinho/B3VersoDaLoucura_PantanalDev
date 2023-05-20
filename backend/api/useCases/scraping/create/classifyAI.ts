import axios from "axios";

export class ClassifyAI {
  public async execute(data: { texts: string[] }): Promise<number[]> {
    const url = `${process.env.URL_AI}:${process.env.PORT_AI}/predict`;

    try {
      console.log(data);

      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      return null;
    }
  }
}
