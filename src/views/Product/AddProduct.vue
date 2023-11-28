<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { Emitter } from "../../utils/Emitter.js";
import { api } from "../../axios.js";
import { showNotification } from "../../components/Layout/NotificationService.js";

const product = ref({
  name: null,
  descricao: null,
  uploadedImage: null,
  pesoLiquido: null,
  pesoBruto: null,
  unidadeDeMedida: "",
  categoria: "",
  subcategoria: "",
  marca: "",
  fornecedor: "",
  precoDeCusto: null,
  precoDeVenda: null,
  limiteDeEstoque: null,
  estoqueAtual: 0,
  observacao: null,
});

const unidadeDeMedidas = ref([]);
const categorias = ref([]);
const subcategorias = ref([]);
const marcas = ref([]);
const fornecedores = ref([]);

const nUnidadeDeMedida = ref("");
const nCategoria = ref("");
const nSubcategoria = ref("");
const nMarca = ref("");

const fetchAll = async () => {
  try {
    const requests = [
      api.get("/api/unidade-de-medida"),
      api.get("/api/categoria"),
      api.get("/api/subcategoria"),
      api.get("/api/marca"),
      api.get("/api/fornecedor"),
    ];

    const [response1, response2, response3, response4, response5] =
      await Promise.all(requests);

    unidadeDeMedidas.value = response1.data;
    categorias.value = response2.data;
    subcategorias.value = response3.data;
    marcas.value = response4.data;
    fornecedores.value = response5.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    }
  }
};

const addNew = async (field, path) => {
  const fields = {
    nUnidadeDeMedida: nUnidadeDeMedida,
    nCategoria: nCategoria,
    nSubcategoria: nSubcategoria,
    nMarca: nMarca,
  };
  if (!fields[field].value) {
    return;
  }

  try {
    const response = await api.post(`/api/${path}`, {
      nome: fields[field].value,
    });

    console.log(response.data);
    const { message, status } = response.data;
    showNotification(message, status);
    await fetchAll();
  } catch (error) {
    if (error.response) {
      const { error } = error.response.data;
      console.error(error);
      showNotification(error, "error");
    }
  }
};

const showIcon = ref(true);

let saveLocalTimeout;

const keepAliveProduct = () => {
  clearTimeout(saveLocalTimeout);
  saveLocalTimeout = setTimeout(() => {
    localStorage.setItem("keepAliveProduct", JSON.stringify(product.value));
    console.log("keepAliveProduct");
  }, 2000);
};

const clear = () => {
  product.value = {
    name: null,
    descricao: null,
    uploadedImage: null,
    pesoLiquido: null,
    pesoBruto: null,
    unidadeDeMedida: "",
    categoria: "",
    subcategoria: "",
    marca: "",
    fornecedor: "",
    precoDeCusto: null,
    precoDeVenda: null,
    limiteDeEstoque: null,
    estoqueAtual: 0,
    observacao: null,
  };

  nUnidadeDeMedida.value = "";
  nCategoria.value = "";
  nSubcategoria.value = "";
  nMarca.value = "";

  localStorage.removeItem("keepAliveProduct");

  if (product.value.uploadedImage === null) {
    document.querySelector(".panel-img").style.backgroundImage = "none";

    showIcon.value = true;
  }
};

const imageUpload = (event) => {
  const input = event.target;
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const img = new Image();
    img.src = reader.result;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const maxWidth = 800;
      const maxHeight = 600;
      let newWidth = img.width;
      let newHeight = img.height;

      if (img.width > maxWidth) {
        newWidth = maxWidth;
        newHeight = (img.height * maxWidth) / img.width;
      }

      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = (img.width * maxHeight) / img.height;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      const imageBase64 = canvas.toDataURL("image/png").split(",")[1];

      product.value.uploadedImage = `data:image/png;base64,${imageBase64}`;

      document.querySelector(
        ".panel-img"
      ).style.backgroundImage = `url(${product.value.uploadedImage})`;

      showIcon.value = false;
      keepAliveProduct();
    };
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};

onMounted(async () => {
  Emitter.emit("route-name", "Adicionar um novo produto");
  await fetchAll();
  if (localStorage.getItem("keepAliveProduct")) {
    const productLocal = localStorage.getItem("keepAliveProduct");

    product.value = JSON.parse(productLocal);

    if (product.value.uploadedImage) {
      document.querySelector(
        ".panel-img"
      ).style.backgroundImage = `url(${product.value.uploadedImage})`;

      showIcon.value = false;
    }
  }
});

const registerProduct = () => {
  console.log(product.value);
};
</script>

