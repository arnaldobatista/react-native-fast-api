import axios from "axios";

class ApiSpeed {
  static async getTestUrls() {
    try {
      const response = await axios.get(
        "https://api.fast.com/netflix/speedtest/v2?https=true&token=YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm&urlCount=5"
      );
      const urls = response.data.targets.map((target) => target.url);
      return urls;
    } catch (error) {
      console.error("Erro ao obter URLs do teste de velocidade", error);
      throw { error };
    }
  }

  static async downloadFile(url) {
    try {
      const response = await axios.get(url, { responseType: "blob" });
      return response.data;
    } catch (error) {
      console.error("Erro ao baixar o arquivo", error);
      throw { error };
    }
  }

  static async calculateSpeed() {
    const urls = await ApiSpeed.getTestUrls();
    const startTime = new Date().getTime();

    try {
      const promises = urls.map((url) => ApiSpeed.downloadFile(url));
      const files = await Promise.all(promises);

      const endTime = new Date().getTime();
      const elapsedSeconds = (endTime - startTime) / 1000;
      const totalSize = files.reduce((acc, file) => acc + file.size, 0);
      const downloadSpeed = (totalSize * 8) / elapsedSeconds / 1024 / 1024;

      let formattedSpeed;
      if (downloadSpeed >= 1000) {
        formattedSpeed = [(downloadSpeed / 1000).toFixed(0), "Gbps"];
      } else if (downloadSpeed >= 1) {
        formattedSpeed = [downloadSpeed.toFixed(0), "Mbps"];
      } else {
        formattedSpeed = [(downloadSpeed * 1000).toFixed(0), "Kbps"];
      }

      return formattedSpeed;
    } catch (error) {
      console.error("Erro ao calcular a velocidade de download", error);
      throw { error };
    }
  }
}

export default ApiSpeed;
