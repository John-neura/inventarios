const entradas = Array.from(document.getElementsByName("entrada"));
const botones = Array.from(document.getElementsByName("boton"));
const elementosTotal = Array.from(document.getElementsByClassName("total"));

const n = entradas.length;
let acumuladores = new Array(n).fill(0);
let contadores = new Array(n).fill(0);

// ✅ Cargar datos guardados si existen
const savedA = localStorage.getItem("acumuladores");
const savedC = localStorage.getItem("contadores");

if (savedA && savedC) {
  try {
    const parsedA = JSON.parse(savedA);
    const parsedC = JSON.parse(savedC);
    if (Array.isArray(parsedA) && parsedA.length === n) acumuladores = parsedA.map(Number);
    if (Array.isArray(parsedC) && parsedC.length === n) contadores = parsedC.map(Number);
  } catch (e) {
    console.warn("Error al leer localStorage:", e);
  }
}

// ✅ Función para actualizar los totales en pantalla
function actualizarVista() {
  acumuladores.forEach((valor, i) => {
    elementosTotal[i].textContent = valor.toFixed(2);
  });
}

// ✅ Guardar datos en localStorage
function guardar() {
  localStorage.setItem("acumuladores", JSON.stringify(acumuladores));
  localStorage.setItem("contadores", JSON.stringify(contadores));
}

// Inicializa la vista
actualizarVista();

// ✅ Evento al hacer clic en cada botón “Agregar”
botones.forEach((boton, index) => {
  boton.addEventListener("click", () => {
    const valor = parseFloat(entradas[index].value);
    const categoria = entradas[index].placeholder || `Categoría ${index + 1}`;

    if (!isNaN(valor)) {
      acumuladores[index] += valor;
      contadores[index]++;
      guardar();
      actualizarVista();
      mostrarTotalGeneral();
      alert(`${categoria} tiene $${acumuladores[index].toFixed(2)}`);
      entradas[index].value = "";
    } else {
      alert(`Por favor, ingresa un número válido en "${categoria}".`);
    }
  });
});


// ✅ Nueva función: sumar todas las categorías y mostrar el total general
function mostrarTotalGeneral() {
  const totalGeneral = acumuladores.reduce((suma, valor) => suma + valor, 0);

  // Mostramos el total en el elemento del HTML con id "total-general"
  const elementoTotal = document.getElementById("total-general");
  if (elementoTotal) {
    elementoTotal.textContent = totalGeneral.toFixed(2);
  } else {
    // Si el elemento no existe, mostramos un alert (por si acaso)
    alert(`Total general: $${totalGeneral.toFixed(2)}`);
  }
}


// ✅ Botón para descargar el registro en .txt
const botonDescargar = document.getElementById("descargar");
botonDescargar.addEventListener("click", () => {
  let contenido = "REGISTRO DE CATEGORÍAS:\n\n";
  acumuladores.forEach((valor, i) => {
    const categoria = entradas[i].placeholder || `Categoría ${i + 1}`;
    const veces = contadores[i] || 0;
    contenido += `${categoria}: $${valor.toFixed(2)} (entradas: ${veces})\n`;
  });

  const blob = new Blob([contenido], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "registro.txt";
  a.click();
  URL.revokeObjectURL(url);
});

// ✅ Botón para borrar registro guardado
const botonBorrar = document.getElementById("borrar");
botonBorrar.addEventListener("click", () => {
  if (!confirm("¿Borrar el registro guardado y reiniciar totales?")) return;
  localStorage.removeItem("acumuladores");
  localStorage.removeItem("contadores");
  acumuladores = new Array(n).fill(0);
  contadores = new Array(n).fill(0);
  actualizarVista();
  alert("Registro borrado correctamente.");
});


  