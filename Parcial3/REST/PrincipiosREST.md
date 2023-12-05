# Principios de la Arquitectura REST

La Arquitectura de Transferencia de Estado Representacional (REST) es un estilo arquitectónico que guía el diseño de sistemas distribuidos. A continuación, se describen los principios fundamentales de REST:

## 1. Recursos

En REST, todo es considerado como un recurso. Los recursos son entidades o conceptos que tienen un significado y pueden ser identificados mediante URLs.

## 2. Representaciones

Los recursos pueden tener varias representaciones, como JSON o XML. Una representación es cómo se ve o se presenta un recurso. Ejemplo de una representación en JSON:

```json
{
  "id": 1,
  "nombre": "Ejemplo",
  "descripcion": "Un recurso de ejemplo"
}
```

## 3. URI (Identificadores de Recursos Uniformes)
Las URL se utilizan para identificar de manera única los recursos. Deben ser descriptivas y seguir una estructura jerárquica. Por ejemplo:

![Diagrama de URI](https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.quora.com%2FQu%25C3%25A9-es-un-URI&psig=AOvVaw1NxN7yTW8EKcbkVVmx0tVv&ust=1701871334107000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJjUh_W6-IIDFQAAAAAdAAAAABAE)

1. Métodos HTTP
REST utiliza los métodos estándar de HTTP, como GET, POST, PUT y DELETE, para realizar operaciones en los recursos. Cada método tiene un significado específico:

- **GET**: Obtener un recurso.
- **POST**: Crear un nuevo recurso.
- **PUT**: Actualizar un recurso existente.
- **DELETE**: Eliminar un recurso.

5. Estado Representacional
La representación de un recurso contiene toda la información necesaria para modificar o recrear ese recurso. No se requiere almacenar el estado del cliente en el servidor entre solicitudes.

**Conclusión**
La arquitectura REST se basa en estos principios fundamentales para crear sistemas distribuidos que sean escalables y fáciles de entender. Siguiendo estos principios, los desarrolladores pueden crear APIs web eficientes y flexibles.