<template>
  <div class="page-i addProduct">
    <div class="form-group">
      <div class="form-control">
        <div class="form-control">
          <label for="name"><sup>*</sup>Nome:</label>
          <input
            type="text"
            id="name"
            v-model="product.name"
            class="input"
            placeholder="digite o nome"
            tabindex="1"
            @keypress="keepAliveProduct"
          />
        </div>

        <div class="form-control">
          <label for="descricao"><sup>*</sup>Descrição:</label>
          <textarea
            name="descricao"
            v-model="product.descricao"
            id="descricao"
            placeholder="Descreva o produto"
            tabindex="2"
            @keypress="keepAliveProduct"
          ></textarea>
        </div>
      </div>

      <div class="form-control">
        <label for="imageUpload" class="panel-img">
          <i
            class="ri-image-line"
            :style="{ display: showIcon ? 'block' : 'none' }"
          ></i>
          <input
            type="file"
            @change="imageUpload"
            name="upload"
            id="imageUpload"
            accept="image/*"
            hidden
            @keypress="keepAliveProduct"
          />
        </label>
      </div>
    </div>

    <div class="form-group">
      <div class="form-control">
        <label for="pesoLiquido"><sup>*</sup>Peso líquido:</label>
        <input
          type="text"
          id="pesoLiquido"
          v-model="product.pesoLiquido"
          class="input"
          placeholder="digite o peso líquido"
          tabindex="3"
          @keypress="keepAliveProduct"
        />
      </div>

      <div class="form-control">
        <label for="pesoBruto"><sup>*</sup>Peso bruto:</label>
        <input
          type="text"
          id="pesoBruto"
          v-model="product.pesoBruto"
          class="input"
          placeholder="digite o peso bruto"
          tabindex="4"
          @keypress="keepAliveProduct"
        />
      </div>
    </div>

    <div class="form-group">
      <div class="form-control">
        <label for="unidadeDeMedida"><sup>*</sup>Unidade de medida:</label>
        <select
          class="select"
          name="unidadeDeMedida"
          v-model="product.unidadeDeMedida"
          id="unidadeDeMedida"
          tabindex="5"
          @change="keepAliveProduct"
        >
          <option value="" disabled>Selecione a unidade de medida</option>
          <option
            v-for="item in unidadeDeMedidas"
            :key="item.id"
            :value="item.nome"
          >
            {{ item.nome }}
          </option>
        </select>
      </div>

      <div class="form-control">
        <label for="nUnidadeDeMedida"><sup></sup>nova unidade de medida?</label>
        <div class="form-group">
          <input
            type="text"
            id="nUnidadeDeMedida"
            v-model="nUnidadeDeMedida"
            class="input"
            placeholder="nome da unidade de medida"
          />

          <button
            class="btn"
            @click="addNew('nUnidadeDeMedida', 'unidade-de-medida')"
          >
            <i class="ri-add-line"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="form-control">
        <label for="categoria"><sup>*</sup>Categoria:</label>
        <select
          class="select"
          name="categoria"
          v-model="product.categoria"
          id="categoria"
          tabindex="6"
          @change="keepAliveProduct"
        >
          <option value="" disabled>Selecione a categoria</option>
          <option v-for="item in categorias" :key="item.id" :value="item.nome">
            {{ item.nome }}
          </option>
        </select>
      </div>

      <div class="form-control">
        <label for="nCategoria"><sup></sup>Adicionar uma nova categoria?</label>
        <div class="form-group">
          <input
            type="text"
            id="nCategoria"
            v-model="nCategoria"
            class="input"
            placeholder="digite o nome da categoria"
          />

          <button class="btn" @click="addNew('nCategoria', 'categoria')">
            <i class="ri-add-line"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="form-control">
        <label for="subcategoria"><sup>*</sup>Subcategoria:</label>
        <select
          class="select"
          name="subcategoria"
          v-model="product.subcategoria"
          id="subcategoria"
          tabindex="7"
          @change="keepAliveProduct"
        >
          <option value="" disabled>Selecione a subcategoria</option>
          <option
            v-for="item in subcategorias"
            :key="item.id"
            :value="item.nome"
          >
            {{ item.nome }}
          </option>
        </select>
      </div>

      <div class="form-control">
        <label for="nSubcategoria"
          ><sup></sup>Adicionar uma nova subcategoria?</label
        >
        <div class="form-group">
          <input
            type="text"
            id="nSubcategoria"
            v-model="nSubcategoria"
            class="input"
            placeholder="digite o nome da subcategoria"
          />

          <button class="btn" @click="addNew('nSubcategoria', 'subcategoria')">
            <i class="ri-add-line"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="form-control">
        <label for="marca"><sup>*</sup>Marca:</label>
        <select
          class="select"
          tabindex="8"
          name="marca"
          v-model="product.marca"
          id="marca"
          @change="keepAliveProduct"
        >
          <option value="" disabled>Selecione a marca</option>
          <option v-for="item in marcas" :key="item.id" :value="item.nome">
            {{ item.nome }}
          </option>
        </select>
      </div>

      <div class="form-control">
        <label for="nMarca"><sup></sup>Adicionar nova marca?</label>
        <div class="form-group">
          <input
            type="text"
            id="nMarca"
            v-model="nMarca"
            class="input"
            placeholder="nome da marca"
            @keypress="keepAliveProduct"
          />

          <button class="btn" @click="addNew('nMarca', 'marca')">
            <i class="ri-add-line"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="form-control">
        <label for="fornecedor"><sup>*</sup>Fornecedor:</label>
        <div class="form-group">
          <select
            class="select"
            name="fornecedor"
            v-model="product.fornecedor"
            id="fornecedor"
            tabindex="9"
            @change="keepAliveProduct"
          >
            <option value="" disabled>Selecione o fornecedor</option>
            <option
              v-for="item in fornecedores"
              :key="item.id"
              :value="item.nome"
            >
              {{ item.nome }}
            </option>
          </select>

          <RouterLink to="/" class="link">Não está listado?</RouterLink>
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="form-control">
        <label for="precoDeCusto"><sup>*</sup>Preço de custo:</label>
        <input
          type="number"
          min="0"
          id="precoDeCusto"
          v-model.number="product.precoDeCusto"
          class="input"
          placeholder="digite o preço de custo"
          tabindex="11"
          @keypress="keepAliveProduct"
        />
      </div>
      
      <div class="form-control">
        <label for="precoDeVenda"><sup>*</sup>Preço de Venda:</label>
        <input
          type="number"
          min="0"
          id="precoDeVenda"
          v-model.number="product.precoDeVenda"
          class="input"
          placeholder="digite o preço de venda"
          tabindex="10"
          @keypress="keepAliveProduct"
        />
      </div>
    </div>

    <div class="form-group">
      <div class="form-control">
        <label for="limiteDeEstoque"><sup>*</sup>Limite de estoque:</label>
        <input
          type="number"
          min="0"
          id="limiteDeEstoque"
          v-model.number="product.limiteDeEstoque"
          class="input"
          placeholder="definir um limite de estoque"
          tabindex="12"
          @keypress="keepAliveProduct"
        />
      </div>

      <div class="form-control">
        <label for="estoqueAtual"><sup></sup>Estoque atual:</label>
        <input
          type="number"
          min="0"
          id="estoqueAtual"
          v-model.number="product.estoqueAtual"
          class="input"
          placeholder=""
          disabled
          @keypress="keepAliveProduct"
        />
      </div>
    </div>

    <div class="form-control">
      <label for="observacao">Observação:</label>
      <textarea
        name="observacao"
        v-model="product.observacao"
        id="observacao"
        placeholder="alguma observação?"
        tabindex="13"
        @keypress="keepAliveProduct"
      ></textarea>
    </div>

    <div class="panelReturn">
      <span>72178c07-2159-41c2-ace4-0f89a028011e</span>
      <img
        src="https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=72178c07-2159-41c2-ace4-0f89a028011e"
        alt="image qr"
      />
    </div>

    <div class="form-group space-between mt40">
      <button class="btn btn-large muted" @click="clear">Limpar</button>
      <button
        class="btn btn-large primary"
        tabindex="14"
        @click="registerProduct"
      >
        Adicionar
      </button>
    </div>
  </div>
</template>

<style scoped>
.addProduct {
  padding: 24px 24px 148px 24px;
}

.panel-img {
  flex: 1;
  border-radius: 6px;
  background-color: var(--white2);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-size: cover;
  background-position: center;

  cursor: pointer;
}

.panel-img:hover {
  transition: background-color ease 0.4s;
  background-color: var(--white3);
}

.panel-img:active {
  scale: 0.97;
}

.panel-img > i {
  font-size: 5rem;
  color: var(--silver);
}

.panelReturn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-direction: column;
  gap: 20px;
  background-color: var(--white2);
  border-radius: 6px;
  margin-top: 20px;
}

.panelReturn > span {
  font-size: 1.4rem;
}

.panelReturn > img {
  width: 100px;
  height: 100px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.mt40 {
  margin-top: 40px;
}
</style>
