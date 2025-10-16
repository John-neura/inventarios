velocidad1= float(input("ingresa velocidad veiculo1"))
velocidad2= float(input("ingresa velocidad veiculo1"))
# distancia#

distancia= float(input("ingresa distancia  veiculo entre los dos veiculos"))

if velocidad1 > 0 and velocidad2 > 0 :
   t = distancia / (velocidad1 + velocidad2)
   print(t)
else:
    print("error")


