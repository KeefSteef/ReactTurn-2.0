import axios from "axios";

export class AxiosRequest{
    static async getRequest(url) {
      const waitFor = await axios.get(url)
          .then(res => res.data)

      return waitFor
   }

    static async getCharacter(url){
      const waitFor = await axios.get(url)
          .then(res => res.data.map(obj => obj.character))

      return waitFor
   }
}
