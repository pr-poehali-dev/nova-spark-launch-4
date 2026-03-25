import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import Icon from '@/components/ui/icon'

const CEILING_TYPES = [
  { id: 'matte', label: 'Матовый', pricePerSqm: 650 },
  { id: 'glossy', label: 'Глянцевый', pricePerSqm: 750 },
  { id: 'satin', label: 'Сатиновый', pricePerSqm: 720 },
  { id: 'multilevel', label: 'Двухуровневый', pricePerSqm: 1200 },
]

interface CalculatorSectionProps {
  isActive: boolean
}

export default function CalculatorSection({ isActive }: CalculatorSectionProps) {
  const [width, setWidth] = useState([4])
  const [length, setLength] = useState([5])
  const [selectedType, setSelectedType] = useState('matte')

  const area = width[0] * length[0]
  const type = CEILING_TYPES.find(t => t.id === selectedType)!
  const total = Math.round(area * type.pricePerSqm)

  return (
    <section className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[#4FC3F7] text-sm font-semibold uppercase tracking-widest">Онлайн-калькулятор</span>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white mb-10"
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Рассчитайте стоимость
      </motion.h2>

      <motion.div
        className="grid md:grid-cols-2 gap-10 max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-3 text-white">
              <span className="text-neutral-400">Ширина комнаты</span>
              <span className="font-bold text-lg">{width[0]} м</span>
            </div>
            <Slider
              min={2} max={12} step={0.5}
              value={width}
              onValueChange={setWidth}
              className="accent-[#4FC3F7]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-3 text-white">
              <span className="text-neutral-400">Длина комнаты</span>
              <span className="font-bold text-lg">{length[0]} м</span>
            </div>
            <Slider
              min={2} max={15} step={0.5}
              value={length}
              onValueChange={setLength}
              className="accent-[#4FC3F7]"
            />
          </div>

          <div>
            <p className="text-neutral-400 mb-3">Тип потолка</p>
            <div className="grid grid-cols-2 gap-2">
              {CEILING_TYPES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedType(t.id)}
                  className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                    selectedType === t.id
                      ? 'border-[#4FC3F7] bg-[#4FC3F7]/10 text-[#4FC3F7]'
                      : 'border-white/10 text-neutral-400 hover:border-white/30'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between text-neutral-400">
              <span>Площадь</span>
              <span className="text-white font-medium">{area} м²</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Тип</span>
              <span className="text-white font-medium">{type.label}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Цена за м²</span>
              <span className="text-white font-medium">{type.pricePerSqm} ₽</span>
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between items-center">
              <span className="text-white font-medium">Итого от</span>
              <span className="text-[#4FC3F7] text-3xl font-bold">{total.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Button
              size="lg"
              className="w-full bg-[#4FC3F7] text-black hover:bg-[#29B6F6] font-semibold"
              onClick={() => window.location.href = 'tel:+79923564644'}
            >
              <Icon name="Phone" size={16} className="mr-2" />
              Заказать замер бесплатно
            </Button>
            <p className="text-neutral-500 text-xs text-center">
              Точная стоимость — после бесплатного выезда замерщика
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
