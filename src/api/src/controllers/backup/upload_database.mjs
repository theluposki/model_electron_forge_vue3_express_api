import { logger } from "../../utils/index.mjs";
import { createWriteStream, unlink } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const upload_database = async (req, res) => {
  try {

    const uploadedFile = req.file;

    // Verificando se o arquivo foi enviado corretamente
    if (!uploadedFile) {
      return res.status(400).json('Nenhum arquivo enviado.');
    }

    // Movendo o arquivo para o diretório desejado
    const destinationPath = join(__dirname, '..', '..', '..', 'yz.db'); // Substitua pelo caminho real do seu diretório desejado
    const sourcePath = uploadedFile.path;

    createWriteStream(destinationPath)
      .on('error', (error) => {
        console.error('Erro ao salvar o arquivo:', error);
        res.status(500).json('Erro ao salvar o arquivo.');
      })
      .on('close', () => {
        unlink(sourcePath, (unlinkError) => {
          if (unlinkError) {
            console.error('Erro ao remover o arquivo temporário:', unlinkError);
          }
        });

        res.status(200).json('Upload do arquivo concluído com sucesso.');
      })
      .end(uploadedFile.buffer); // Enviando o conteúdo do arquivo

  } catch (error) {
    logger.err("download_database", "error sending backup", error);
  }
};
