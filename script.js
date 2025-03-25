function enviarFormulario() {
    // Obtém os valores dos campos do formulário
    var marca = document.getElementById("marca").value;
    var modelo = document.getElementById("modelo").value;
    var memoria = document.getElementById("memoria").value;
    var ssd = document.getElementById("ssd").value;
    var total = document.getElementById("total").value;  

    
    // Constrói o objeto JSON com os valores dos campos do formulário
    var dadosFormulario = {
        marca: marca,
        modelo: modelo,
        memoria: memoria,
        ssd: ssd,
        total: total       
        
    };
    
    
    fetch("http://localhost:8080/notebook", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosFormulario)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Dados enviados:", data);
        alert("dados cadastrados com sucesso !")        
        exibirNotebooks();
    })
    .catch(error => {
        console.error("Erro ao enviar os dados:", error);
        
    });
}


function exibirNotebooks() {
    fetch("http://localhost:8080/notebook")
    .then(response => response.json())
    .then(data => {
        const tabela = document.getElementById("tabelaNotebooks");
        const tbody = tabela.querySelector("tbody");
       
        data.forEach(notebooks => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${notebooks.id}</td>
                <td>${notebooks.marca}</td>
                <td>${notebooks.modelo}</td>
                <td>${notebooks.memoria}</td>
                <td>${notebooks.ssd}</td>               
                <td>R$:${notebooks.total}</td>              
                <td><button class="btn btn-warning" onClick="buscarPorId(${notebooks.id})">Editar</button></td>
                <td><button class="btn btn-danger" onClick="deletarRegistro(${notebooks.id})">Excluir</button></td>
            `;
            tbody.appendChild(row);
        });
        atualizarPaginacao(data.length);
    })
    .catch(error => {
        console.error("Erro ao buscar os dados dos notebooks:", error);
    });

    
}
  document.addEventListener("DOMContentLoaded", exibirNotebooks);

  async function deletarRegistro(id) {
    try {
        
        const url = `http://localhost:8080/notebook/${id}`;
  
        
        const confirmacao = confirm("Tem certeza que deseja excluir o notebook ?");
  
        
        if (confirmacao) {
            const options = {
                method: 'DELETE'
            };
  
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Erro ao deletar o registro');
            }
  
            alert('Registro deletado com sucesso');
            location.reload();

        } else {
            console.log('Exclusão cancelada pelo usuário');
            
        }
    } catch (error) {
        console.error('Erro:', error);
        
    }
    
  }
  
  function showModal() {
    var myModal = document.getElementById('myModal');
    if (myModal) {
        var myInput = document.getElementById('myInput');
        if (myInput) {
            myModal.addEventListener('shown.bs.modal', function () {
                myInput.focus();
            });
            var modalInstance = new bootstrap.Modal(myModal);
            modalInstance.show();
        } else {
            console.error("Elemento 'myInput' não encontrado.");
        }
    } else {
        console.error("Elemento 'myModal' não encontrado.");
    }
}

  function buscarPorId(id) {
    fetch('http://localhost:8080/notebook/' + id)
     .then(response => response.json())    
     .then(user => {
       preencherFormulario(user) ;
       showModal();
     
     })
     .catch(error => console.error('Error fetching user data:', error));
 }
 
   function preencherFormulario(user) {
   document.getElementById('id').value = user.id;
   document.getElementById('marca').value = user.marca;
   document.getElementById('modelo').value = user.modelo;
   document.getElementById('memoria').value = user.memoria;
   document.getElementById('ssd').value = user.ssd;
   document.getElementById('total').value = user.total;

 }



 async function updateUserData() {    
    const idInput =  document.getElementById("id");
    const marcaInput = document.getElementById("marca");   
    const modeloInput = document.getElementById("modelo");
    const memoriaInput = document.getElementById("memoria");
    const ssdInput = document.getElementById("ssd");
    const totalInput = document.getElementById("total");    
      
       
      
    const updateId =  idInput.value    
    const updateMarca = marcaInput.value
    const updateModelo = modeloInput.value
    const updateMemoria = memoriaInput.value
    const updateSsd = ssdInput.value
    const updateTotal = totalInput.value 
    
   
  
    try {
      const response =  await fetch(`http://localhost:8080/notebook` , {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updateId,
          marca: updateMarca,         
          modelo:updateModelo ,
          memoria: updateMemoria,
          ssd: updateSsd,
          total: updateTotal,                
                    
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
  
      alert('Dados  atualizados com sucesso!');
      location.reload();
    } catch (error) {
      console.error(`Erro durante a atualização dos dados: ${error.message}`);
    }
    
   
    
  }

  function mudarPagina(url) {
    window.location.href = (url);
}
 
