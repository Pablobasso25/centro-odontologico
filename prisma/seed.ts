// Seed: carga inicial de datos de referencia (catálogo, horarios, config).
// Es "idempotente": si ya existen datos, no los duplica ni sobreescribe.


import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
})

async function seedCatalogoDeTratamientos() {
  if ((await prisma.tratamientoCatalogo.count()) > 0) {
    console.log('→ Catálogo ya existente, no se duplica')
    return
  }
  await prisma.tratamientoCatalogo.createMany({
    data: [
      { nombre: 'Consulta y diagnóstico', precioBase: 12000, descripcion: 'Evaluación general y plan de tratamiento' },
      { nombre: 'Limpieza (profilaxis)', precioBase: 20000, descripcion: 'Limpieza profesional y pulido' },
      { nombre: 'Obturación (por pieza)', precioBase: 25000, descripcion: 'Restauración con resina compuesta' },
      { nombre: 'Endodoncia', precioBase: 70000, descripcion: 'Tratamiento de conducto por pieza' },
      { nombre: 'Extracción simple', precioBase: 35000, descripcion: 'Extracción de pieza definitiva' },
      { nombre: 'Corona', precioBase: 150000, descripcion: 'Corona definitiva por pieza' },
      { nombre: 'Radiografía periapical', precioBase: 9000, descripcion: 'Radiografía de pieza individual' },
      { nombre: 'Ortodoncia (tratamiento completo)', precioBase: 900000, descripcion: 'Se presupuesta según el caso; se abona en cuotas' },
    ],
  })
  console.log('→ Catálogo de tratamientos creado (precios de ejemplo, editables desde el panel)')
}

async function seedHorariosDeAtencion() {
  if ((await prisma.horarioAtencion.count()) > 0) {
    console.log('→ Horarios ya existentes, no se duplican')
    return
  }
  await prisma.horarioAtencion.createMany({
    data: [
      { diaSemana: 1, horaInicio: '09:00', horaFin: '18:00' }, // lunes
      { diaSemana: 2, horaInicio: '09:00', horaFin: '18:00' }, // martes
      { diaSemana: 3, horaInicio: '09:00', horaFin: '18:00' }, // miércoles
      { diaSemana: 4, horaInicio: '09:00', horaFin: '18:00' }, // jueves
      { diaSemana: 5, horaInicio: '09:00', horaFin: '18:00' }, // viernes
      { diaSemana: 6, horaInicio: '09:00', horaFin: '13:00' }, // sábado
    ],
  })
  console.log('→ Horarios de atención creados (lun a vie 9-18, sáb 9-13)')
}

async function seedConfiguracion() {
  if ((await prisma.configuracionSistema.count()) > 0) {
    console.log('→ Configuración ya existente, no se duplica')
    return
  }
  await prisma.configuracionSistema.create({ data: {} })
  console.log('→ Configuración del sistema creada (valores por defecto)')
}

async function main() {
  await seedCatalogoDeTratamientos()
  await seedHorariosDeAtencion()
  await seedConfiguracion()
}

main()
  .catch((error) => {
    console.error('Error en el seed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
