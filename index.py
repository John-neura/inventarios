
import os

def guardar_suma_en_archivo(categoria, valor, archivo="gastos.txt"):
    # Intentamos leer el archivo si existe
    datos = {}

    if os.path.exists(archivo):
        with open(archivo, "r") as f:
            for linea in f:
                partes = linea.strip().split(":")
                if len(partes) == 2:
                    cat, val = partes
                    datos[cat] = float(val)

    # Actualizamos el valor de la categoría
    if categoria in datos:
        datos[categoria] += valor
    else:
        datos[categoria] = valor

    # Escribimos todo el archivo nuevamente
    with open(archivo, "w") as f:
        for cat, val in datos.items():
            f.write(f"{cat}:{val}\n")

    print(f"Total acumulado para {categoria}: {datos[categoria]}")
    
    
    
print("************************************************************************")
print("CONTROL DE GASTOS MENSUAL")
print(" ")
print("Categorías: alimentacion, ropa, servicios, ocio, hormiga, Escolares, Inverciones, Otros")
print(" ")
print("Escribe 'salir' para terminar.")
print("************************************************************************")
print(" ")
print(" ")
while True:
    categoria = input("¿Qué categoría de gasto vas a registrar?: ").lower()
    if categoria == "salir":
        break
    elif categoria in ["alimentacion", "ropa", "servicios", "ocio", "hormiga", "escolares", "inverciones", "otros"]:
        valor = float(input(f"Ingrese el gasto para {categoria}: "))
        guardar_suma_en_archivo(categoria, valor)
    else:
        print("Categoría no válida.")






      
          





