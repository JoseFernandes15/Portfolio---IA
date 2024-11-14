async function fetchImage() {
    const prompt_ai = document.getElementById("prompt").value.trim(); // Garantir que a string não tenha espaços extras
  
    if (!prompt_ai) {
      return; // Cancela a execução da função
    }

    if(document.getElementById("image").src){
      if (confirm("Vais perder esta imagem, tens a certeza?!")) {
        document.getElementById("image").src="";
      } else {
        return; // Cancela a execução da função
      }
    }
    
    const loading = document.getElementById("loading"); 
    const img_container = document.getElementById("img_container");
    loading.style.display = "block";
    img_container.style.display = "block";
  
    try {
      const ai_url = "https://gen-i.zepedrofernandessampaio.workers.dev/?" + encodeURIComponent(prompt_ai); // Usando encodeURIComponent para garantir que o prompt seja passado corretamente na URL
  
      const response = await fetch(ai_url);
  
      if (!response.ok) {
        throw new Error("Erro ao buscar a imagem");
      }
  
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      const imageElement = document.getElementById("image");

      // Remove a classe de animação antes de definir o novo src
      imageElement.classList.remove("fade-in-top");

      // Define o src da imagem e adiciona a animação ao final
      imageElement.src = imageUrl;
      imageElement.onload = () => {
        imageElement.classList.add("fade-in-top");
        imageElement.scrollIntoView({ behavior: "smooth", block: "center" });
      };
    } catch (error) {
      const loadingMessage = document.getElementById("loadingMessage"); // Presumo que tenha um elemento para mostrar mensagens
      loadingMessage.textContent = "Erro ao carregar a imagem";
    } finally {
      loading.style.display = "none"; // Esconde a mensagem de "loading" e o spinner após a conclusão
    }
  }
  
  // Seleciona os elementos
  const prompt = document.getElementById("prompt");
  const btn = document.getElementById("btn");
  const download = document.getElementById("download")
  
  // Adiciona um ouvinte de evento para o campo de texto
  prompt.addEventListener("input", function () {
    if (prompt.value.trim() !== "") {
      btn.classList.remove("inactive");
    } else {
      btn.classList.add("inactive");
    }
  });
  
  btn.addEventListener("click", function (event) {
    event.preventDefault();
    fetchImage();
  });
  
  download.addEventListener("click", function() {
    // Caminho da imagem
    const imagePath = document.getElementById("img").src;
    // Nome para o download
    const imageName = "ai-generated.png";
  
    // Cria um elemento de link temporário
    const link = document.createElement("a");
    link.href = imagePath;
    link.download = imageName;
  
    // Adiciona o link ao documento, clica nele e depois o remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });